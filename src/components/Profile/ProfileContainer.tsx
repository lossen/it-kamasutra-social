import React, {useEffect} from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {
    getProfileDataThunkCreator,
    getProfileStatusThunkCreator,
    saveAvatar,
    saveProfileData,
    setProfileStatusThunkCreator,
} from '../../redux/profileReducer';
import {withRouter} from '../hocs/WithRouter/WithRouter';
import withRedirect from '../hocs/withAuthRedirect/withAuthRedirect';
import {compose} from 'redux';
import {TProfile} from '../../types/types';
import {AppStateType} from '../../redux/reduxStore';

type TStateProps = ReturnType<typeof mapStateToProps>

type TDispatchProps = {
    saveProfileData: (formData: TProfile) => void
    saveAvatar: (file: File) => void
    getProfileDataThunkCreator: (userId: number) => void
    getProfileStatusThunkCreator: (userId: number) => void
    setProfileStatusThunkCreator: (status: string) => void
}

type TOwnProps = {
    params: any
}


type PropsType = TStateProps & TDispatchProps & TOwnProps;

const ProfileContainer: React.FC<PropsType> = (props) => {

    useEffect(() => {
        getProfileData();
    }, [props.userId, props.params.user_id]);
    const getProfileData = () => {
        let userId = props.params.user_id;
        if (!userId) userId = props.userId;
        props.getProfileDataThunkCreator(userId);
        props.getProfileStatusThunkCreator(userId);
    };
    const updateProfileStatus = (status: string) => {
        props.setProfileStatusThunkCreator(status);
    };

    return (
        <Profile {...props} profile={props.profile}
                 updateProfileStatus={updateProfileStatus}
                 isOwner={!!(!props.params.user_id && props.userId)}/>
    );
};


let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    profileStatus: state.profilePage.profileStatus,
    userId: state.auth.userId,
});

export default compose<React.ComponentType>(
    connect<TStateProps, TDispatchProps, TOwnProps>(mapStateToProps, {
        getProfileDataThunkCreator,
        getProfileStatusThunkCreator,
        setProfileStatusThunkCreator,
        saveAvatar,
        saveProfileData
    }),
    withRedirect,
    withRouter
)(ProfileContainer);