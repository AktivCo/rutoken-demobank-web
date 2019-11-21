const showModal = (modalType, modalState, onSuccessAction) => ({
    type: 'SHOW_MODAL',
    payload: {
        modalType: modalType,
        modalState: modalState,
        onSuccessAction: onSuccessAction,
    },
});

const hideModal = () => (
    { type: 'HIDE_MODAL' }
);

const showViewRegister = () => (
    { type: 'SHOW_VIEW_REGISTER' }
);

const setLoginState = (isSignedIn = false) => (
    {
        type: 'SET_LOGIN_STATE',
        payload: isSignedIn,
    }
);


export {
    showModal,
    hideModal,
    showViewRegister,
    setLoginState,
};
