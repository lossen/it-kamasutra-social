import {connect} from "react-redux";
import {
    followUserThunkCreator,
    getUsersThunkCreator,
    setCurrentPage,
    unfollowUserThunkCreator
} from "../../redux/usersReducer";
import React from "react";
import Users from "./Users";
import Loader from "../common/Loader/Loader";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingProgressQueue,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/usersSelectors";
import {UserType} from "../../types/types";
import {AppStateType} from "../../redux/reduxStore";

type OwnProps = {

}
type MapStatePropsType = {
    users: Array<UserType>
    currentPage: number
    pageSize: number
    totalUsersCount:number
    isFetching: boolean
    followingProgressQueue: Array<number>
}
type MapDispatchPropsType = {
    setCurrentPage: (currentPage:number) => void
    getUsersThunkCreator: (page: number, pageSize: number) => void
    followUserThunkCreator: (user_id: number) => void
    unfollowUserThunkCreator: (user_id: number) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnProps;

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        this.onGetUsers(this.props.currentPage)
    }

    onGetUsers = (page:number) => {
        this.props.getUsersThunkCreator(page,this.props.pageSize)
    }

    onFollowUser = (user_id:number) => {
        this.props.followUserThunkCreator(user_id)
    }

    onUnfollowUser = (user_id:number) => {
        this.props.unfollowUserThunkCreator(user_id)
    }

    render() {
        return <>
            <Loader isFetching={this.props.isFetching}/>
            <Users getUsers={this.onGetUsers}
                   totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   setCurrentPage={this.props.setCurrentPage}
                   users={this.props.users}
                   followUser={this.onFollowUser}
                   unfollowUser={this.onUnfollowUser}
                   followingProgressQueue={this.props.followingProgressQueue}
            />
        </>
    }
}

const mapStateToProps = (state:AppStateType):MapStatePropsType => ({
    users: getUsers(state),
    currentPage: getCurrentPage(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    isFetching: getIsFetching(state),
    followingProgressQueue: getFollowingProgressQueue(state),
})

export default compose(
    connect<MapStatePropsType,MapDispatchPropsType,AppStateType>(mapStateToProps,
        {
            setCurrentPage,
            getUsersThunkCreator,
            followUserThunkCreator,
            unfollowUserThunkCreator
        }),
)(UsersContainer);