import React from 'react';
import Logo from "../../images/logo.png";
import classes from './Header.module.css';

const Header = () => {
    return (
        <header className={classes.header}>
            <img className={classes.logo} src={Logo} alt=""/>
        </header>
    )
}

export default Header;