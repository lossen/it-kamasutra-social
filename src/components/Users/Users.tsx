import React, {useEffect} from 'react';
import User from './User/User';
import Pagination from '../common/Pagination/Pagination';
import UsersSearch from './UsersSearch/UsersSearch';
import {followUser, getUsers, TFilter, unfollowUser,} from '../../redux/usersReducer';
import {useDispatch, useSelector} from 'react-redux';
import {
    getCurrentPage,
    getFilter,
    getFollowingProgressQueue,
    getPageSize,
    getTotalUsersCount,
    getUsersSelector
} from '../../redux/usersSelectors';
import {TThunkDispatch} from '../../redux/reduxStore';

type PropsType = {

}

const Users: React.FC<PropsType> = (props) => {
    const users = useSelector(getUsersSelector)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getFilter)
    const dispatch:TThunkDispatch = useDispatch();

    useEffect(() => {
        onGetUsers(currentPage);
    },[])

    const onGetUsers = (page: number) => {
        dispatch(getUsers(page, pageSize, filter))
    };
    const onFilterChanged = (filter: TFilter) => {
        dispatch(getUsers(1, pageSize, filter))
    };
    const onFollow = (userId:number) => {
        dispatch(followUser(userId))
    };
    const onUnfollow = (userId: number) => {
        dispatch(unfollowUser(userId))
    };
    const followingProgressQueue = useSelector(getFollowingProgressQueue)

    return (
        <div>
            <UsersSearch onFilterChanged={onFilterChanged}/>
            <Pagination totalItemsCount={totalUsersCount}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        getList={onGetUsers}
                        portionSize={10}
                        filter={filter}/>
            {users && users.map(user => {
                return (
                    <User key={user.id} user={user}
                          followUser={onFollow} unfollowUser={onUnfollow}
                          followingProgressQueue={followingProgressQueue}/>
                );
            })}
        </div>
    );
};

export default Users;