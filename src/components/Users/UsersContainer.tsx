import {connect} from "react-redux";
import {followUser, getUsers, setCurrentPage, unfollowUser} from "../../redux/usersReducer";
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
    getUsersSelector
} from "../../redux/usersSelectors";
import {TUser} from "../../types/types";
import {AppStateType} from "../../redux/reduxStore";

type OwnProps = {

}
type MapStatePropsType = {
    users: Array<TUser>
    currentPage: number
    pageSize: number
    totalUsersCount:number
    isFetching: boolean
    followingProgressQueue: Array<number>
}
type MapDispatchPropsType = {
    setCurrentPage: (currentPage:number) => void
    getUsers: (page: number, pageSize: number) => void
    followUser: (user_id: number) => void
    unfollowUser: (user_id: number) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnProps;

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        this.onGetUsers(this.props.currentPage)
    }

    onGetUsers = (page:number) => {
        this.props.getUsers(page,this.props.pageSize)
    }

    onFollowUser = (user_id:number) => {
        this.props.followUser(user_id)
    }

    onUnfollowUser = (user_id:number) => {
        this.props.unfollowUser(user_id)
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
    users: getUsersSelector(state),
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
            getUsers,
            followUser,
            unfollowUser
        }),
)(UsersContainer);