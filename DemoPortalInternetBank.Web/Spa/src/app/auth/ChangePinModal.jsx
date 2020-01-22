import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
        return (
            <div>
                <div className="modal_title">
                    <div className="modal_title--head">
                        Мы обнаружили, что у Рутокена стандартный PIN-код
                    </div>
                    <div className="modal_title--info mt-1">
                        Для завершения регистрации, смените его в целях безопасности.
                    </div>
                </div>

                <div className="modal_actions">
                    <form>
                        <Input type="password" id="newpin" placeholder="Введите новый PIN-код" onChange={this.onChange} autoFocus />
                        <Input type="password" id="newpinconfirm" placeholder="Повторите новый PIN-код" onChange={this.onChange} />
                        <button type="submit" onClick={(e) => this.loginClick(e)}>Сменить PIN</button>
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
};

export default withOperation('changePin', connect(mapStateToProps, mapActionsToProps)(ChangePinModal));
