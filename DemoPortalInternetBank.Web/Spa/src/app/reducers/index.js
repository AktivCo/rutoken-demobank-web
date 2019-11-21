import { combineReducers } from 'redux';
import OPERATION_STATUS from '../operationStatus';

const PLUGIN_LOAD_ERROR = (state = null, action) => {
    if (action.type === 'PLUGIN_LOAD_FINISHED') {
        return null;
    }
    if (action.type === 'PLUGIN_LOAD_ERROR') {
        return action.payload;
    }
    return state;
};

const DEVICES = (state = null, action) => {
    if (action.type === 'PLUGIN_DEVICES_FETCH_END') {
        return action.payload;
    }
    if (action.type === 'PLUGIN_LOAD_ERROR') {
        return null;
    }
    return state;
};

const CURRENT_DEVICE_ID = (state = null, action) => {
    if (action.type === 'PLUGIN_SET_CURRENT_DEVICE_ID') {
        return action.payload;
    }
    return state;
};

const CERTIFICATES = (state = {}, action) => {
    if (action.type === 'PLUGIN_SET_CERTIFICATES') {
        return { ...state, ...action.payload };
    }
    if (action.type === 'PLUGIN_RESET_CERTIFICATES') {
        return { ...state, ...action.payload };
    }
    return state;
};

const LOGIN_STATE = (state = null, action) => {
    if (action.type === 'SET_LOGIN_STATE') {
        return action.payload;
    }

    return state;
};

const SHOW_MODAL = (state = null, action) => {
    if (action.type === 'SHOW_MODAL') {
        return action.payload;
    }

    if (action.type === 'HIDE_MODAL') {
        return null;
    }

    return state;
};

const VIEW_REGISTER = (state = false, action) => {
    if (action.type === 'SHOW_VIEW_REGISTER') {
        return true;
    }

    if (action.type === 'PLUGIN_RESET_CERTIFICATES') {
        return false;
    }

    return state;
};

const OPERATION_HANDLE = (state = null, action) => {
    if (action.type === 'OPERATION_START') {
        return {
            ...action.payload,
            status: OPERATION_STATUS.IN_PROGRESS,
        };
    }
    if (action.type === 'OPERATION_SUCCESS') {
        return {
            ...action.payload,
            status: OPERATION_STATUS.SUCCESS,
        };
    }
    if (action.type === 'OPERATION_ERROR') {
        return {
            ...action.payload,
            status: OPERATION_STATUS.ERROR,
        };
    }

    if (action.type === 'OPERATION_FINISH') {
        return null;
    }

    return state;
};


export default combineReducers({
    PLUGIN_LOAD_ERROR,
    CURRENT_DEVICE_ID,
    DEVICES,
    CERTIFICATES,
    SHOW_MODAL,
    VIEW_REGISTER,
    OPERATION_HANDLE,
    LOGIN_STATE,
});
