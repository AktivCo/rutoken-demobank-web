/** @module loadPluginActions */

import Plugin from '@aktivco-it/rutoken-plugin-bootstrap/src/index';

import {
    pluginLoadFinished,
    pluginDevicesFetchEnd,
    pluginSetCurrentDeviceId,
    pluginLoadError,
} from './changeStateActions';

/**
 * Метод инициализации Рутокен Плагина.
 * Получение списка подключенных устройств.
 */
const loadPlugin = () => (dispatch) => {
    let sequense = Plugin.init();

    sequense = sequense.then(() => Plugin.enumerateDevices());

    sequense = sequense.then((deviceNumbers) => {
        const tokenInfoRequestTypes = [
            Plugin.TOKEN_INFO_MODEL,
            Plugin.TOKEN_INFO_LABEL,
            Plugin.TOKEN_INFO_SERIAL,
            Plugin.TOKEN_INFO_IS_PIN_CACHED,
            Plugin.TOKEN_INFO_DEVICE_TYPE,
        ];

        const types = {
            [Plugin.TOKEN_TYPE_RUTOKEN_PINPAD_2]: 'TOKEN_TYPE_PINPAD_2',
            [Plugin.TOKEN_TYPE_RUTOKEN_WEB]: 'TOKEN_TYPE_RUTOKEN_WEB',
            [Plugin.TOKEN_TYPE_RUTOKEN_ECP]: 'TOKEN_TYPE_RUTOKEN_ECP',
            [Plugin.TOKEN_TYPE_RUTOKEN_ECP_SC]: 'TOKEN_TYPE_RUTOKEN_ECP_SC',
            [Plugin.TOKEN_TYPE_UNKNOWN]: 'TOKEN_TYPE_UNKNOWN',
        };

        const getDeviceInfo = (deviceNumber) =>
            Promise
                .all(
                    tokenInfoRequestTypes.map((requestType) =>
                        Plugin.getDeviceInfo(deviceNumber, requestType)),
                )
                .then((values) => ({
                    number: deviceNumber,
                    model: values[0],
                    label: values[1],
                    serial: values[2],
                    isPinCached: values[3],
                    type: types[values[4]],
                }));

        return Promise.all(deviceNumbers.map((dev) => getDeviceInfo(dev)));
    });


    sequense = sequense.then((fetchedDevices) => {
        const devices = fetchedDevices.reduce((acc, current, index) => ({ ...acc, [index]: current }), {});

        if (fetchedDevices.length !== 0) {
            dispatch(pluginSetCurrentDeviceId(fetchedDevices[0].number));
        }

        dispatch(pluginLoadFinished());
        dispatch(pluginDevicesFetchEnd(devices));
    });

    sequense = sequense.catch((error) => {
        dispatch(pluginLoadError(error));
    });

    return sequense;
};

const checkConnectedDevices = () => (dispatch) => {
    let sequense = Promise.resolve();

    sequense = sequense.then(() => Plugin.enumerateDevices());

    sequense = sequense.then((devices) => {
        if (devices.length === 0) {
            const pr = new Promise((resolve) => {
                setTimeout(() => {
                    resolve(checkConnectedDevices()(dispatch));
                }, 1000);
            });

            return pr;
        }

        return loadPlugin()(dispatch);
    });

    return sequense;
};

export { loadPlugin, checkConnectedDevices };
