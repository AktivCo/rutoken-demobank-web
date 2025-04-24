import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { FormattedDate, FormattedMessage } from 'react-intl';

import { formatMoney } from '../utils';


const setSelectedClass = (isSelected) => cn({
    'personal-block': true,
    'personal-block-selected': isSelected,
});

const PersonalBlock = ({ element, isSelected, onSelect }) => (
    <div
        className={setSelectedClass(isSelected)}
        onClick={() => onSelect()}
        role="button"
        tabIndex={0}
    >
        <span className="light mt-0">
            №&nbsp;
            {element.id}
            {
                element.account.respondent.protected && (
                    <span className="confirm">
                        <FormattedMessage id="payment.validation-required" />
                    </span>
                )
            }
        </span>
        <p>
            <FormattedMessage id="payment.account" />
            &nbsp;
            {element.id}
            &nbsp;
            <FormattedMessage id="payment.date-from" />
            &nbsp;
            <FormattedMessage id="handle.translation-object" values={element.account.respondent.translation} />
        </p>

        <span className="light">
            <FormattedMessage id="payment.summ" />
        </span>
        <span>
            <FormattedMessage id="amount" values={{ amount: formatMoney(element.amount) }} />
        </span>

        <span className="light">
            <FormattedMessage id="payment.recipient" />
        </span>
        <span>
            <FormattedMessage id="handle.translation-object" values={element.account.respondent.translation} />
        </span>

        <span className="light">
            <FormattedMessage id="payment.date-from-upper" />
        </span>
        <span>
            <FormattedDate
                value={element.paymentDate}
                day="numeric"
                month="long"
                year="numeric"
            />
        </span>
    </div>
);

PersonalBlock.propTypes = {
    element: PropTypes.shape().isRequired,
    isSelected: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default PersonalBlock;
