import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../common/Forms/FormControls";
import {required} from "../../../utils/validators";

const AddNewPostForm: React.FC<InjectedFormProps<TNewPostValues, TOwnProps> & TOwnProps> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name="newPostText" component={Textarea} validate={required}/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}
export let WithReduxFormAddNewPost = reduxForm<TNewPostValues>({
    form: 'addPost'
})(AddNewPostForm)

type TOwnProps = {}
export type TNewPostValues = {
    newPostText: string
}