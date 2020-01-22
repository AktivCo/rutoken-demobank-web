import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

import { IntlProvider, addLocaleData } from 'react-intl';
import locale from 'react-intl/locale-data/ru';

import reducers from './reducers';

import App from './App';

addLocaleData(locale);

const mainDiv = document.createElement('DIV');
// mainDiv.setAttribute('style', 'height:100%;');


const store = createStore(
    reducers,
    compose(
        applyMiddleware(thunk),
    ),
);

ReactDOM.render(
    <Provider store={store}>
        <IntlProvider locale="ru">
            <App />
        </IntlProvider>
    </Provider>,
    document.body.appendChild(mainDiv),
);
