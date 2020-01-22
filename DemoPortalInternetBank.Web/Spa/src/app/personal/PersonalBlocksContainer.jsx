import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import PERSONAL_VIEW_STATES from '../personalViewStates';
import PersonalBlocks from './PersonalBlocks';


const personalNavigationTitleMap = {
    [PERSONAL_VIEW_STATES.OUTGOING]: 'Исходящие',
    [PERSONAL_VIEW_STATES.SENT]: 'Отправленные',
};

const PersonalBlocksContainer = ({ title }) => (
    <div className="personal-container">
        <h2 className="personal-container-heading">{`${title} платежные поручения`}</h2>
        <PersonalBlocks />
    </div>
);

PersonalBlocksContainer.propTypes = { title: PropTypes.string.isRequired };

const mapStateToProps = (state) => ({ title: personalNavigationTitleMap[state.PERSONAL_VIEW_STATE] });

export default connect(mapStateToProps)(PersonalBlocksContainer);
