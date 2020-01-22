import Plugin from '@aktivco-it/rutoken-plugin-bootstrap/src/index';
import PluginError from '@aktivco-it/rutoken-plugin-bootstrap/src/pluginError';

import axios from 'axios';

import { showModal } from './uiActions';
import { operationStart, operationError, operationSuccess } from './operations';
import { checkLoginState } from './userInfoActions';

import { saveCurrentCert } from '../certificatesStorage';


const signinAction = (deviceId, certificate) => (dispatch) => {
    dispatch(operationStart('signin'));

    let sequense = Promise.resolve();

    sequense = sequense.then(() => axios.get('/api/pki/random'));

    sequense = sequense.then((response) => {
        const random = response.data;

        const options = {
            detached: false,
            addUserCertificate: true,
            useHardwareHash: true,
        };

        return Plugin.sign(deviceId, certificate.certId, random, false, options);
    });

    sequense = sequense.then((signature) => {
        const loginRequest = { cms: signature, objectId: certificate.certId };
        return axios.post('/api/pki/login', loginRequest);
    });

    sequense = sequense.then(() => checkLoginState()(dispatch));

    sequense = sequense.then(() => {
        saveCurrentCert(certificate.certId);
        dispatch(operationSuccess('signin'));
    });

    sequense = sequense.catch((err) => {
        let error;

        if (err instanceof PluginError) {
            error = err;
        } else {
            error = { description: 'Не удалось войти в систему' };
        }

        dispatch(operationError('signin', error));
    });

    return sequense;
};


const signin = (deviceId, certificate, sequenceModals) => (dispatch) => {
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

    sequense = sequense.then(() => signinAction(deviceId, certificate)(dispatch));

    return sequense;
};

export { signinAction, signin };
