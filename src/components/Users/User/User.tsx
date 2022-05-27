import React from "react";
import classes from "./User.module.css";
// @ts-ignore
import Avatar from '../../../images/avatar.placeholder.png'
import {NavLink} from "react-router-dom";
import {TUser} from "../../../types/types";

type PropsType = {
    user: TUser

    followingProgressQueue: Array<number>
    followUser: (user_id:number) => void
    unfollowUser: (user_id:number) => void
}
const User:React.FC<PropsType> = ({user,...props}) => {
    const onFollow = () => {
        props.followUser(user.id)
    }
    const onUnfollow = () => {
        props.unfollowUser(user.id)
    }
    let isDisabled = props.followingProgressQueue.some(id => id === user.id);

    return <div className={classes.user}>
        <div className={classes.column}>
            <NavLink to={`/profile/${user.id}`} className={classes.avatar}>
                <img className={classes.avatarImage} src={user.photos.small || Avatar} alt={'avatar'}/>
            </NavLink>
            {user.followed ? <button disabled={isDisabled} onClick={onUnfollow}>unfollow</button> :
                <button disabled={isDisabled} onClick={onFollow}>follow</button>}
        </div>
        <div className={classes.row}>
            <div className={classes.column}>
                <div>{user.name}</div>
                <div>{user.status}</div>
            </div>
            {/*<div>*/}
            {/*    <div>{props.location.country}</div>*/}
            {/*    <div>{props.location.city}</div>*/}
            {/*</div>*/}
        </div>
    </div>
}

export default User;