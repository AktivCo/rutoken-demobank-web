import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Plugin from '@aktivco-it/rutoken-plugin-bootstrap/src/index';

import { setLanguageState as setLanguageStateAction } from './actions/uiActions';
import { logout as logoutAction } from './actions/userInfoActions';
import { formatMoney } from './utils';
import Dropdown from './controls/Dropdown';

const options = [
    {
        name: 'Русский',
        locale: 'ru',
        id: 1,
    },
    {
        name: 'English',
        locale: 'en',
        id: 2,
    }];

const Header = ({ LOGIN_STATE, SELECTED_LANGUAGE, setLanguageState, logout }) => {
    const selectedLanguage = options.find((f) => f.locale === SELECTED_LANGUAGE);

    const handleLanguageChange = (option) => {
        const selectedItem = options.find((opt) => opt.id === option.id);
        localStorage.setItem('SELECTED_LANGUAGE', selectedItem.locale);
        Plugin.setLocale(selectedItem.locale);
        setLanguageState(selectedItem.locale);
    };

    const getRutokenImageClass = (language) => `img__logo ${language.locale}`;

    return (
        <header>
            <div className="header d-flex flex-row justify-content-between">
                <div className="header__img">
                    <a to="/devices"><span className={getRutokenImageClass(selectedLanguage)} /></a>
                    <Dropdown
                        options={options}
                        selectedOption={selectedLanguage}
                        onOptionClicked={handleLanguageChange}
                        showIcon
                        iconClass="language-icon"
                    />
                </div>
                <div className="header__menu">
                    <ul className="d-flex flex-row justify-content-end">
                        <li>
                            {
                                LOGIN_STATE && (
                                    <a
                                        onClick={() => logout()}
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
                            <FormattedMessage id="amount" values={{ amount: formatMoney(LOGIN_STATE.balance) }} />
                        </div>
                    </div>
                )
            }
        </header>
    );
};

const mapStateToProps = (state) => ({
    LOGIN_STATE: state.LOGIN_STATE,
    SELECTED_LANGUAGE: state.SELECTED_LANGUAGE,
});

const mapActionsToProps = (dispatch) => ({
    logout: () => dispatch(logoutAction()),
    setLanguageState: (locale) => dispatch(setLanguageStateAction(locale)),
});

Header.propTypes = {
    LOGIN_STATE: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
    SELECTED_LANGUAGE: PropTypes.string.isRequired,
    setLanguageState: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
};

Header.defaultProps = { LOGIN_STATE: null };

export default connect(mapStateToProps, mapActionsToProps)(Header);
