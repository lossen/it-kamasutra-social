import React from 'react';
import classes from './Post.module.css';

const Post = (props) => {
    return (
        <div className={classes.item}>
            <div className={classes.avatar}>
                <img src="https://images.unsplash.com/photo-1541840524505-3d825592d8ac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80" alt=""/>
            </div>
            {props.message}
            <div>
                <button>Like </button>
                {props.like_counts} likes
            </div>
        </div>

    )
}

export default Post;
