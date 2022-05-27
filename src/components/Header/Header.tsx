import React from 'react';
// @ts-ignore
import Logo from "../../images/logo.png";
import classes from './Header.module.css';
import {NavLink} from "react-router-dom";
import {TDispatchProps, TStateProps} from "./HeaderContainer";

const Header:React.FC<TStateProps & TDispatchProps> = (props) => {
    return (
        <header className={classes.header}>
            <img className={classes.logo} src={Logo} alt=""/>
            <div>
                {props.isAuth ? props.login : <NavLink to={'/login'}>Login</NavLink>}
                {props.isAuth && <button onClick={props.logoutThunkCreator}>logout</button>}
            </div>
        </header>
    )
}

export default Header;