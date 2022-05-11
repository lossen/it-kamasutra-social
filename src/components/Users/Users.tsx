import React from "react";
import User from "./User/User";
import Pagination from "../common/Pagination/Pagination";
import {UserType} from "../../types/types";

type PropsType = {
    totalUsersCount: number,
    pageSize: number,
    currentPage: number,
    users: Array<UserType>,

    setCurrentPage: (page:number) => void,
    getUsers: (page:number) => void,
    followUser: (user_id:number) => void,
    unfollowUser: (user_id:number) => void,
    followingProgressQueue: Array<number>,
}

const Users:React.FC<PropsType> = (props) => {
    return (
        <div>
            <Pagination totalItemsCount={props.totalUsersCount}
                        pageSize={props.pageSize}
                        currentPage={props.currentPage}
                        setCurrentPage={props.setCurrentPage}
                        getList={props.getUsers}
                        portionSize={10}/>
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