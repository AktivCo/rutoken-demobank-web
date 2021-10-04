import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
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
        const { modalState, generateMultipleSignature, intl } = this.props;
        const amount = formatMoney(modalState.reduce((acc, current) => acc + current.amount, 0));

        const placeholder = intl.formatMessage({ id: 'personal.enter-pin-placeholder' });

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
                                    <FormattedMessage id="handle.translation-object" values={payment.account.respondent.translation} />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="personal-payment-info--bottom mt-2">
                    <p>
                        <FormattedMessage id="personal.agent-check-required" />
                    </p>
                    <span>
                        <FormattedMessage id="personal.confirm-pin-code" />
                    </span>
                    <Input type="text" placeholder={placeholder} id="pin" onChange={(e) => this.onChange(e)} />

                    <Button type="button" className="btn mt-2" onClick={() => generateMultipleSignature(pin, modalState)}>
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
    }
}

const mapActionsToProps = (dispatch) =>
    (
        { generateMultipleSignature: (pin, payments) => dispatch(generateMultipleSignatureAction(pin, payments)) }
    );


PersonalBlockMultipleConfirmModal.propTypes = {
    modalState: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    generateMultipleSignature: PropTypes.func.isRequired,
    intl: PropTypes.shape().isRequired,
};

export default withOperation('sign', connect(null, mapActionsToProps)(injectIntl(PersonalBlockMultipleConfirmModal)), PersonalSuccessSignModal);
