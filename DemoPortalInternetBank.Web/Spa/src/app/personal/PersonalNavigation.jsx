import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { setPersonalViewState as setPersonalViewStateAction } from '../actions/uiActions';

import PERSONAL_VIEW_STATES from '../personalViewStates';

const personalNavigationTranslateMap = {
    [PERSONAL_VIEW_STATES.OUTGOING]: 'personal.header-outgoing',
    [PERSONAL_VIEW_STATES.SENT]: 'personal.header-sent',
};

const personalNavigationClassMap = {
    [PERSONAL_VIEW_STATES.OUTGOING]: 'personal-link-img-outgoing',
    [PERSONAL_VIEW_STATES.SENT]: 'personal-link-img-sent',
};

const getLinkClassName = (key) => personalNavigationClassMap[key];

const getBlockActiveClassName = (isActive) => cn({
    device: true,
    'd-flex': true,
    'flex-column': true,
    'justify-content-evenly': true,
    'align-items-center': true,
    'personal-link-block': true,
    'personal-link-block-active': isActive,
});

const PersonalNavigation = ({ PERSONAL_VIEW_STATE, setPersonalViewState }) => (
    <div className="d-flex flex-column personal-nav">
        {
            Object
                .keys(personalNavigationTranslateMap)
                .map((key) => (
                    <div
                        onClick={() => setPersonalViewState(Number(key))}
                        key={key}
                        className={getBlockActiveClassName(PERSONAL_VIEW_STATE === Number(key))}
                        role="button"
                        tabIndex={0}
                    >
                        <span className={getLinkClassName(key)} />
                        <span className="personal-link-title w-90">
                            <FormattedMessage id={personalNavigationTranslateMap[key]} />
                        </span>
                    </div>
                ))
        }
    </div>
);


const mapStateToProps = (state) => ({ PERSONAL_VIEW_STATE: state.PERSONAL_VIEW_STATE });

const mapActionsToProps = (dispatch) =>
    ({ setPersonalViewState: (viewState) => dispatch(setPersonalViewStateAction(viewState)) });


PersonalNavigation.propTypes = {
    PERSONAL_VIEW_STATE: PropTypes.number.isRequired,
    setPersonalViewState: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapActionsToProps)(PersonalNavigation);
