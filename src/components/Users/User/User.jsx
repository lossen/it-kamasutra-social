import React from "react";
import classes from "./User.module.css";
import Avatar from '../../../images/avatar.placeholder.png'
import {NavLink} from "react-router-dom";

const User = (props) => {
    const onFollow = () => {
        props.followUser(props.id)
    }
    const onUnfollow = () => {
        props.unfollowUser(props.id)
    }
    return <div className={classes.user}>
        <div className={classes.column}>
            <NavLink to={`/profile/${props.id}`} className={classes.avatar}>
                <img className={classes.avatarImage} src={props.photos.small || Avatar} alt={'avatar'}/>
            </NavLink>
            {props.followed ? <button onClick={onUnfollow}>unfollow</button> :
                <button onClick={onFollow}>follow</button>}
        </div>
        <div className={classes.row}>
            <div className={classes.column}>
                <div>{props.name}</div>
                <div>{props.status}</div>
            </div>
            {/*<div>*/}
            {/*    <div>{props.location.country}</div>*/}
            {/*    <div>{props.location.city}</div>*/}
            {/*</div>*/}
        </div>
    </div>
}

export default User;