import React, {ChangeEvent, useEffect, useState} from 'react';

type PropsType = {
    profileStatus: string,
    updateProfileStatus: (status:string) => void
}

const ProfileStatus:React.FC<PropsType> = (props) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [status, setStatus] = useState(props.profileStatus);

    useEffect(() => {
        setStatus(props.profileStatus)

    },[props.profileStatus])

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode)
    }

    const onChangeStatus = (e:ChangeEvent<HTMLInputElement>) => {
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