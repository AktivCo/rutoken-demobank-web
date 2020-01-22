import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { formatMoney } from '../utils';
import withOperation from '../withOperation';

import { generateMultipleSignature as generateMultipleSignatureAction } from '../actions/sign';
import PersonalSuccessSignModal from './PersonalSuccessSignModal';

import Button from '../controls/Button';

const PersonalBlockMultipleModal = ({ modalState, generateMultipleSignature }) => {
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
                            <div>
                                {`Cчет № ${payment.id} от ${payment.account.respondent.name}`}
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="mt-2">
                <Button
                    type="button"
                    className="btn"
                    onClick={() => generateMultipleSignature(modalState)}
                >
                    Подписать и отправить
                    <small>
                        платежки на сумму&nbsp;
                        {amount}
                    </small>
                </Button>
            </div>
        </div>
    );
};

const mapActionsToProps = (dispatch) =>
    (
        { generateMultipleSignature: (payments) => dispatch(generateMultipleSignatureAction(payments)) }
    );


PersonalBlockMultipleModal.propTypes = {
    modalState: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    generateMultipleSignature: PropTypes.func.isRequired,
};

export default withOperation('sign', connect(null, mapActionsToProps)(PersonalBlockMultipleModal), PersonalSuccessSignModal);
