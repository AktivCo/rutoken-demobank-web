import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { checkLoginState as checkLoginStateAction } from './actions/userInfoActions';

import Auth from './auth/Devices';
import Personal from './personal';

class CheckLogin extends React.Component {
    componentDidMount() {
        const { checkLoginState } = this.props;
        checkLoginState();
    }

    render() {
        const { LOGIN_STATE } = this.props;
        if (LOGIN_STATE == null) return null;
        if (LOGIN_STATE) return <Personal />;
        return <Auth />;
    }
}

const mapStateToProps = (state) =>
    ({ LOGIN_STATE: state.LOGIN_STATE });

const mapActionsToProps = (dispatch) =>
    ({ checkLoginState: () => dispatch(checkLoginStateAction()) });

CheckLogin.propTypes = {
    LOGIN_STATE: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
    checkLoginState: PropTypes.func.isRequired,
};

CheckLogin.defaultProps = { LOGIN_STATE: null };

export default connect(mapStateToProps, mapActionsToProps)(CheckLogin);
