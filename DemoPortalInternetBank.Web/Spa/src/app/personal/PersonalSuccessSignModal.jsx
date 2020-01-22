import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    setPersonalViewState as setPersonalViewStateAction,
    hideModal as hideModalAction,
}
    from '../actions/uiActions';

import { formatMoney } from '../utils';
import PERSONAL_VIEW_STATES from '../personalViewStates';

const PersonalSuccessSignModal = ({ data, navigate }) => {
    const renderTitle = () => {
        if (!data) return;
        if (data.length === 1) {
            return `Подписана и отправлена на обработку в банк платежка на сумму ${formatMoney(data[0].amount)}`;
        }

        return `Подписаны и отправлены на обработку в банк ${data.length} платежки на сумму 
            ${formatMoney(data.reduce((acc, current) => acc + current.amount, 0))}`;
    };

    return (
        <div className="personal-payment-info">
            <h2>
                Готово
            </h2>
            <div className="personal-payment-info--success">
                <div className="personal-payment-info--nav">
                    <span>{renderTitle()}</span>
                    <button type="button" onClick={() => navigate()}>к отправленным</button>
                </div>
                <div className="icon-done" />
            </div>
        </div>
    );
};

const mapActionsToProps = (dispatch) =>
    ({
        navigate: () => {
            dispatch(setPersonalViewStateAction(PERSONAL_VIEW_STATES.SENT));
            dispatch(hideModalAction());
        },
    });


PersonalSuccessSignModal.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    navigate: PropTypes.func.isRequired,
};


export default connect(null, mapActionsToProps)(PersonalSuccessSignModal);
