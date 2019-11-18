import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { connect } from 'react-redux';
import changeActiveDeviceAction from './actions/changeActiveDevice';

const getActiveClass = (deviceId, activeDeviceId) => cn({
    device_wrapper: true,
    active: deviceId === activeDeviceId,
});


const classes = {
    TOKEN_TYPE_PINPAD_2: 'pinpad',
    TOKEN_TYPE_RUTOKEN_ECP: 'usb',
    TOKEN_TYPE_RUTOKEN_ECP_SC: 'smartcard',
    TOKEN_TYPE_UNKNOWN: 'usb',
};

const getDeviceClass = (type) => `device_logo ${classes[type]}`;


class Devices extends React.Component {
    changeDevice(deviceId) {
        const { changeActiveDevice } = this.props;
        changeActiveDevice(deviceId);
    }

    render() {
        const { DEVICES, CURRENT_DEVICE_ID } = this.props;

        return (
            <div className="main">
                <div className="main_title">
                    <p>Вход на сайт по сертификату</p>
                </div>
                <div className="main_device">
                    <ul className="device_container">
                        {
                            Object.keys(DEVICES).map((deviceId) => (
                                <li
                                    className={getActiveClass(DEVICES[deviceId].number, CURRENT_DEVICE_ID)}
                                    key={DEVICES[deviceId].number}
                                >
                                    <div
                                        className="device_logo_container"
                                        onClick={() => this.changeDevice(DEVICES[deviceId].number)}
                                        role="button"
                                        tabIndex={0}
                                    >
                                        <span className={getDeviceClass(DEVICES[deviceId].type)} />
                                    </div>
                                    <div className="device_name">
                                        <span>
                                            {DEVICES[deviceId].description}
                                        </span>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    DEVICES: state.DEVICES,
    CURRENT_DEVICE_ID: state.CURRENT_DEVICE_ID,
});

const mapActionsToProps = (dispatch) => (
    { changeActiveDevice: (deviceId) => dispatch(changeActiveDeviceAction(deviceId)) }
);

Devices.propTypes = {
    CURRENT_DEVICE_ID: PropTypes.number.isRequired,
    DEVICES: PropTypes.shape().isRequired,
    changeActiveDevice: PropTypes.func.isRequired,
};


export default connect(mapStateToProps, mapActionsToProps)(Devices);
