import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { connect } from 'react-redux';

import PERSONAL_VIEW_STATES from '../personalViewStates';
import PersonalBlocks from './PersonalBlocks';

const PersonalBlocksContainer = ({ viewState }) => {
    const section = viewState === PERSONAL_VIEW_STATES.SENT
        ? 'personal.header-sent'
        : 'personal.header-outgoing';

    return (
        <div className="personal-container">
            <h2 className="personal-container-heading">
                <FormattedMessage id={section} />
                &nbsp;
                <FormattedMessage id="personal.payment-orders" />
            </h2>
            <PersonalBlocks />
        </div>
    );
};

PersonalBlocksContainer.propTypes = { viewState: PropTypes.number.isRequired };

const mapStateToProps = (state) => ({ viewState: state.PERSONAL_VIEW_STATE });

export default connect(mapStateToProps)(PersonalBlocksContainer);
