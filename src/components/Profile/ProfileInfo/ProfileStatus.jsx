import React, {useEffect, useState} from 'react';

const ProfileStatus = (props) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [status, setStatus] = useState(props.profileStatus);

    useEffect(() => {
        setStatus(props.profileStatus)

    },[props.profileStatus])

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode)
    }

    const onChangeStatus = (e) => {
        setStatus(e.target.value)
    }

    const handleBlur = () => {
        if(status !== props.profileStatus){
            props.updateProfileStatus(status)
        }
        toggleEditMode()
    }

    return (
        <>
            {isEditMode
                ? <div><input autoFocus onBlur={handleBlur} value={status}
                              onChange={onChangeStatus}/></div>
                : <div><span onDoubleClick={toggleEditMode}>Status: {status || '-----'}</span></div>}
        </>


    )
}

export default ProfileStatus;