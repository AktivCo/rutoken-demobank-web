import Plugin from '@aktivco-it/rutoken-plugin-bootstrap/src/index';
import axios from 'axios';

import { showModal } from './uiActions';
import { operationStart, operationError, operationSuccess } from './operations';
import { checkLoginState } from './userInfoActions';

import { login } from './loginActions';
import { formatDate } from '../utils';

const constructPinPadData = (payment) =>
    `<!PINPADFILE UTF8><N>Платежное поручение<V>${payment.id}
    <N>Сумма<V>${payment.amount}
    <N>Дата<V>${formatDate(payment.paymentDate)}
    <N>Получатель<V>${payment.account.respondent.name}
    <N>Инн<V>${payment.account.respondent.inn}
    <N>КПП<V>${payment.account.respondent.kpp}
    <N>Назначение платежа<V>Оплата счета
    <N>Банк получателя<V>${payment.account.bank.name}
    <N>БИК<V>${payment.account.bank.bik}
    <N>Номер счета получателя<V>${payment.account.accountNumber}
    <N>Плательщик<V>ООО "Демобанк"
    <N>Банк плательщика<V>Демобанк (открытое акционерное общество)
    <N>БИК<V>044525187
    <N>Номер счета плательщика<V>0000005034613644136
    `;

const makeSignature = (payment, state) => {
    let sequense = Promise.resolve();

    const paymentData = constructPinPadData(payment);

    sequense = sequense.then(() => {
        const options = {
            detached: false,
            addUserCertificate: true,
            useHardwareHash: false,
        };

        return Plugin.sign(state.CURRENT_DEVICE_ID, state.LOGIN_STATE.objectId, paymentData, false, options);
    });

    sequense = sequense.then((cms) => {
        const pay = { ...payment, cms: cms };
        return pay;
    });

    return sequense;
};

const makeSingleSignature = (payment) => (dispatch, getState) => {
    const state = getState();
    let sequense = Promise.resolve();

    sequense = sequense.then(() => makeSignature(payment, state));

    sequense = sequense.then((pay) => axios.post('/api/user/payment/save', pay));

    sequense = sequense.then(() => checkLoginState()(dispatch));

    return sequense;
};

const makeMultipleSignature = (payments) => (dispatch, getState) => {
    const state = getState();
    let sequense = Promise.resolve();

    sequense = sequense.then(() => {
        const signOperations = payments.map((p) => makeSignature(p, state));
        return Promise.all(signOperations);
    });

    sequense = sequense.then((p) => axios.post('/api/user/payments/save', p));

    sequense = sequense.then(() => checkLoginState()(dispatch));

    return sequense;
};


const generateSignature = (payment) => (dispatch, getState) => {
    dispatch(operationStart('sign'));

    let sequense = Promise.resolve();

    sequense = sequense.then(() => makeSingleSignature(payment)(dispatch, getState));

    sequense = sequense.then(() => {
        dispatch({ type: 'DELETE_OBJECTS_LIST' });
        dispatch(operationSuccess('sign', [payment]));
    });

    sequense = sequense.catch((err) => {
        dispatch(operationError('sign', err));
    });

    return sequense;
};

const generateSignatureWithConfirm = (pin, payment) => (dispatch, getState) => {
    dispatch(operationStart('sign'));

    let sequense = Promise.resolve();

    sequense = sequense.then(() => login(getState().CURRENT_DEVICE_ID, pin)(dispatch));

    sequense = sequense.then(() => makeSingleSignature(payment)(dispatch, getState));

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
    dispatch(operationStart('sign'));

    let sequense = Promise.resolve();

    sequense = sequense.then(() => makeMultipleSignature(payments)(dispatch, getState));

    sequense = sequense.then(() => {
        dispatch({ type: 'DELETE_OBJECTS_LIST' });
        dispatch(operationSuccess('sign', payments));
    });

    sequense = sequense.catch((err) => {
        dispatch(operationError('sign', err));
    });

    return sequense;
};

const generateMultipleSignatureWithConfirm = (pin, payments) => (dispatch, getState) => {
    dispatch(operationStart('sign'));

    let sequense = Promise.resolve();

    sequense = sequense.then(() => login(getState().CURRENT_DEVICE_ID, pin)(dispatch));

    sequense = sequense.then(() => makeMultipleSignature(payments)(dispatch, getState));

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

    const { PaymentModal, PaymentModalConfirm, PaymentMultipleModal, PaymentMultipleModalConfirm } = sequenceModals;

    const isMultiple = paymentData.length > 1;

    const isProtected = paymentData.some((el) => el.account.respondent.protected);

    let modalData = paymentData;

    let modal = PaymentModal;

    if (isProtected && isMultiple) {
        modal = PaymentMultipleModalConfirm;
    } else {
        if (isProtected) {
            modal = PaymentModalConfirm;
        }
        if (isMultiple) {
            modal = PaymentMultipleModal;
        }
    }

    if (!isMultiple) {
        [modalData] = paymentData;
    }

    sequense = sequense.then(() => {
        const promise = new Promise((resolve) => {
            dispatch(showModal(modal, modalData, { size: 'lg' }, resolve));
        });

        return promise;
    });

    return sequense;
};

export { sign, generateMultipleSignature, generateSignature, generateSignatureWithConfirm, generateMultipleSignatureWithConfirm };
