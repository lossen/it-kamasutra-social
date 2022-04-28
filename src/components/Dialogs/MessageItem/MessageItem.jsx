import React from 'react';
import classes from './MessageItem.module.css';

const MessageItem = (props) => {
    let {body} = props.data;
    return(
        <div className={classes.item}>
            {body}
        </div>
    )
}

export default MessageItem;