import {connect} from "react-redux";
import {
    followUser,
    setCurrentPage, setFetching, setTotalUsersCount,
    setUsers,
    unfollowUser
} from "../../redux/usersReducer";
import React from "react";
import * as axios from "axios";
import Users from "./Users";
import Loader from "../common/Loader/Loader";

class UsersContainer extends React.Component {
    componentDidMount() {
        this.getUsers(this.props.currentPage)
    }

    getUsers = (page) => {
        this.props.setFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`)
            .then(res => {
                this.props.setUsers(res.data.items)
                this.props.setTotalUsersCount(res.data.totalCount)
                this.props.setFetching(false)
            })
    }

    render() {
        return <>
            <Loader isFetching={this.props.isFetching}/>
            <Users getUsers={this.getUsers}
                   totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   setCurrentPage={this.props.setCurrentPage}
                   users={this.props.users}
                   followUser={this.props.followUser}
                   unfollowUser={this.props.unfollowUser}/>
        </>
    }
}

const mapStateToProps = (state) => ({
    users: state.usersPage.users,
    currentPage: state.usersPage.currentPage,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    isFetching: state.usersPage.isFetching,
})


export default connect(mapStateToProps,
    {
        followUser,
        unfollowUser,
        setUsers,
        setCurrentPage,
        setTotalUsersCount,
        setFetching,
    })(UsersContainer);