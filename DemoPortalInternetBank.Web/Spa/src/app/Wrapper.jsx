import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';

import App from './App';

import English from './lang/en';
import Russian from './lang/ru';

const Wrapper = ({ SELECTED_LANGUAGE }) => {
    const msg = SELECTED_LANGUAGE === 'ru' ? Russian : English;

    return (
        <IntlProvider locale={SELECTED_LANGUAGE} messages={msg}>
            <App />
        </IntlProvider>
    );
};

const mapStateToProps = (state) =>
    ({ SELECTED_LANGUAGE: state.SELECTED_LANGUAGE });

Wrapper.propTypes = { SELECTED_LANGUAGE: PropTypes.string.isRequired };

export default connect(mapStateToProps, null)(Wrapper);
