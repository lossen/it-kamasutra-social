import React from 'react';
import classes from './MyPosts.module.css';
import Post from "./Post/Post";

const MyPosts = (props) => {
    return (
        <div>
            My posts
            <div className={`${classes.item} ${classes.active}`}>New post</div>
            {props.posts.map(p => <Post message={p.message} like_counts={p.likesCount}/>)}
        </div>
    )
}

export default MyPosts;