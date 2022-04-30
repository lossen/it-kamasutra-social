import React, {useEffect} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getProfileDataThunkCreator,
    getProfileStatusThunkCreator,
    setProfileStatusThunkCreator,
    setUserProfile
} from "../../redux/profileReducer";
import {withRouter} from "../hocs/WithRouter/WithRouter";
import withRedirect from "../hocs/withAuthRedirect/withAuthRedirect";
import {compose} from "redux";

const ProfileContainer = (props) => {

    useEffect(() => {
        getProfileData()
    },[])
    const getProfileData = () => {
        let userId = props.params.user_id;
        if(!userId) userId = props.userId;
        props.getProfileDataThunkCreator(userId)
        props.getProfileStatusThunkCreator(userId)
    }
    const updateProfileStatus = (status) => {
        props.setProfileStatusThunkCreator(status)
    }

    return(
        <Profile {...props} profile={props.profile}
                 updateProfileStatus={updateProfileStatus}/>
    )
}


let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    profileStatus: state.profilePage.profileStatus,
    userId: state.auth.userId,
})

export default compose(
    connect(mapStateToProps,{
        setUserProfile,
        getProfileDataThunkCreator,
        getProfileStatusThunkCreator,
        setProfileStatusThunkCreator
    }),
    withRedirect,
    withRouter
)(ProfileContainer);