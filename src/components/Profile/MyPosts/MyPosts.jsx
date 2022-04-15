import React from 'react';
import classes from './MyPosts.module.css';
import Post from "./Post/Post";

const MyPosts = () => {
    return (
        <div>
            My posts
            <div className={`${classes.item} ${classes.active}`}>New post</div>
            <Post message={'Hi'} like_counts={15}/>
            <Post message={'First post'} like_counts={20}/>
        </div>

    )
}

export default MyPosts;