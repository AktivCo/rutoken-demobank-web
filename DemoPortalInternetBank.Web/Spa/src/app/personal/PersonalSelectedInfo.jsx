import React from 'react';
import PropTypes from 'prop-types';
import { formatMoney } from '../utils';

const PersonalSelectedInfo = ({ payments, onMultipleSign }) => {
    let paymentSumStr = null;

    if (payments.length !== 0) {
        const paymentSum = payments.reduce((acc, current) => acc + current.amount, 0);

        paymentSumStr = formatMoney(paymentSum);
    }

    let paymentStr = 'Выберите платежные поручения';

    if (payments.length !== 0) {
        paymentStr = `Выбрано ${payments.length} поручения`;
    }

    return (
        <div className="personal-selected-info">
            <div>
                <p>
                    {paymentStr}
                </p>
                <span>
                    {paymentSumStr}
                </span>
            </div>
            <div>
                <button
                    type="button"
                    disabled={payments.length === 0}
                    onClick={() => onMultipleSign(payments)}
                >
                    Подписать
                </button>
            </div>
        </div>
    );
};

PersonalSelectedInfo.propTypes = {
    payments: PropTypes.arrayOf(PropTypes.object).isRequired,
    onMultipleSign: PropTypes.func.isRequired,
};

export default PersonalSelectedInfo;
