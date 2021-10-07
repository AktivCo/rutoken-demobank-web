import axios from 'axios';

import { setLoginState as setLoginStateAction } from './uiActions';


const checkLoginState = () => (dispatch) => {
    let sequense = Promise.resolve();

    sequense = sequense.then(() => axios.get('/api/user/info'));

    sequense = sequense.then((response) => {
        dispatch({ type: 'SET_LOGIN_STATE', payload: response.data });
    });

    return sequense;
};

const logout = () => (dispatch) => {
    let sequense = Promise.resolve();

    sequense = sequense.then(() => axios.get('/api/user/logout'));

    sequense = sequense.then(() => {
        dispatch({ type: 'SET_LOGIN_STATE', payload: false });
        window.location.reload();
    });

    return sequense;
};

const setUserCertificate = () => (dispatch, getState) => {
    let sequense = Promise.resolve();

    sequense = sequense.then(() => getState());

    return sequense;
};


const setLoginState = (isSignedIn) => (dispatch, getState) => {
    if (!isSignedIn) {
        const { LOGIN_STATE } = getState();
        if (LOGIN_STATE) {
            window.location.reload();
            return;
        }
    }
    dispatch(setLoginStateAction(isSignedIn));
};

export { checkLoginState, logout, setLoginState, setUserCertificate };
