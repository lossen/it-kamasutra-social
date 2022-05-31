import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import {TProfile} from '../../types/types';

type PropsType = {
    profile: TProfile
    profileStatus: string
    isOwner: boolean

    updateProfileStatus: (status: string) => void
    saveProfileData: (formData: TProfile) => void
    saveAvatar: (file: File) => void
}

const Profile: React.FC<PropsType> = (props) => {
    return (
        <main className="content">
            <ProfileInfo profile={props.profile} profileStatus={props.profileStatus}
                         updateProfileStatus={props.updateProfileStatus} isOwner={props.isOwner}
                         saveAvatar={props.saveAvatar} saveProfileData={props.saveProfileData}/>
            <MyPostsContainer/>
        </main>

    );
};

export default Profile;