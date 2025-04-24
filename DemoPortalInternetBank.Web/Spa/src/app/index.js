import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

import reducers from './reducers';
import Wrapper from './Wrapper';

const mainDiv = document.createElement('DIV');

const defaultLang = (() => {
    const result = localStorage.getItem('SELECTED_LANGUAGE')
        || navigator.language.slice(0, 2);

    if (result === 'ru' || result === 'en') return result;

    return 'en';
})();

const store = createStore(
    reducers,
    { SELECTED_LANGUAGE: defaultLang },
    compose(
        applyMiddleware(thunk),
    ),
);

ReactDOM.render(
    <Provider store={store}>
        <Wrapper />
    </Provider>,
    document.body.appendChild(mainDiv),
);
