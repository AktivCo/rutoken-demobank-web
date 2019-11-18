import React from 'react';
import Header from './Header';
import MainView from './MainView';

const App = () => (
    <div className="d-flex flex-row justify-content-center">
        <div className="container d-flex flex-column">
            <Header />
            <MainView />
        </div>
    </div>
);

export default App;
