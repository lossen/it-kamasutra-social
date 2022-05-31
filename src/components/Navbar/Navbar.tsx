import React from 'react';
import classes from './Navbar.module.css';
import {NavLink} from 'react-router-dom';

const Navbar: React.FC = () => {
    let linkClassname = (navData) => navData.isActive ? classes.active : classes.link;
    return (
        <nav className={classes.nav}>
            <div className={classes.item}>
                <NavLink className={linkClassname} to="/profile">Profile</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink className={linkClassname} to="/dialogs">Dialogs</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink className={linkClassname} to="/news">News</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink className={linkClassname} to="/users">Users</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink className={linkClassname} to="/music">Music</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink className={linkClassname} to="/settings">Setting</NavLink>
            </div>
        </nav>

    );
};

export default Navbar;