const pluginLoadError = (error) => ({
    type: 'PLUGIN_LOAD_ERROR',
    payload: error,
});

const pluginLoadFinished = () => (
    { type: 'PLUGIN_LOAD_FINISHED' }
);

const pluginDevicesFetchEnd = (devices) => ({
    type: 'PLUGIN_DEVICES_FETCH_END',
    payload: devices,
});

const pluginSetCurrentDeviceId = (deviceId) => ({
    type: 'PLUGIN_SET_CURRENT_DEVICE_ID',
    payload: deviceId,
});


export {
    pluginLoadError,
    pluginLoadFinished,
    pluginDevicesFetchEnd,
    pluginSetCurrentDeviceId,
};
