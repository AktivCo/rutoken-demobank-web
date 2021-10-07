import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { formatMoney } from '../utils';

const getSelectedPaymentsInfo = (intl, count) => {
    if (!count) return <FormattedMessage id="personal.select-payments" />;

    return <FormattedMessage id="personal.selected-payments-plural" values={{ count }} />;
};

const PersonalSelectedInfo = ({ payments, onMultipleSign, intl }) => {
    let paymentSumStr = null;

    if (payments.length !== 0) {
        const paymentSum = payments.reduce((acc, current) => acc + current.amount, 0);

        paymentSumStr = formatMoney(paymentSum);
    }

    return (
        <div className="personal-selected-info">
            <div>
                <p>
                    {getSelectedPaymentsInfo(intl, payments.length)}
                </p>
                <span>
                    <FormattedMessage id="amount" values={{ amount: paymentSumStr }} />
                </span>
            </div>
            <div>
                <button
                    type="button"
                    disabled={payments.length === 0}
                    onClick={() => onMultipleSign(payments)}
                >
                    <FormattedMessage id="personal.sign-btn" />
                </button>
            </div>
        </div>
    );
};

PersonalSelectedInfo.propTypes = {
    payments: PropTypes.arrayOf(PropTypes.object).isRequired,
    onMultipleSign: PropTypes.func.isRequired,
    intl: PropTypes.shape().isRequired,
};

export default injectIntl(PersonalSelectedInfo);
