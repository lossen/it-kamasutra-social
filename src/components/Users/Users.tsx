import React from 'react';
import User from './User/User';
import Pagination from '../common/Pagination/Pagination';
import {TUser} from '../../types/types';
import UsersSearch from './UsersSearch/UsersSearch';
import {TFilter} from '../../redux/usersReducer';

type PropsType = {
    totalUsersCount: number,
    pageSize: number,
    currentPage: number,
    filter: TFilter,
    users: Array<TUser>,

    setCurrentPage: (page: number) => void,
    getUsers: (page: number, filter: TFilter) => void,
    followUser: (user_id: number) => void,
    unfollowUser: (user_id: number) => void,
    followingProgressQueue: Array<number>,
    onFilterChanged: (filter: TFilter) => void
}

const Users: React.FC<PropsType> = (props) => {
    return (
        <div>
            <UsersSearch onFilterChanged={props.onFilterChanged}/>
            <Pagination totalItemsCount={props.totalUsersCount}
                        pageSize={props.pageSize}
                        currentPage={props.currentPage}
                        setCurrentPage={props.setCurrentPage}
                        getList={props.getUsers}
                        portionSize={10}
                        filter={props.filter}/>
            {props.users && props.users.map(user => {
                return (
                    <User key={user.id} user={user}
                          followUser={props.followUser} unfollowUser={props.unfollowUser}
                          followingProgressQueue={props.followingProgressQueue}/>
                );
            })}
        </div>
    );
};

export default Users;