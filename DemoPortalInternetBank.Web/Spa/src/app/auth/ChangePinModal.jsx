import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';

import Input from '../controls/Input';
import { changePinByPin as changePinByPinAction } from '../actions/loginActions';
import withOperation from '../withOperation';


class ChangePinModal extends React.Component {
    state = { newpin: null, newpinconfirm: null }

    onChange = ({ target: { id, value } }) => {
        this.setState({ [id]: value });
    }

    loginClick = (e) => {
        e.preventDefault();

        const { CURRENT_DEVICE_ID, login, onSuccessAction, closeModal } = this.props;
        const { newpin, newpinconfirm } = this.state;

        login(CURRENT_DEVICE_ID, newpin, newpinconfirm)
            .then(() => {
                onSuccessAction();
                closeModal();
            })
            .catch();
    }

    render() {
        const { intl } = this.props;

        const newPinPlaceholder = intl.formatMessage({ id: 'auth.new-pin-placeholder' });
        const confirmPinPlaceholder = intl.formatMessage({ id: 'auth.pin-confirm-placeholder' });

        return (
            <div>
                <div className="modal_title">
                    <div className="modal_title--head">
                        <FormattedMessage id="auth.change-pin-title" />
                    </div>
                    <div className="modal_title--info mt-1">
                        <FormattedMessage id="auth.change-pin-info" />
                    </div>
                </div>

                <div className="modal_actions">
                    <form>
                        <Input type="password" id="newpin" placeholder={newPinPlaceholder} onChange={this.onChange} autoFocus />
                        <Input type="password" id="newpinconfirm" placeholder={confirmPinPlaceholder} onChange={this.onChange} />
                        <button type="submit" onClick={(e) => this.loginClick(e)}>
                            <FormattedMessage id="auth.change-pin-submit" />
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({ CURRENT_DEVICE_ID: state.CURRENT_DEVICE_ID });

const mapActionsToProps = (dispatch) =>
    ({ login: (deviceId, newpin, newpinconfirm) => dispatch(changePinByPinAction(deviceId, newpin, newpinconfirm)) });

ChangePinModal.propTypes = {
    CURRENT_DEVICE_ID: PropTypes.number.isRequired,
    login: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    onSuccessAction: PropTypes.func.isRequired,
    intl: PropTypes.shape().isRequired,
};

export default withOperation('changePin', connect(mapStateToProps, mapActionsToProps)(injectIntl(ChangePinModal)));
