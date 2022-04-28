import React from 'react';
import classes from './MyPosts.module.css';
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {required} from "../../../utils/validators";
import {Textarea} from "../../common/Forms/FormControls";

const MyPosts = (props) => {

    const onAddPost = (formData) => {
        console.log(formData,'formData')
        props.addPostThunkCreator(formData.newPost)
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
const AddNewPostForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name="newPost" component={Textarea} validate={required}/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

let WithReduxFormAddNewPost = reduxForm({
    form: 'addPost'
})(AddNewPostForm)
export default MyPosts;