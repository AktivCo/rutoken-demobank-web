import { pluginSetCurrentDeviceId } from './changeStateActions';

const changeCurrentDeviceId = (deviceId) => (dispatch) => {
    let sequense = Promise.resolve();

    sequense = sequense.then(() => {
        dispatch(pluginSetCurrentDeviceId(deviceId));
    });

    return sequense;
};


export default changeCurrentDeviceId;
