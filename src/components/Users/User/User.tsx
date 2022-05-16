import React from "react";
import classes from "./User.module.css";
// @ts-ignore
import Avatar from '../../../images/avatar.placeholder.png'
import {NavLink} from "react-router-dom";
import {TPhotos} from "../../../types/types";

type PropsType = {
    id: number
    followingProgressQueue: Array<number>
    followed: boolean
    photos: TPhotos
    name: string
    status: string

    followUser: (user_id:number) => void
    unfollowUser: (user_id:number) => void
}
const User:React.FC<PropsType> = (props) => {
    const onFollow = () => {
        props.followUser(props.id)
    }
    const onUnfollow = () => {
        props.unfollowUser(props.id)
    }
    let isDisabled = props.followingProgressQueue.some(id => id === props.id);

    return <div className={classes.user}>
        <div className={classes.column}>
            <NavLink to={`/profile/${props.id}`} className={classes.avatar}>
                <img className={classes.avatarImage} src={props.photos.small || Avatar} alt={'avatar'}/>
            </NavLink>
            {props.followed ? <button disabled={isDisabled} onClick={onUnfollow}>unfollow</button> :
                <button disabled={isDisabled} onClick={onFollow}>follow</button>}
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