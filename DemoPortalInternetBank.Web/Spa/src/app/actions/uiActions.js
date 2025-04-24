const showModal = (modalType, modalState, modalOptions, onSuccessAction, onErrorCloseAction) => ({
    type: 'SHOW_MODAL',
    payload: {
        modalType: modalType,
        modalState: modalState,
        modalOptions: modalOptions,
        onSuccessAction: onSuccessAction,
        onErrorCloseAction: onErrorCloseAction,
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

const setLoginState = (isSignedIn = null) => (
    {
        type: 'SET_LOGIN_STATE',
        payload: isSignedIn,
    }
);

const setLanguageState = (locale) => (
    {
        type: 'SET_SELECTED_LANGUAGE_STATE',
        payload: locale,
    }
);

export {
    showModal,
    hideModal,
    showViewRegister,
    setPersonalViewState,
    setLoginState,
    setLanguageState,
};
