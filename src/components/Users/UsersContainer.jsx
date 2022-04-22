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
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`, {
            withCredentials: true
        })
            .then(res => {
                this.props.setUsers(res.data.items)
                this.props.setTotalUsersCount(res.data.totalCount)
                this.props.setFetching(false)
            })
    }

    followUser = (user_id) => {
        axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${user_id}`,{},{
            withCredentials: true,
            headers: {
                'api-key': 'bff572b3-b84e-4ae6-b6ad-3c1b727405d4'
            }
        })
            .then(res => {
                this.props.followUser(user_id)
            })

    }

    unfollowUser = (user_id) => {
        axios.delete(`https://social-network.samuraijs.com/api/1.0/unfollow/${user_id}`,{
            withCredentials: true,
            headers: {
                'api-key': 'bff572b3-b84e-4ae6-b6ad-3c1b727405d4'
            }
        })
            .then(res => {
                this.props.unfollowUser(user_id)
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
                   followUser={this.followUser}
                   unfollowUser={this.unfollowUser}/>
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