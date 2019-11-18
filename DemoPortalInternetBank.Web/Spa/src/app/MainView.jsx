import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import loadPluginAction from './actions/loadPlugin';
import CheckPlugin from './checkplugin';
import NoDevices from './NoDevices';


import Devices from './Devices';

class MainView extends React.Component {
    componentDidMount() {
        const { loadPlugin } = this.props;
        loadPlugin();
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

        return <Devices />;
    }
}


const mapStateToProps = (state) => ({
    PLUGIN_LOAD_ERROR: state.PLUGIN_LOAD_ERROR,
    DEVICES: state.DEVICES,
});

const mapActionsToProps = (dispatch) => (
    { loadPlugin: () => dispatch(loadPluginAction()) }
);

MainView.propTypes = {
    PLUGIN_LOAD_ERROR: PropTypes.shape(),
    DEVICES: PropTypes.shape(),
    loadPlugin: PropTypes.func.isRequired,
};

MainView.defaultProps = {
    PLUGIN_LOAD_ERROR: null,
    DEVICES: null,
};

export default connect(mapStateToProps, mapActionsToProps)(MainView);
