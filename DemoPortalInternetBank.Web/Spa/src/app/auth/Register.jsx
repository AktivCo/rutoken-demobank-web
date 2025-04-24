import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';

import withOperation from '../withOperation';

import registerAction from '../actions/registerActions';

import ChangePinModal from './ChangePinModal';
import RegisterError from './RegisterError';
import Loading from './LoadingCertificates';
import PinModal from './PinModal';


class Register extends React.Component {
    state = { commonName: null }

    onChange = ({ target: { id, value } }) => {
        this.setState({ [id]: value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { CURRENT_DEVICE_ID, register, intl } = this.props;
        const { commonName } = this.state;
        const org = intl.formatMessage({ id: 'auth.register-organization', defaultMessage: 'ООО Demobank' });

        register(CURRENT_DEVICE_ID, commonName, org);
    }

    render() {
        return (
            <div className="info_container">
                <div className="certificatecard_certificatelist">
                    <p>
                        <FormattedMessage id="auth.register-form-title" />
                    </p>
                    <form id="register-form" className="w-100" onSubmit={this.onSubmit}>
                        <div className="certificatelist_certificate">
                            <div className="certificate_body">
                                <div className="certificate_info m-auto">
                                    <p>
                                        <FormattedMessage id="auth.register-form-info" />
                                    </p>
                                    <div className="mt-3">
                                        <input id="commonName" type="text" onChange={this.onChange} autoFocus />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="mt-2">
                        <button form="register-form" type="submit" onClick={(e) => this.onSubmit(e)} className="pl-2 pr-2">
                            <FormattedMessage id="auth.register-form-submit" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({ CURRENT_DEVICE_ID: state.CURRENT_DEVICE_ID });

const mapActionsToProps = (dispatch) =>
    ({
        register: (deviceId, commonName, org) => dispatch(registerAction(deviceId, commonName, org, {
            PinModal: PinModal,
            ChangePinModal: ChangePinModal,
        })),
    });

Register.propTypes = {
    CURRENT_DEVICE_ID: PropTypes.number.isRequired,
    register: PropTypes.func.isRequired,
    intl: PropTypes.shape().isRequired,
};


export default withOperation('register',
    connect(mapStateToProps, mapActionsToProps)(injectIntl(Register)), null, RegisterError, Loading);
