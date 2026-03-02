import React from 'react';
import axios from 'axios';

import Header from './Header';
import MainView from './MainView';
import ModalContainer from './ModalContainer';

axios.interceptors.request.use((config) => {
    const obj = { ...config };
    obj.headers['X-Requested-With'] = 'XMLHttpRequest';
    obj.headers['Content-Type'] = 'application/json';
    return obj;
});

const App = () => (
    <div className="d-flex flex-column align-items-center">
        <div className="container d-flex flex-column">
            <Header />
            <MainView />
        </div>
        <ModalContainer />
    </div>
);

export default App;
