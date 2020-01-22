import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { formatMoney } from '../utils';
import withOperation from '../withOperation';

import { generateMultipleSignatureWithConfirm as generateMultipleSignatureAction } from '../actions/sign';
import PersonalSuccessSignModal from './PersonalSuccessSignModal';

import Input from '../controls/Input';
import Button from '../controls/Button';

class PersonalBlockMultipleConfirmModal extends React.Component {
    state = { pin: null }

    onChange = ({ target: { id, value } }) => {
        this.setState({ [id]: value });
    }

    render() {
        const { pin } = this.state;
        const { modalState, generateMultipleSignature } = this.props;
        const amount = formatMoney(modalState.reduce((acc, current) => acc + current.amount, 0));

        return (
            <div className="personal-payment-info">
                <h2>
                    <span>{modalState.length}</span>
                    <span> платежных </span>
                    <span>{modalState.length >= 2 && modalState.length < 5 ? 'поручения' : 'поручений'}</span>
                </h2>

                <div className="personal-payment-info--field mt-3">
                    <div className="personal-payment-info--label">
                        На
                    </div>
                    <div className="personal-payment-info--value">
                        {
                            amount
                        }
                    </div>
                </div>

                <div className="personal-payment-info--field mt-1">
                    <div className="personal-payment-info--label">
                        За
                    </div>
                    <div className="personal-payment-info--value">
                        {
                            modalState.map((payment) => (
                                <div key={payment.id}>
                                    {`Cчет № ${payment.id} от ${payment.account.respondent.name}`}
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="personal-payment-info--bottom mt-2">
                    <p>Требующий проверки контрагент</p>
                    <span>Для подтверждения требуется ввести PIN-код</span>
                    <Input type="text" placeholder="Введите PIN-код" id="pin" onChange={(e) => this.onChange(e)} />

                    <Button type="button" className="btn mt-2" onClick={() => generateMultipleSignature(pin, modalState)}>
                        Подписать и отправить
                        <small>
                            платежки на сумму&nbsp;
                            {amount}
                        </small>
                    </Button>
                </div>
            </div>
        );
    }
}

const mapActionsToProps = (dispatch) =>
    (
        { generateMultipleSignature: (pin, payments) => dispatch(generateMultipleSignatureAction(pin, payments)) }
    );


PersonalBlockMultipleConfirmModal.propTypes = {
    modalState: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    generateMultipleSignature: PropTypes.func.isRequired,
};

export default withOperation('sign', connect(null, mapActionsToProps)(PersonalBlockMultipleConfirmModal), PersonalSuccessSignModal);
