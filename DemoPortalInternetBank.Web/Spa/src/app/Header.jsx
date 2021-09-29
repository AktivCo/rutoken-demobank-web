import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { logout as logoutAction } from './actions/userInfoActions';
import { formatMoney } from './utils';

const Header = ({ LOGIN_STATE, logout }) => (
    <header>
        <div className="header d-flex flex-row justify-content-between">
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
                                    <FormattedMessage id="main.logout" />
                                </a>
                            )
                        }
                    </li>
                </ul>
            </div>
        </div>
        {
            LOGIN_STATE && (
                <div className="header__userinfo">
                    <div className="header__userinfo--username">
                        <span>
                            <FormattedMessage id="main.account-id" />
                            &nbsp;
                            0000005034613644136
                        </span>
                        <p>
                            {LOGIN_STATE.fullName}
                        </p>
                    </div>
                    <div className="header__userinfo--balance">
                        {formatMoney(LOGIN_STATE.balance)}
                    </div>
                </div>
            )
        }


    </header>
);

const mapStateToProps = (state) =>
    ({ LOGIN_STATE: state.LOGIN_STATE });

const mapActionsToProps = (dispatch) =>
    ({ logout: () => dispatch(logoutAction()) });

Header.propTypes = {
    LOGIN_STATE: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
    logout: PropTypes.func.isRequired,
};

Header.defaultProps = { LOGIN_STATE: null };

export default connect(mapStateToProps, mapActionsToProps)(Header);
