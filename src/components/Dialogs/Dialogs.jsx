import React from 'react';
import classes from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./MessageItem/MessageItem";

const Dialogs = (props) => {
    return(
        <div className={classes.dialogs}>
            <div className="items">
                {props.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)}
            </div>
            <div className="messages">
                {props.messages.map(m => <MessageItem message={m.text} id={m.id}/>)}
            </div>
        </div>
    )
}

export default Dialogs;