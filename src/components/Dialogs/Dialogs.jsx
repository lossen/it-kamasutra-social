import React from 'react';
import classes from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./MessageItem/MessageItem";

const Dialogs = (props) => {
    const onSendMessageClick = () => {
        props.sendMessage()
    }

    const onChangeMessageBody = (e) => {
        let body = e.target.value;
        props.updateNewMessageBody(body)
    }

    return(
        <div className={classes.dialogs}>
            <div className="items">
                {props.dialogsPage.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)}
            </div>
            <div className={classes.messages}>
                <div>
                    {props.dialogsPage.messages.map(m => <MessageItem message={m.text} id={m.id}/>)}
                </div>
                <div>
                    <div>
                        <textarea onChange={onChangeMessageBody} value={props.dialogsPage.newMessageBody} placeholder={'Enter your message'}/>
                    </div>
                    <div>
                        <button onClick={onSendMessageClick}>Send</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Dialogs;