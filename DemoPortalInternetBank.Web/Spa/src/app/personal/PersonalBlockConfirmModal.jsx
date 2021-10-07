import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedDate, FormattedMessage, injectIntl } from 'react-intl';

import { formatMoney } from '../utils';

import withOperation from '../withOperation';

import { generateSignatureWithConfirm as signAction } from '../actions/sign';
import saveAction from '../actions/fileActions';

import PersonalSuccessSignModal from './PersonalSuccessSignModal';

import Input from '../controls/Input';
import Button from '../controls/Button';

const getImageClass = (locale) => `personal-signature ${locale}`;

class PersonalBlockModal extends React.Component {
    state = { pin: null }

    onChange = ({ target: { id, value } }) => {
        this.setState({ [id]: value });
    }

    render() {
        const { pin } = this.state;
        const { modalState, sign, save, intl, SELECTED_LANGUAGE } = this.props;

        const placeholder = intl.formatMessage({ id: 'personal.enter-pin-placeholder' });

        return (
            <div className="personal-payment-info">
                <h2>
                    №&nbsp;
                    {modalState.id}
                </h2>

                <div className="personal-payment-info--description">
                    <FormattedMessage id="payment.account" />
                    &nbsp;
                    {modalState.id}
                    &nbsp;
                    <FormattedMessage id="payment.date-from" />
                    &nbsp;
                    <FormattedMessage id="handle.translation-object" values={modalState.account.respondent.translation} />
                </div>

                <div className="personal-payment-info--field mt-3">
                    <div className="personal-payment-info--label">
                        <FormattedMessage id="payment.summ" />
                    </div>
                    <div className="personal-payment-info--value">
                        <FormattedMessage id="amount" values={{ amount: formatMoney(modalState.amount) }} />
                    </div>
                </div>

                <div className="personal-payment-info--field mt-1">
                    <div className="personal-payment-info--label">
                        <FormattedMessage id="payment.date" />
                    </div>
                    <div className="personal-payment-info--value">
                        <FormattedDate
                            value={modalState.paymentDate}
                            day="numeric"
                            month="long"
                            year="numeric"
                        />
                    </div>
                </div>

                {
                    modalState.cms && <div className={getImageClass(SELECTED_LANGUAGE)} />
                }

                <div className="personal-payment-info--field mt-2">
                    <div className="personal-payment-info--label">
                        <FormattedMessage id="payment.recipient-bank" />
                    </div>
                </div>

                <h3>
                    <FormattedMessage id="handle.translation-object" values={modalState.account.bank.translation} />
                </h3>

                <div className="personal-payment-info--field mt-1">
                    <div className="personal-payment-info--label">
                        <FormattedMessage id="payment.account" />
                    </div>
                    <div className="personal-payment-info--value">
                        {modalState.account.bank.checkingAccount}
                    </div>
                </div>

                <div className="personal-payment-info--field mt-1">
                    <div className="personal-payment-info--label">
                        <FormattedMessage id="payment.bik" />
                    </div>
                    <div className="personal-payment-info--value">
                        {modalState.account.bank.bik}
                    </div>
                </div>

                <div className="personal-payment-info--field mt-2">
                    <div className="personal-payment-info--label">
                        <FormattedMessage id="payment.recipient" />
                    </div>
                </div>

                <h3>
                    <FormattedMessage id="handle.translation-object" values={modalState.account.respondent.translation} />
                </h3>

                <div className="personal-payment-info--field mt-1">
                    <div className="personal-payment-info--label">
                        <FormattedMessage id="payment.account" />
                    </div>
                    <div className="personal-payment-info--value">
                        {modalState.account.accountNumber}
                    </div>
                </div>

                <div className="personal-payment-info--field mt-1">
                    <div className="personal-payment-info--label">
                        <FormattedMessage id="payment.inn" />
                    </div>
                    <div className="personal-payment-info--value">
                        {modalState.account.respondent.inn}
                    </div>
                </div>
                {
                    !modalState.cms && (
                        <div className="personal-payment-info--bottom mt-2">
                            <p>
                                <FormattedMessage id="personal.agent-check-required" />
                            </p>
                            <span>
                                <FormattedMessage id="personal.confirm-pin-code" />
                            </span>
                            <Input type="text" placeholder={placeholder} id="pin" onChange={(e) => this.onChange(e)} />

                            <Button type="button" className="btn mt-2" onClick={() => sign(pin, modalState)}>
                                <FormattedMessage id="personal.sign-and-dispatch" />
                                <small>
                                    <FormattedMessage id="personal.payment-with-summ" />
                                    &nbsp;
                                    <FormattedMessage id="amount" values={{ amount: formatMoney(modalState.amount) }} />
                                </small>
                            </Button>
                        </div>
                    )
                }
                {
                    modalState.cms && (
                        <div className="mt-2">
                            <button type="button" className="btn" onClick={() => save(modalState)}>
                                <FormattedMessage id="personal.save-cms" />
                            </button>
                        </div>
                    )
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({ SELECTED_LANGUAGE: state.SELECTED_LANGUAGE });

const mapActionsToProps = (dispatch) =>
    ({
        sign: (pin, payment) => dispatch(signAction(pin, payment)),
        save: (payment) => dispatch(saveAction(payment.cms, 'signature.cms')),
    });

PersonalBlockModal.propTypes = {
    SELECTED_LANGUAGE: PropTypes.string.isRequired,
    modalState: PropTypes.shape().isRequired,
    sign: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
    intl: PropTypes.shape().isRequired,
};

export default withOperation('sign', connect(mapStateToProps, mapActionsToProps)(injectIntl(PersonalBlockModal)), PersonalSuccessSignModal);
