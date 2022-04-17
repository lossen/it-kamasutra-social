import React from 'react';
import classes from './MyPosts.module.css';
import Post from "./Post/Post";

const MyPosts = (props) => {

    let newPostElement = React.createRef();
    const onAddPost = () => {
        props.addPost()
    }
    const onPostChange = () => {
        let newText = newPostElement.current.value;
        props.updateNewPostText(newText)
    }
    return (
        <div>
            My posts
            <div>
                <textarea name="new_post" ref={newPostElement}
                          cols="30" rows="10"
                          value={props.newPostText} onChange={onPostChange}/>
            </div>
            <div>
                <button onClick={onAddPost}>Add post</button>
            </div>
            <div className={`${classes.item} ${classes.active}`}>New post</div>
            {props.posts.map(p => <Post message={p.message} like_counts={p.likesCount}/>)}
        </div>
    )
}

export default MyPosts;