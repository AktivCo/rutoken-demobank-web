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

const logout = () => () => {
    let sequense = Promise.resolve();

    sequense = sequense.then(() => axios.get('/api/user/logout'));

    sequense = sequense.then(() => {
        window.location.reload();
    });

    return sequense;
};

const setUserCertificate = () => (dispatch, getState) => {
    let sequense = Promise.resolve();

    sequense = sequense.then(() => {
        console.log(getState());
    });

    return sequense;
};


const setLoginState = (isSignedIn) => (dispatch) => {
    dispatch(setLoginStateAction(isSignedIn));
};

export { checkLoginState, logout, setLoginState, setUserCertificate };
