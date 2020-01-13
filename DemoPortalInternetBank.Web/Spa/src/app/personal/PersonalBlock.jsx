import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { FormattedDate } from 'react-intl';

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
                    <span className="confirm">Требующий проверки</span>
                )
            }
        </span>
        <p>
            {`Cчет № ${element.id} от ${element.account.respondent.name}`}
        </p>

        <span className="light">Сумма</span>
        <span>
            {formatMoney(element.amount)}
        </span>

        <span className="light">Получатель</span>
        <span>{element.account.respondent.name}</span>

        <span className="light">От</span>
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
