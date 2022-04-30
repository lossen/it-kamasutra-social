import React from "react";
import User from "./User/User";
import Pagination from "../common/Pagination/Pagination";


const Users = (props) => {
    return (
        <div>
            <Pagination totalUsersCount={props.totalUsersCount}
                        pageSize={props.pageSize}
                        currentPage={props.currentPage}
                        setCurrentPage={props.setCurrentPage}
                        getList={props.getUsers}/>
            {props.users && props.users.map(user => {
                return (
                    <div>

                        <User key={user.id} {...user}
                              followUser={props.followUser} unfollowUser={props.unfollowUser}
                              followingProgressQueue={props.followingProgressQueue}/>
                    </div>
                )
            })}
        </div>
    )
}

export default Users;