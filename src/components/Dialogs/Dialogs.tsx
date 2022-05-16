import React from 'react';
import classes from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./MessageItem/MessageItem";
import {Field, reduxForm} from "redux-form";
import {TDialog, TMessage} from "../../types/types";

type PropsType = {
    dialogs: Array<TDialog>
    messages: Array<TMessage>
    sendMessageThunkCreator: (message:string) => void

}

const Dialogs:React.FC<PropsType> = (props) => {
    const onSendMessageClick = (formData) => {
        props.sendMessageThunkCreator(formData.message)
    }

    return(
        <div className={classes.dialogs}>
            <div className="items">
                {props.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>)}
            </div>
            <div className={classes.messages}>
                <div>
                    {props.messages.map(m => <MessageItem data={m}/>)}
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