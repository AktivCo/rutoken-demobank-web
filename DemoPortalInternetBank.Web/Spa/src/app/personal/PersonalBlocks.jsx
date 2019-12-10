import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import PERSONAL_VIEW_STATES from '../personalViewStates';

import PersonalOutgoing from './PersonalOutgoing';
import PersonalSent from './PersonalSent';


const PersonalBlocks = ({ PERSONAL_VIEW_STATE }) => {
    if (PERSONAL_VIEW_STATE === PERSONAL_VIEW_STATES.OUTGOING) {
        return <PersonalOutgoing />;
    }

    if (PERSONAL_VIEW_STATE === PERSONAL_VIEW_STATES.SENT) {
        return <PersonalSent />;
    }

    return null;
};

const mapStateToProps = (state) => ({ PERSONAL_VIEW_STATE: state.PERSONAL_VIEW_STATE });


PersonalBlocks.propTypes = { PERSONAL_VIEW_STATE: PropTypes.number.isRequired };

export default connect(mapStateToProps)(PersonalBlocks);
