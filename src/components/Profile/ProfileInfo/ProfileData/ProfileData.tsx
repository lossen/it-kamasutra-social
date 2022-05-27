import React from "react";
import {TProfile} from "../../../../types/types";

const ProfileData:React.FC<PropsType> = ({profile,setEditMode}) => {
    const handleEditMode = () => {
        setEditMode()
    }
    return <div>
        <button onClick={handleEditMode}>Edit</button>
        <h4>Full name: {profile.fullName}</h4>
        <h4>Looking for a job: {profile.lookingForAJob ? 'yes' : 'no'}</h4>
        {profile.lookingForAJob && <h4>
            Professional skills: {profile.lookingForAJobDescription}
        </h4>}
        <h4>About me: {profile.aboutMe}</h4>
        <div>
            <h5>Contacts: {Object.keys(profile.contacts)
                .map((key) => {
                        return <Contact key={key} title={key} value={profile.contacts[key]}/>
                    }
                )}
            </h5>

        </div>
    </div>
}

const Contact:React.FC<{ title: string,value:string }> = ({title, value}) => {
    return <div>
        <b>{title}:</b> {value}
    </div>
}

export default ProfileData;

type PropsType = {
    profile: TProfile
    setEditMode: () => void
}