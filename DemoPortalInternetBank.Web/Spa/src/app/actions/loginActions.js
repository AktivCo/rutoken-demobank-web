import Plugin from 'rutoken-plugin-bootstrap';
import PluginError from 'rutoken-plugin-bootstrap/pluginError';

import { operationStart, operationFinished, operationError } from './operations';

const handleIncorrectPin = (deviceId, err) => (dispatch) => {
    let sequense = Promise.resolve();

    sequense = sequense.then(() => Plugin.getDeviceInfo(deviceId, Plugin.TOKEN_INFO_PINS_INFO));

    sequense = sequense.then((retries) => {
        const pinRetriesLeft = retries.retriesLeft;

        let x = 'ок';

        if (pinRetriesLeft < 5 || pinRetriesLeft > 20) {
            const last = pinRetriesLeft % 10;
            if (last === 1) x = 'ка';
            if (last > 1 && last < 5) x = 'ки';
        }

        const error = { ...err, description: `${err.description}. Осталось ${pinRetriesLeft} попыт${x}.` };
        dispatch(operationError('login', error));

        throw error;
    });

    return sequense;
};

const logout = (deviceId, password) => (dispatch) => {
    let sequense = Promise.resolve();

    sequense = sequense.then(() => Plugin.logout(deviceId));

    sequense = sequense.then(() => Plugin.removePin(deviceId));
    /* eslint-disable-next-line no-use-before-define */
    sequense = sequense.then(() => login(deviceId, password)(dispatch));

    return sequense;
};

const login = (deviceId, password) => (dispatch) => {
    dispatch(operationStart('login'));

    let sequense = Promise.resolve();

    sequense = sequense.then(() => Plugin.login(deviceId, password));

    sequense = sequense.then(() => {
        if (password === '12345678') {
            dispatch(operationFinished('login'));
            return true;
        }
    });

    sequense = sequense.catch((err) => {
        if (err instanceof PluginError && err.code === Plugin.errorCodes.ALREADY_LOGGED_IN) {
            return logout(deviceId, password)(dispatch);
        }

        if (err instanceof PluginError && err.code === Plugin.errorCodes.PIN_INCORRECT) {
            return handleIncorrectPin(deviceId, err)(dispatch);
        }

        dispatch(operationError('login', err));

        throw err;
    });

    return sequense;
};

const changePinByPin = (deviceId, newpin, newpinconfirm) => (dispatch) => {
    dispatch(operationStart('changePin'));

    if (newpin !== newpinconfirm) {
        dispatch(operationError('changePin', { description: 'PIN-коды не совпадают' }));
        return;
    }

    if (newpin === '12345678') {
        dispatch(operationError('changePin', { description: 'Новый PIN-код не может быть стандартным' }));
        return;
    }

    let sequense = Promise.resolve();

    sequense = sequense.then(() => Plugin.changePin(deviceId, '12345678', newpin, {}));

    sequense = sequense.then(() => {
        dispatch(operationFinished('changePin'));
    });

    sequense = sequense.catch((err) => {
        dispatch(operationError('changePin', err));
        throw err;
    });

    return sequense;
};

export { login, changePinByPin };
