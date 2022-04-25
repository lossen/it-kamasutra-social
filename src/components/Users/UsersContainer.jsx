import {connect} from "react-redux";
import {
    followUser,
    setCurrentPage, setFetching, toggleFollowingIsFetching, setTotalUsersCount,
    setUsers,
    unfollowUser, getUsersThunkCreator, followUserThunkCreator, unfollowUserThunkCreator
} from "../../redux/usersReducer";
import React from "react";
import Users from "./Users";
import Loader from "../common/Loader/Loader";

class UsersContainer extends React.Component {
    componentDidMount() {
        this.onGetUsers(this.props.currentPage)
    }

    onGetUsers = (page) => {
        this.props.getUsersThunkCreator(page,this.props.pageSize)
    }

    onFollowUser = (user_id) => {
        this.props.followUserThunkCreator(user_id)
    }

    onUnfollowUser = (user_id) => {
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

const mapStateToProps = (state) => ({
    users: state.usersPage.users,
    currentPage: state.usersPage.currentPage,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    isFetching: state.usersPage.isFetching,
    followingProgressQueue: state.usersPage.followingProgressQueue,
})


export default connect(mapStateToProps,
    {
        followUser,
        unfollowUser,
        setUsers,
        setCurrentPage,
        setTotalUsersCount,
        setFetching,
        toggleFollowingIsFetching,
        getUsersThunkCreator,
        followUserThunkCreator,
        unfollowUserThunkCreator
    })(UsersContainer);