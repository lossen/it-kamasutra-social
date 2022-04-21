import React from "react";
import classes from "./User.module.css";
import Avatar from '../../../images/avatar.placeholder.png'

const User = (props) => {
    const onFollow = () => {
        props.followUser(props.id)
    }
    const onUnfollow = () => {
        props.unfollowUser(props.id)
    }
    return <div className={classes.user}>
        <div className={classes.column}>
            <div className={classes.avatar}>
                <img className={classes.avatarImage} src={props.photos.small || Avatar} alt={'avatar'}/>
            </div>
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