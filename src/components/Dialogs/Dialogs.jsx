import React from 'react';
import classes from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./MessageItem/MessageItem";
import {Field, reduxForm} from "redux-form";

const Dialogs = (props) => {
    const onSendMessageClick = (formData) => {
        props.sendMessageThunkCreator(formData.message)
    }

    return(
        <div className={classes.dialogs}>
            <div className="items">
                {props.dialogsPage.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)}
            </div>
            <div className={classes.messages}>
                <div>
                    {props.dialogsPage.messages.map(m => <MessageItem data={m}/>)}
                </div>
                <div>
                    <WithReduxAddMessageForm onSubmit={onSendMessageClick}/>

                </div>
            </div>

        </div>
    )
}

const AddMessageForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={"message"} type={"textarea"} placeholder={'Enter your message'} component={"textarea"}/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}
let WithReduxAddMessageForm = reduxForm({
    form: 'sendMessage'
})(AddMessageForm)
export default Dialogs;