import React, {useEffect} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getProfileDataThunkCreator,
    getProfileStatusThunkCreator, saveAvatar, saveProfileData,
    setProfileStatusThunkCreator,
} from "../../redux/profileReducer";
import {withRouter} from "../hocs/WithRouter/WithRouter";
import withRedirect from "../hocs/withAuthRedirect/withAuthRedirect";
import {compose} from "redux";
import {ProfileType} from "../../types/types";
import {AppStateType} from "../../redux/reduxStore";

type TStateProps = {
    profile: ProfileType
    profileStatus: string
    userId: number
}

type TDispatchProps = {
    saveProfileData: (formData:ProfileType) => Promise<any>
    saveAvatar: (file:File) => void
    getProfileDataThunkCreator: (userId:number) => void
    getProfileStatusThunkCreator: (userId:number) => void
    setProfileStatusThunkCreator: (status: string) => void
}

type TOwnProps = {
    params: any
}

type PropsType = TStateProps & TDispatchProps & TOwnProps;

const ProfileContainer:React.FC<PropsType> = (props) => {

    useEffect(() => {
        getProfileData()
    }, [props.userId, props.params.user_id])
    const getProfileData = () => {
        let userId = props.params.user_id;
        if (!userId) userId = props.userId;
        props.getProfileDataThunkCreator(userId)
        props.getProfileStatusThunkCreator(userId)
    }
    const updateProfileStatus = (status:string) => {
        props.setProfileStatusThunkCreator(status)
    }

    return (
        <Profile {...props} profile={props.profile}
                 updateProfileStatus={updateProfileStatus}
                 isOwner={!!(!props.params.user_id && props.userId)}/>
    )
}


let mapStateToProps = (state:AppStateType):TStateProps => ({
    profile: state.profilePage.profile,
    profileStatus: state.profilePage.profileStatus,
    userId: state.auth.userId,
})

export default compose(
    connect<TStateProps,TDispatchProps,TOwnProps>(mapStateToProps, {
        getProfileDataThunkCreator,
        getProfileStatusThunkCreator,
        setProfileStatusThunkCreator,
        saveAvatar,
        // @ts-ignore
        saveProfileData
    }),
    withRedirect,
    withRouter
    // @ts-ignore
)(ProfileContainer);