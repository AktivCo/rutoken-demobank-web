import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hideModal } from './actions/uiActions';

const ModalContainer = ({ SHOW_MODAL, closeModal }) => {
    if (!SHOW_MODAL || !SHOW_MODAL.modalType) return null;

    const WrappedModelComponent = SHOW_MODAL.modalType;

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal_close_icon">
                    <span className="close" role="button" tabIndex={0} onClick={() => closeModal()}>&times;</span>
                </div>
                <WrappedModelComponent
                    onSuccessAction={() => {
                        closeModal();
                        SHOW_MODAL.onSuccessAction();
                    }}
                    modalState={SHOW_MODAL.modalState}
                />
            </div>
        </div>
    );
};

const mapState = (state) => ({ SHOW_MODAL: state.SHOW_MODAL });

const mapActionsToProps = (dispatch) => (
    { closeModal: () => dispatch(hideModal()) }
);

ModalContainer.propTypes = {
    SHOW_MODAL: PropTypes.shape(),
    closeModal: PropTypes.func.isRequired,
};

ModalContainer.defaultProps = { SHOW_MODAL: null };

export default connect(mapState, mapActionsToProps)(ModalContainer);
