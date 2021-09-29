/** @module loginActions */

import Plugin from '@aktivco-it/rutoken-plugin-bootstrap/src/index';
import PluginError from '@aktivco-it/rutoken-plugin-bootstrap/src/pluginError';

import { operationStart, operationFinished, operationError } from './operations';

const defaultPin = '12345678';

const handleIncorrectPin = (deviceId, err) => (dispatch) => {
    let sequense = Promise.resolve();

    sequense = sequense.then(() => Plugin.getDeviceInfo(deviceId, Plugin.TOKEN_INFO_PINS_INFO));

    sequense = sequense.then((retries) => {
        const values = {
            description: err.description,
            pinRetriesLeft: retries.retriesLeft,
        };

        const error = { ...err, code: 'LOGIN_ERROR', isInternal: true, values };
        dispatch(operationError('login', error));

        throw error;
    });

    return sequense;
};

const logoutAndLogin = (deviceId, password) => (dispatch) => {
    let sequense = Promise.resolve();

    sequense = sequense.then(() => Plugin.logout(deviceId));

    sequense = sequense.then(() => Plugin.removePin(deviceId));
    /* eslint-disable-next-line no-use-before-define */
    sequense = sequense.then(() => login(deviceId, password)(dispatch));

    return sequense;
};

/**
 * Метод логина на устройство через API Рутокен Плагина.
 * @param {number} deviceId - Id подключенного устройства.
 * @param {string} pin - PIN-код подключенного устройства.
 */
const login = (deviceId, pin) => (dispatch) => {
    dispatch(operationStart('login'));

    let sequense = Promise.resolve();

    sequense = sequense.then(() => Plugin.login(deviceId, pin));

    sequense = sequense.then(() => {
        if (pin === defaultPin) {
            dispatch(operationFinished('login'));
            return true;
        }
    });

    sequense = sequense.catch((err) => {
        if (err instanceof PluginError && err.code === Plugin.errorCodes.ALREADY_LOGGED_IN) {
            return logoutAndLogin(deviceId, pin)(dispatch);
        }

        if (err instanceof PluginError && err.code === Plugin.errorCodes.PIN_INCORRECT) {
            return handleIncorrectPin(deviceId, err)(dispatch);
        }

        dispatch(operationError('login', err));

        throw err;
    });

    return sequense;
};

/**
 * Метод смены дефолтного PIN-кода устройства через API Рутокен Плагина.
 * @param {number} deviceId - Id подключенного устройства.
 * @param {string} newPin - PIN-код подключенного устройства.
 * @param {string} newPinConfirm - Новый PIN-код подключенного устройства.
 */
const changePinByPin = (deviceId, newPin, newPinConfirm) => (dispatch) => {
    dispatch(operationStart('changePin'));

    if (newPin !== newPinConfirm) {
        dispatch(operationError('changePin', { code: 'PIN_CONFRIM_ERROR', isInternal: true }));
        return;
    }

    if (newPin === defaultPin) {
        dispatch(operationError('changePin', { code: 'NEW_PIN_IS_DEFAULT', isInternal: true }));
        return;
    }

    let sequense = Promise.resolve();

    sequense = sequense.then(() => Plugin.changePin(deviceId, defaultPin, newPin, {}));

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
