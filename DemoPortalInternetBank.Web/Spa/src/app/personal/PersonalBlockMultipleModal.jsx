import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
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
                <FormattedMessage id="personal.payment-count" values={{ count: modalState.length }} />
            </h2>

            <div className="personal-payment-info--field mt-3">
                <div className="personal-payment-info--label">
                    <FormattedMessage id="personal.amount-preposition" />
                </div>
                <div className="personal-payment-info--value">
                    {
                        amount
                    }
                </div>
            </div>

            <div className="personal-payment-info--field mt-1">
                <div className="personal-payment-info--label">
                    <FormattedMessage id="personal.for-preposition" />
                </div>
                <div className="personal-payment-info--value">
                    {
                        modalState.map((payment) => (
                            <div key={payment.id}>
                                <FormattedMessage id="payment.account" />
                                &nbsp;
                                {payment.id}
                                &nbsp;
                                <FormattedMessage id="payment.date-from" />
                                &nbsp;
                                {payment.account.respondent.name}
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
                    <FormattedMessage id="personal.sign-and-dispatch" />
                    <small>
                        <FormattedMessage id="personal.some-payments-with-summ" />
                        &nbsp;
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
