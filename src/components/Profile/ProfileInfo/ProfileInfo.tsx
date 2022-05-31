import React, {useState} from 'react';
import classes from './ProfileInfo.module.css';
import Loader from '../../common/Loader/Loader';
import ProfileStatus from './ProfileStatus';
// @ts-ignore
import Avatar from '../../../images/avatar.placeholder.png';
import AvatarUploader from './AvatarUploader/AvatarUploader';
import ProfileData from './ProfileData/ProfileData';
import ReduxFormEditProfile from './ProfileData/ProfileDataForm';
import {TProfile} from '../../../types/types';

type PropsType = {
    profile: TProfile
    profileStatus: string
    isOwner: boolean
    updateProfileStatus: (status: string) => void
    saveAvatar: (file: File) => void
    saveProfileData: (formData: TProfile) => void
}

const ProfileInfo: React.FC<PropsType> = ({profile, profileStatus, updateProfileStatus, ...props}) => {
    let [editMode, setEditMode] = useState(false);
    if (!profile) return <Loader isFetching={true}/>;

    const onSubmit = async (formData: TProfile) => {
        await props.saveProfileData(formData);
        setEditMode(false);
    };

    return (
        <div className={classes.profileInfo}>
            <div className={classes.topCoverImageWrapper}>
                <div className={classes.topCoverImageWrapperInner}>
                    <img className={classes.topCoverImage}
                         src="https://images.unsplash.com/photo-1586184059891-09ad2a30f3ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2148&q=80"
                         alt=""/>
                </div>
                <div className={classes.avatarWrapper}>
                    <img className={classes.avatarImage} src={profile.photos.small || Avatar} alt="avatar"/>
                    <AvatarUploader isOwner={props.isOwner} saveAvatar={props.saveAvatar}/>
                </div>
            </div>
            <ProfileStatus profileStatus={profileStatus} updateProfileStatus={updateProfileStatus}/>
            {editMode ? <ReduxFormEditProfile initialValues={profile} profile={profile} onSubmit={onSubmit}/> :
                <ProfileData setEditMode={() => setEditMode(!editMode)} profile={profile}/>}
        </div>

    );
};

export default ProfileInfo;