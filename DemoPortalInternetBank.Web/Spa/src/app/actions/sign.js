import Plugin from 'rutoken-plugin-bootstrap';
import axios from 'axios';

import { showModal } from './uiActions';
import { operationStart, operationError, operationSuccess } from './operations';

import { checkLoginState } from './userInfoActions';

const makeSignature = (payment, state) => {
    let sequense = Promise.resolve();

    sequense = sequense.then(() => {
        const options = {
            detached: false,
            addUserCertificate: true,
            useHardwareHash: true,
        };

        return Plugin.sign(state.CURRENT_DEVICE_ID, state.LOGIN_STATE.objectId, 12345, false, options);
    });

    sequense = sequense.then((cms) => {
        const pay = { ...payment, cms: cms };
        return pay;
    });

    return sequense;
};

const generateSignature = (payment) => (dispatch, getState) => {
    const state = getState();
    dispatch(operationStart('sign'));

    let sequense = Promise.resolve();

    sequense = sequense.then(() => makeSignature(payment, state));

    sequense = sequense.then((pay) => axios.post('/api/user/payment/save', pay));

    sequense = sequense.then(() => checkLoginState()(dispatch));

    sequense = sequense.then(() => {
        dispatch({ type: 'DELETE_OBJECTS_LIST' });
        dispatch(operationSuccess('sign', [payment]));
    });

    sequense = sequense.catch((err) => {
        dispatch(operationError('sign', err));
    });

    return sequense;
};

const generateMultipleSignature = (payments) => (dispatch, getState) => {
    const state = getState();
    dispatch(operationStart('sign'));

    let sequense = Promise.resolve();

    sequense = sequense.then(() => {
        const signOperations = payments.map((p) => makeSignature(p, state));
        return Promise.all(signOperations);
    });

    sequense = sequense.then((p) => axios.post('/api/user/payments/save', p));

    sequense = sequense.then(() => checkLoginState()(dispatch));

    sequense = sequense.then(() => {
        dispatch({ type: 'DELETE_OBJECTS_LIST' });
        dispatch(operationSuccess('sign', payments));
    });

    sequense = sequense.catch((err) => {
        dispatch(operationError('sign', err));
    });

    return sequense;
};

const sign = (paymentData, sequenceModals) => (dispatch) => {
    let sequense = Promise.resolve();

    const { PaymentModal, PaymentModalConfirm } = sequenceModals;

    sequense = sequense.then(() => {
        const promise = new Promise((resolve) => {
            dispatch(showModal(PaymentModal, paymentData, { size: 'lg' }, resolve));
        });

        return promise;
    });

    sequense = sequense.then((needEnterPin) => {
        if (!needEnterPin) return;

        const promise = new Promise((resolve) => {
            dispatch(showModal(PaymentModalConfirm, null, null, resolve));
        });

        return promise;
    });

    return sequense;
};

export { sign, generateMultipleSignature, generateSignature };
