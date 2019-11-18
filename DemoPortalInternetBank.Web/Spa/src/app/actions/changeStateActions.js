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

const pluginSetCertificates = (deviceId, certificates) => ({
    type: 'PLUGIN_SET_CERTIFICATES',
    payload: { [deviceId]: certificates },
});


export {
    pluginLoadError,
    pluginLoadFinished,
    pluginDevicesFetchEnd,
    pluginSetCurrentDeviceId,
    pluginSetCertificates,
};
