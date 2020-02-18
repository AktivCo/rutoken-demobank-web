import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';

import { loadPlugin as loadPluginAction } from './actions/loadPlugin';
import { setLoginState as setLoginStateAction } from './actions/userInfoActions';

import CheckPlugin from './checkplugin';
import NoDevices from './NoDevices';
import CheckLogin from './CheckLogin';

class MainView extends React.Component {
    componentDidMount() {
        const { loadPlugin, setLoginState } = this.props;

        this.requestInterceptor = axios.interceptors.request.use(
            (config) => {
                // for IE
                const headers = {
                    ...config.headers,
                    Pragma: 'no-cache',
                    'Cache-Control': 'no-cache, no-store',
                };
                return { ...config, headers: headers };
            },
            (error) => Promise.reject(error),
        );

        this.responseInterceptor = axios.interceptors.response.use(
            (response) =>
                response,
            (error) => {
                if (error.response.status === 401) {
                    setLoginState();
                }
                return Promise.reject();
            },
        );

        loadPlugin();
    }

    componentWillUnmount() {
        axios.interceptors.request.eject(this.requestInterceptor);
        axios.interceptors.request.eject(this.responseInterceptor);
    }

    render() {
        const { PLUGIN_LOAD_ERROR, DEVICES } = this.props;

        if (PLUGIN_LOAD_ERROR) {
            return (
                <CheckPlugin error={PLUGIN_LOAD_ERROR} />
            );
        }

        if (!DEVICES) {
            return (
                <div className="plugin_loader">
                    <div className="main_title">
                        <p>Загружаем плагин...</p>
                    </div>
                    <div className="loading">
                        <div className="loader" />
                    </div>
                </div>
            );
        }

        if (Object.keys(DEVICES).length === 0) {
            return <NoDevices />;
        }

        return <CheckLogin />;
    }
}


const mapStateToProps = (state) => ({
    PLUGIN_LOAD_ERROR: state.PLUGIN_LOAD_ERROR,
    DEVICES: state.DEVICES,
});

const mapActionsToProps = (dispatch) => (
    {
        loadPlugin: () => dispatch(loadPluginAction()),
        setLoginState: () => dispatch(setLoginStateAction(false)),
    }
);

MainView.propTypes = {
    PLUGIN_LOAD_ERROR: PropTypes.shape(),
    DEVICES: PropTypes.shape(),
    loadPlugin: PropTypes.func.isRequired,
    setLoginState: PropTypes.func.isRequired,
};

MainView.defaultProps = {
    PLUGIN_LOAD_ERROR: null,
    DEVICES: null,
};

export default connect(mapStateToProps, mapActionsToProps)(MainView);
