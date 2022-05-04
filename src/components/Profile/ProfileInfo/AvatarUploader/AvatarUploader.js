import React from "react";
import classes from "../ProfileInfo.module.css";

function AvatarUploader(props) {
    const handleChangeFile =(e) => {
        let file = e.target.files[0];
        if(e.target.files.length > 0){
            props.saveAvatar(file)
        }
    }
    return(
        props.isOwner && <input onChange={handleChangeFile} className={classes.uploadAvatarInput} type="file"/>
    )
}

export default AvatarUploader;