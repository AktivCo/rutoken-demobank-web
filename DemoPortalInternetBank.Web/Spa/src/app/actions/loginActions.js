import Plugin from 'rutoken-plugin-bootstrap';
import PluginError from 'rutoken-plugin-bootstrap/pluginError';

import { operationStart, operationError } from './operations';

const logout = (deviceId, password, onSuccessAction) => (dispatch) => {
    let sequense = Promise.resolve();

    sequense = sequense.then(() => Plugin.logout(deviceId));

    sequense = sequense.then(() => Plugin.removePin(deviceId));

    /* eslint-disable-next-line no-use-before-define */
    sequense = sequense.then(() => login(deviceId, password, onSuccessAction)(dispatch));

    return sequense;
};

const login = (deviceId, password, onSuccessAction) => (dispatch) => {
    dispatch(operationStart('login'));

    let sequense = Promise.resolve();

    sequense = sequense.then(() => Plugin.login(deviceId, password));

    sequense = sequense.then(() => {
        // if (password === '12345678') {
        //     dispatch(operationFinished('login'));
        //     dispatch(showModal(PinModal, null, () => onSuccessAction()));
        //     return;
        // }

        onSuccessAction();
    });

    sequense = sequense.catch((err) => {
        console.log(err);
        if (err instanceof PluginError && err.code === Plugin.errorCodes.ALREADY_LOGGED_IN) {
            return logout(deviceId, password, onSuccessAction)(dispatch);
        }
        dispatch(operationError('login', err));
    });

    return sequense;
};

const changePinByPin = () => { };

export { login, changePinByPin };
