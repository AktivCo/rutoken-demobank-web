const showModal = (modalType, modalState, modalOptions, onSuccessAction) => ({
    type: 'SHOW_MODAL',
    payload: {
        modalType: modalType,
        modalState: modalState,
        modalOptions: modalOptions,
        onSuccessAction: onSuccessAction,
    },
});

const hideModal = () => (
    { type: 'HIDE_MODAL' }
);

const showViewRegister = () => (
    { type: 'SHOW_VIEW_REGISTER' }
);

const setPersonalViewState = (viewState) => (
    {
        type: 'SET_PERSONAL_VIEW_STATE',
        payload: viewState,
    }
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
    setPersonalViewState,
    setLoginState,
};
