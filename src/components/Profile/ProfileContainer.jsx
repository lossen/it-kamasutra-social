import React from 'react';
import Profile from "./Profile";
import * as axios from "axios";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profileReducer";
import {withRouter} from "../hocs/WithRouter/WithRouter";

class ProfileContainer extends React.Component{

    componentDidMount() {
        this.getProfileData()
    }

    getProfileData = (page) => {
        let userId = this.props.params.user_id;
        if(!userId) userId = 2;
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
            .then(res => {
                this.props.setUserProfile(res.data)
            })
    }
    render() {
        return(
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile
})
export default connect(mapStateToProps,{
    setUserProfile
})(withRouter(ProfileContainer));