import Plugin from '@aktivco-it/rutoken-plugin-bootstrap/src/index';
import PluginError from '@aktivco-it/rutoken-plugin-bootstrap/src/pluginError';
import axios from 'axios';

import changeCurrentDeviceId from './changeActiveDevice';

import { pluginResetCertificates } from './changeStateActions';
import { showModal } from './uiActions';
import { operationStart, operationError, operationSuccess } from './operations';

import { signinAction } from './signin';

const reg = (deviceId, commonName) => (dispatch) => {
    dispatch(operationStart('register'));

    const algorithm = Plugin.keyAlgorithms[Plugin.PUBLIC_KEY_ALGORITHM_GOST3410_2012_256];
    const certificate = {};

    let sequense = Promise.resolve();

    sequense = sequense.then(() => {
        const dateOption = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        };

        const id = `Plugin${new Date().toLocaleString('ru', dateOption).replace(/[\W]+/g, '')}`;

        const keyId = id.split('').map((x) => x.charCodeAt(0).toString(16)).join(':');

        const options = {
            publicKeyAlgorithm: algorithm.value,
            signatureSize: algorithm.signatureSize,
            keyType: 0,
            id: keyId,
        };

        return Plugin.generateKeyPair(deviceId, null, '', options);
    });

    sequense = sequense.then((keyId) => {
        const options = { hashAlgorithm: algorithm.hash[0].value };

        const subject = [
            {
                rdn: 'commonName',
                value: commonName,
            },
            {
                rdn: 'O',
                value: 'ООО Демобанк',
            },
            {
                rdn: 'INN',
                value: '097624544474',
            },
            {
                rdn: 'OGRN',
                value: '5155002560499',
            },
        ];

        const extensions = { keyUsage: ['digitalSignature'] };

        return Plugin.createPkcs10(deviceId, keyId, subject, extensions, options);
    });

    sequense = sequense.then((pkcs10Request) => {
        const request = { cms: pkcs10Request };
        return axios.post('/api/pki/register', request);
    });

    sequense = sequense.then((result) => {
        const cert = result.data;

        return Plugin.importCertificate(
            deviceId,
            cert,
            Plugin.CERT_CATEGORY_USER,
        );
    });

    sequense = sequense.then((certId) => {
        const options = {
            detached: false,
            addUserCertificate: true,
            useHardwareHash: false,
        };

        certificate.certId = certId;

        return Plugin.sign(deviceId, certId, certId, false, options);
    });

    sequense = sequense.then((signature) => {
        const request = { cms: signature };

        return axios.post('/api/pki/registercomplete', request);
    });

    sequense = sequense.then(() => {
        dispatch(operationSuccess('register'));
        dispatch(changeCurrentDeviceId(deviceId));
        dispatch(pluginResetCertificates(deviceId));

        return signinAction(deviceId, certificate)(dispatch);
    });


    sequense = sequense.catch((err) => {
        let error;
        if (err instanceof PluginError) {
            error = err;
        } else {
            error = { description: 'Произошла ошибка' };
        }

        dispatch(operationError('register', error));
    });

    return sequense;
};


const register = (deviceId, commonName, sequenceModals) => (dispatch) => {
    if (!commonName || commonName.length === 0) {
        dispatch(operationError('register', { description: 'Имя не может быть пустым' }));
        return;
    }

    let sequense = Promise.resolve();

    const { PinModal, ChangePinModal } = sequenceModals;

    sequense = sequense.then(() => {
        const promise = new Promise((resolve) => {
            dispatch(showModal(PinModal, null, null, resolve));
        });

        return promise;
    });

    sequense = sequense.then((needChangePin) => {
        if (!needChangePin) return;

        const promise = new Promise((resolve) => {
            dispatch(showModal(ChangePinModal, null, null, resolve));
        });

        return promise;
    });

    sequense = sequense.then(() => reg(deviceId, commonName)(dispatch));

    return sequense;
};

export default register;
