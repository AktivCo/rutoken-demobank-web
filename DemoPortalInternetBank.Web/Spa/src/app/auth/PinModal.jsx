import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Input from '../controls/Input';
import { login as loginAction } from '../actions/loginActions';
import withOperation from '../withOperation';


class PinModal extends React.Component {
    state = { password: null }

    onChange = ({ target: { id, value } }) => {
        this.setState({ [id]: value });
    }

    render() {
        console.log(this.props);
        const { CURRENT_DEVICE_ID, login, onSuccessAction } = this.props;
        const { password } = this.state;

        return (
            <div>
                <div className="modal_title">
                    <span>Для доступа к сайту введите свой PIN-код</span>
                </div>
                <div className="modal_actions">
                    <form>
                        <Input type="password" id="password" placeholder="Введите PIN-код" onChange={this.onChange} />
                        <button type="button" onClick={() => login(CURRENT_DEVICE_ID, password, onSuccessAction)}>Войти</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({ CURRENT_DEVICE_ID: state.CURRENT_DEVICE_ID });

const mapActionsToProps = (dispatch) =>
    ({ login: (deviceId, password, onSuccessAction) => dispatch(loginAction(deviceId, password, onSuccessAction)) });

PinModal.propTypes = {
    CURRENT_DEVICE_ID: PropTypes.number.isRequired,
    login: PropTypes.func.isRequired,
    onSuccessAction: PropTypes.func.isRequired,
};

export default withOperation('login', connect(mapStateToProps, mapActionsToProps)(PinModal));
