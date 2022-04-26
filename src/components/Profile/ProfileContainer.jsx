import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfileDataThunkCreator, setUserProfile} from "../../redux/profileReducer";
import {withRouter} from "../hocs/WithRouter/WithRouter";
import withRedirect from "../hocs/withRedirect/withRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component{

    componentDidMount() {
        this.getProfileData()
    }

    getProfileData = () => {
        let userId = this.props.params.user_id;
        if(!userId) userId = 2;
        this.props.getProfileDataThunkCreator(userId)
    }
    render() {
        return(
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
})

export default compose(
    connect(mapStateToProps,{
        setUserProfile,
        getProfileDataThunkCreator
    }),
    withRedirect,
    withRouter
)(ProfileContainer);