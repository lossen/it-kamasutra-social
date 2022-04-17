import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {
    return (
        <main className="content">
            <ProfileInfo/>
            <MyPostsContainer store={props.store}/>
        </main>

    )
}

export default Profile;