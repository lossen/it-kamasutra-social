import React from 'react';
import classes from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";

const Profile = () => {
    return (
        <main className="content">
            <div>
                <img src="https://images.unsplash.com/photo-1586184059891-09ad2a30f3ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2148&q=80" alt=""/>
            </div>
            <div>
                avatar + desc
            </div>
            <MyPosts/>
        </main>

    )
}

export default Profile;