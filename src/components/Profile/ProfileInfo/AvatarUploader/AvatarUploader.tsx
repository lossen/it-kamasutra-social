import React, {ChangeEvent} from 'react';
import classes from '../ProfileInfo.module.css';

type PropsType = {
    isOwner: boolean
    saveAvatar: (file:File) => void
}

const AvatarUploader: React.FC<PropsType> = (props) => {
    const handleChangeFile =(e:ChangeEvent<HTMLInputElement>) => {
        let file = e.target.files[0];
        if(e.target.files?.length > 0){
            props.saveAvatar(file)
        }
    }
    return(
        props.isOwner && <input onChange={handleChangeFile} className={classes.uploadAvatarInput} type="file"/>
    )
}

export default AvatarUploader;