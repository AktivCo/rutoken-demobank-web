import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

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
            return <FormattedMessage id="personal.signed-single" values={{ amount: formatMoney(data[0].amount) }} />;
        }

        const amount = formatMoney(data.reduce((acc, current) => acc + current.amount, 0));

        return <FormattedMessage id="personal.signed-multiple" values={{ count: data.length, amount }} />;
    };

    return (
        <div className="personal-payment-info">
            <h2>
                <FormattedMessage id="personal.done" />
            </h2>
            <div className="personal-payment-info--success">
                <div className="personal-payment-info--nav">
                    <span>{renderTitle()}</span>
                    <button type="button" onClick={() => navigate()}>
                        <FormattedMessage id="personal.to-sent" />
                    </button>
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
