import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import withOperation from '../withOperation';

// import Input from '../controls/Input';

import registerAction from '../actions/register';
import PinModal from './PinModal';

import RegisterError from './RegisterError';
import Loading from './LoadingCertificates';


class Register extends React.Component {
    state = { commonName: null }

    onChange = ({ target: { id, value } }) => {
        this.setState({ [id]: value });
    }

    render() {
        const { CURRENT_DEVICE_ID, register } = this.props;
        const { commonName } = this.state;

        return (
            <div className="info_container">
                <div className="certificatecard_certificatelist">
                    <p>На Рутокене пока нет сертификатов </p>
                    <div className="certificatelist_certificate">
                        <div className="certificate_body">
                            <div className="certificate_info m-auto">
                                <p>Для регистрации и выпуска демонстрационного сертификата, представьтесь</p>
                                <div className="mt-3">
                                    <input id="commonName" type="text" onChange={this.onChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2">
                        <button
                            type="button"
                            className="pl-2 pr-2"
                            onClick={() => register(CURRENT_DEVICE_ID, commonName)}
                        >
                            Зарегистрироваться
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({ CURRENT_DEVICE_ID: state.CURRENT_DEVICE_ID });

const mapActionsToProps = (dispatch) =>
    ({ register: (deviceId, commonName) => dispatch(registerAction(deviceId, commonName, PinModal)) });

Register.propTypes = {
    CURRENT_DEVICE_ID: PropTypes.number.isRequired,
    register: PropTypes.func.isRequired,
};


export default withOperation('register',
    connect(mapStateToProps, mapActionsToProps)(Register), null, RegisterError, Loading);
