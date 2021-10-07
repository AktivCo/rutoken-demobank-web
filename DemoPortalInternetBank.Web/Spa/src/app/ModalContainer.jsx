import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { connect } from 'react-redux';
import { hideModal } from './actions/uiActions';

const getContentClassName = (size) => cn({
    'modal-content': true,
    'modal-sm': !size || size === 'sm',
    'modal-lg': size === 'lg',
});

const ModalContainer = ({ SHOW_MODAL, closeModal, isLogined, internalError }) => {
    if (!SHOW_MODAL || !SHOW_MODAL.modalType) return null;

    const WrappedModelComponent = SHOW_MODAL.modalType;

    const options = {};

    if (SHOW_MODAL.modalOptions) {
        if (SHOW_MODAL.modalOptions.size) {
            options.size = SHOW_MODAL.modalOptions.size;
        }
    }

    return (
        <div className="modal">
            <div className={getContentClassName(options.size)}>
                <div className="modal_close_icon">
                    <span
                        className="close"
                        role="button"
                        tabIndex={0}
                        onClick={() => {
                            closeModal();
                            if (SHOW_MODAL.onErrorCloseAction && isLogined && internalError && internalError.internalCodeError === 'LOGIN_ERROR_WITH_LOGOUT_WARNING') {
                                SHOW_MODAL.onErrorCloseAction();
                            }
                        }}
                    >
                        &times;
                    </span>
                </div>
                <WrappedModelComponent
                    onSuccessAction={SHOW_MODAL.onSuccessAction}
                    modalState={SHOW_MODAL.modalState}
                    closeModal={() => {
                        closeModal();
                        if (SHOW_MODAL.onErrorCloseAction && isLogined && internalError && internalError.internalCodeError === 'LOGIN_ERROR_WITH_LOGOUT_WARNING') {
                            SHOW_MODAL.onErrorCloseAction();
                        }
                    }}
                />
            </div>
        </div>
    );
};

const mapState = (state) => ({
    SHOW_MODAL: state.SHOW_MODAL,
    isLogined: state.LOGIN_STATE,
    internalError: state.OPERATION_HANDLE && state.OPERATION_HANDLE.error,
});

const mapActionsToProps = (dispatch) => (
    { closeModal: () => dispatch(hideModal()) }
);

ModalContainer.propTypes = {
    SHOW_MODAL: PropTypes.shape(),
    isLogined: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
    closeModal: PropTypes.func.isRequired,
    internalError: PropTypes.shape(),
};

ModalContainer.defaultProps = {
    SHOW_MODAL: null,
    isLogined: null,
    internalError: null,
};

export default connect(mapState, mapActionsToProps)(ModalContainer);
