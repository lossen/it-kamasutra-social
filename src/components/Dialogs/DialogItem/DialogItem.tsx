import React from 'react';
import classes from './DialogItem.module.css';
import {NavLink} from 'react-router-dom';
import {TDialog} from '../../../types/types';

const DialogItem: React.FC<TDialog> = (props) => {
    return (
        <div>
            <NavLink to={`/dialogs/${props.id}`}
                     className={classes.item}>
                {props.name}
            </NavLink>
        </div>
    );
};

export default DialogItem;