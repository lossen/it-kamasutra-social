import React from 'react';
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

class ProfileContainer extends React.Component{

    componentDidMount() {
        this.getProfileData()
    }

    getProfileData = () => {
        let userId = this.props.params.user_id;
        if(!userId) userId = this.props.userId;
        this.props.getProfileDataThunkCreator(userId)
        this.props.getProfileStatusThunkCreator(userId)
    }

    updateProfileStatus = (status) => {
        this.props.setProfileStatusThunkCreator(status)
    }
    render() {
        return(
            <Profile {...this.props} profile={this.props.profile}
                     updateProfileStatus={this.updateProfileStatus}/>
        )
    }
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