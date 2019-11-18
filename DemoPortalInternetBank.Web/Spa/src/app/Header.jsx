import React from 'react';

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

export default Header;
