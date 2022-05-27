import React from 'react';
import classes from './MyPosts.module.css';
import Post from "./Post/Post";
import {TPost} from "../../../types/types";
import {TNewPostValues, WithReduxFormAddNewPost} from "./AddNewPostForm";

const MyPosts:React.FC<TOwnProps> = (props) => {

    const onAddPost = (formData:TNewPostValues) => {
        props.addPostThunkCreator(formData.newPostText)
    }

    return (
        <div>
            My posts
            <WithReduxFormAddNewPost onSubmit={onAddPost}/>
            <div className={`${classes.item} ${classes.active}`}>New post</div>
            {props.posts.map(p => <Post data={p}/>)}
        </div>
    )
}

export default React.memo(MyPosts);

type TOwnProps = {
    addPostThunkCreator: (newPostText:string) => void
    posts: Array<TPost>
}