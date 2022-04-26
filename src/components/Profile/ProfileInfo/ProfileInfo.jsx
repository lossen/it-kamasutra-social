import React from 'react';
import classes from './ProfileInfo.module.css';
import Loader from "../../common/Loader/Loader";
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = (props) => {
    if(!props.profile) return <Loader isFetching={true}/>
    return (
        <div className={classes.profileInfo}>
            <div className={classes.topCoverImageWrapper}>
                <img className={classes.topCoverImage} src="https://images.unsplash.com/photo-1586184059891-09ad2a30f3ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2148&q=80" alt=""/>
            </div>
            <div>
                <img src={props.profile.photos.small} alt="avatar"/>
                About me
                <ProfileStatus/>

                <div>
                    {props.profile.aboutMe}
                </div>
            </div>
        </div>

    )
}

export default ProfileInfo;