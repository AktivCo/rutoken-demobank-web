import React from 'react';
import ReactDOM from 'react-dom';
import PluginBootstrap from 'rutoken-plugin-bootstrap';

import CheckPlugin from './checkplugin';


const Header = () => (
    <header className="d-flex flex-row justify-content-between">
        <div className="header__img">
            <a to="/devices"><span className="img__logo" /></a>
        </div>
        <div className="header__menu">
            <ul className="d-flex flex-row justify-content-end" />
        </div>
    </header>
);

const TestApplic = () => (
    <div className="d-flex flex-row justify-content-center">
        <div className="container d-flex flex-column">
            <Header />
            <App />
        </div>
    </div>
);


class App extends React.Component {
    state = {
        error: null,
        loading: true,
    }

    componentDidMount() {
        PluginBootstrap.init()
            .then(() => {
                this.setState({ loading: false, error: null });
            })
            .catch((err) => {
                this.setState({ loading: false, error: err });
            });
    }

    render() {
        const { error, loading } = this.state;

        if (error) {
            return (
                <CheckPlugin error={error} />
            );
        }

        if (loading) {
            return (
                <div>Загружаем плагин</div>
            );
        }

        return (
            <div>Плагин загружен</div>
        );
    }
}


const mainDiv = document.createElement('DIV');
mainDiv.setAttribute('style', 'height:100%;');

ReactDOM.render(
    <TestApplic />,
    document.body.appendChild(mainDiv),
);
