import Plugin from 'rutoken-plugin-bootstrap';
import PluginError from 'rutoken-plugin-bootstrap/pluginError';

import axios from 'axios';

import { showModal } from './uiActions';
import { operationStart, operationError, operationSuccess } from './operations';
import { checkLoginState } from './userInfoActions';

const signin = (deviceId, certificate, PinModal) => (dispatch) => {
    console.log(deviceId);
    console.log(certificate);

    dispatch(showModal(PinModal, null, () => {
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
    }));
};

export default signin;
