import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { checkConnectedDevices as checkConnectedDevicesAction } from './actions/loadPluginActions';


class NoDevices extends React.Component {
    componentDidMount() {
        const { checkConnectedDevices } = this.props;
        checkConnectedDevices();
    }

    render() {
        return (
            <div className="main d-flex flex-row">
                <div className="main__wrapper main__settings d-flex flex-column justify-content-start align-items-center p-2">
                    <div className="aboutservice">
                        <span className="aboutservice__title">Не удается обнаружить токен или смарт-карту</span>
                    </div>
                    <div className="token__error w-100 d-flex flex-row justify-content-center align-items-center mb-2">
                        <span className="img__error" />
                    </div>
                    <div className="token__error  w-100 mb-3">
                        <span className="text__error">
                            Подключите Рутокен в любой USB-порт компьютера или к картридеру.
                            <br />
                            Определение начнется автоматически.
                        </span>
                    </div>
                    <div className="settings__divider w-100" />
                    <div className="settings__info">
                        <a href="https://dev.rutoken.ru/display/KB/RU1045">Почему Рутокен не видно?</a>
                    </div>
                </div>
            </div>
        );
    }
}


const mapActionsToProps = (dispatch) =>
    ({ checkConnectedDevices: () => dispatch(checkConnectedDevicesAction()) });

NoDevices.propTypes = { checkConnectedDevices: PropTypes.func.isRequired };

export default connect(null, mapActionsToProps)(NoDevices);
