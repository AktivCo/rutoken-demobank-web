import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logout as logoutAction } from './actions/userInfoActions';

const Header = ({ LOGIN_STATE, logout }) => (
    <header className="d-flex flex-row justify-content-between">
        <div className="header__img">
            <a to="/devices"><span className="img__logo" /></a>
        </div>
        <div className="header__menu">
            <ul className="d-flex flex-row justify-content-end">
                <li>
                    {
                        LOGIN_STATE && (
                            <a
                                onClick={() =>
                                    logout()}
                                role="button"
                                tabIndex={0}
                            >
                                Выход
                            </a>
                        )
                    }
                </li>
            </ul>
        </div>
    </header>
);

const mapStateToProps = (state) =>
    ({ LOGIN_STATE: !!state.LOGIN_STATE });

const mapActionsToProps = (dispatch) =>
    ({ logout: () => dispatch(logoutAction()) });

Header.propTypes = {
    LOGIN_STATE: PropTypes.bool,
    logout: PropTypes.func.isRequired,
};

Header.defaultProps = { LOGIN_STATE: null };

export default connect(mapStateToProps, mapActionsToProps)(Header);
