import Plugin from 'rutoken-plugin-bootstrap';
import PluginError from 'rutoken-plugin-bootstrap/pluginError';
import axios from 'axios';

import changeCurrentDeviceId from './changeActiveDevice';

import { pluginResetCertificates } from './changeStateActions';
import { showModal } from './uiActions';
import { operationStart, operationError, operationSuccess } from './operations';


const register = (deviceId, commonName, PinModal) => (dispatch) => {
    if (!commonName || commonName.length === 0) {
        dispatch(operationError('register', { description: 'Имя не может быть пустым' }));
        return;
    }

    dispatch(showModal(PinModal, null, () => {
        dispatch(operationStart('register'));

        const algorithm = Plugin.keyAlgorithms[Plugin.PUBLIC_KEY_ALGORITHM_GOST3410_2012_256];

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
            ];

            const extensions = { keyUsage: ['digitalSignature'] };

            return Plugin.createPkcs10(deviceId, keyId, subject, extensions, options);
        });


        sequense = sequense.then((pkcs10Request) => {
            const request = { cms: pkcs10Request };
            return axios.post('/api/pki/register', request);
        });

        sequense = sequense.then((result) => {
            const certificate = result.data;

            return Plugin.importCertificate(
                deviceId,
                certificate,
                Plugin.CERT_CATEGORY_USER,
            );
        });

        sequense = sequense.then(() => {
            dispatch(pluginResetCertificates(deviceId));
            dispatch(operationSuccess('register'));
            dispatch(changeCurrentDeviceId(deviceId));
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
    }));
};

export default register;
