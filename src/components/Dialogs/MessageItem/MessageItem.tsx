import React from 'react';
import classes from './MessageItem.module.css';
import {TMessage} from "../../../types/types";

const MessageItem:React.FC<TOwnProps> = (props) => {
    let {message} = props.data;
    return(
        <div className={classes.item}>
            {message}
        </div>
    )
}

export default MessageItem;

type TOwnProps = {
    data: TMessage
}