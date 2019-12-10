import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { formatMoney } from '../utils';
import withOperation from '../withOperation';

import { generateMultipleSignature as generateMultipleSignatureAction } from '../actions/sign';
import PersonalSuccessSignModal from './PersonalSuccessSignModal';

const PersonalBlockMultipleModal = ({ modalState, generateMultipleSignature }) => (
    <div className="personal-payment-info">
        <h2>
            {modalState.length}
            &nbsp;
            платежных поручения
        </h2>

        <div className="personal-payment-info--field mt-3">
            <div className="personal-payment-info--label">
                На
            </div>
            <div className="personal-payment-info--value">
                {
                    formatMoney(modalState.reduce((acc, current) => acc + current.amount, 0))
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
            <button
                type="button"
                className="btn"
                onClick={() => generateMultipleSignature(modalState)}
            >
                Подписать и отправить
            </button>
        </div>
    </div>
);

const mapActionsToProps = (dispatch) =>
    (
        { generateMultipleSignature: (payments) => dispatch(generateMultipleSignatureAction(payments)) }
    );


PersonalBlockMultipleModal.propTypes = {
    modalState: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    generateMultipleSignature: PropTypes.func.isRequired,
};

export default withOperation('sign', connect(null, mapActionsToProps)(PersonalBlockMultipleModal), PersonalSuccessSignModal);
