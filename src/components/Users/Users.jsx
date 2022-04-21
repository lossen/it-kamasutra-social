import React from "react";
import User from "./User/User";
import classes from './Users.module.css'
import Pagination from "./Pagination/Pagination";


const Users = (props) => {
    return (
        <div>
            <Pagination totalUsersCount={props.totalUsersCount}
                        pageSize={props.pageSize}
                        currentPage={props.currentPage}
                        setCurrentPage={props.setCurrentPage}
                        getUsers={props.getUsers}/>
            {props.users && props.users.map(user => {
                return (
                    <div>

                        <User key={user.id} {...user}
                              followUser={props.followUser} unfollowUser={props.unfollowUser}/>
                    </div>
                )
            })}
        </div>
    )
}

export default Users;