import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';

import Input from '../controls/Input';
import { login as loginAction } from '../actions/loginActions';
import withOperation from '../withOperation';


class PinModal extends React.Component {
    state = { password: null }

    onChange = ({ target: { id, value } }) => {
        this.setState({ [id]: value });
    }

    loginClick = (e) => {
        e.preventDefault();

        const { CURRENT_DEVICE_ID, login, onSuccessAction, closeModal } = this.props;
        const { password } = this.state;

        login(CURRENT_DEVICE_ID, password)
            .then((needChangePin) => {
                onSuccessAction(needChangePin);
                closeModal();
            })
            .catch();
    }

    render() {
        const { intl } = this.props;
        const placeholder = intl.formatMessage({ id: 'auth.pin-modal-placeholder' });


        return (
            <div>
                <div className="modal_title">
                    <div className="modal_title--head">
                        <FormattedMessage id="auth.pin-modal-title" />
                    </div>
                </div>
                <div className="modal_actions">
                    <form>
                        <Input type="password" id="password" placeholder={placeholder} onChange={this.onChange} autoFocus />
                        <button type="submit" onClick={(e) => this.loginClick(e)}>
                            <FormattedMessage id="auth.pin-modal-submit" />
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({ CURRENT_DEVICE_ID: state.CURRENT_DEVICE_ID });

const mapActionsToProps = (dispatch) =>
    ({ login: (deviceId, password) => dispatch(loginAction(deviceId, password)) });

PinModal.propTypes = {
    CURRENT_DEVICE_ID: PropTypes.number.isRequired,
    login: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    onSuccessAction: PropTypes.func.isRequired,
    intl: PropTypes.shape().isRequired,
};

export default withOperation('login', connect(mapStateToProps, mapActionsToProps)(injectIntl(PinModal)));
