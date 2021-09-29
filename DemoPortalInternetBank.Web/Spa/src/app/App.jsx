import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import cn from 'classnames';

import Header from './Header';
import MainView from './MainView';
import ModalContainer from './ModalContainer';
import { setLanguageState as setLanguageStateAction } from './actions/uiActions';

axios.interceptors.request.use((config) => {
    const obj = { ...config };
    obj.headers['X-Requested-With'] = 'XMLHttpRequest';
    obj.headers['Content-Type'] = 'application/json';
    return obj;
});

const getActiveClass = (stateValue, element) => cn({
    selected: stateValue === element,
    'mr-3': element === 'ru',
});

const handleLanguageChange = (locale, action) => {
    localStorage.setItem('SELECTED_LANGUAGE', locale);
    action(locale);
};

const App = ({ setLanguageState, SELECTED_LANGUAGE }) => (
    <div className="d-flex flex-row justify-content-center">
        <div className="container d-flex flex-column">
            <Header />
            <MainView />
            <div className="asdasd">
                <span aria-hidden="true" onClick={() => handleLanguageChange('ru', setLanguageState)} className={getActiveClass(SELECTED_LANGUAGE, 'ru')}>rus</span>
                <span aria-hidden="true" onClick={() => handleLanguageChange('en', setLanguageState)} className={getActiveClass(SELECTED_LANGUAGE, 'en')}>eng</span>
            </div>
        </div>
        <ModalContainer />
    </div>
);

const mapActionsToProps = (dispatch) => (
    { setLanguageState: (locale) => dispatch(setLanguageStateAction(locale)) }
);

const mapStateToProps = (state) =>
    ({ SELECTED_LANGUAGE: state.SELECTED_LANGUAGE });


App.propTypes = {
    setLanguageState: PropTypes.func.isRequired,
    SELECTED_LANGUAGE: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapActionsToProps)(App);
