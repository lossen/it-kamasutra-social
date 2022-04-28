import React from 'react';
import classes from './Post.module.css';

const Post = (props) => {
    let {body} = props.data;
    return (
        <div className={classes.item}>
            <div className={classes.avatar}>
                <img src="https://images.unsplash.com/photo-1541840524505-3d825592d8ac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80" alt=""/>
            </div>
            <div className={classes.flexCol}>
                <div className={classes.postBox}>
                    {body}
                </div>
                <div>
                    <button>Like </button>
                    {props.like_counts} likes
                </div>
            </div>
        </div>

    )
}

export default Post;
