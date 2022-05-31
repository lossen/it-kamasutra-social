import {connect} from 'react-redux';
import {followUser, getUsers, setCurrentPage, setFilter, TFilter, unfollowUser} from '../../redux/usersReducer';
import React from 'react';
import Users from './Users';
import Loader from '../common/Loader/Loader';
import {compose} from 'redux';
import {
    getCurrentPage,
    getFilter,
    getFollowingProgressQueue,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsersSelector
} from '../../redux/usersSelectors';
import {TUser} from '../../types/types';
import {AppStateType} from '../../redux/reduxStore';

type OwnProps = {}
type MapStatePropsType = {
    users: Array<TUser>
    filter: TFilter
    currentPage: number
    pageSize: number
    totalUsersCount: number
    isFetching: boolean
    followingProgressQueue: Array<number>
}
type MapDispatchPropsType = {
    setCurrentPage: (currentPage: number) => void
    getUsers: (page: number, pageSize: number, term: string) => void
    followUser: (user_id: number) => void
    unfollowUser: (user_id: number) => void
    setFilter: (term: string) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnProps;

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        this.onGetUsers(this.props.currentPage, this.props.filter.term);
    }

    onGetUsers = (page: number, term: string) => {
        this.props.getUsers(page, this.props.pageSize, term);
    };

    onFollowUser = (user_id: number) => {
        this.props.followUser(user_id);
    };

    onUnfollowUser = (user_id: number) => {
        this.props.unfollowUser(user_id);
    };

    onFilterChanged = (filter: TFilter) => {
        let {pageSize} = this.props;
        this.props.getUsers(1, pageSize, filter.term);
    };

    render() {
        return <>
            <Loader isFetching={this.props.isFetching}/>
            <Users getUsers={this.onGetUsers}
                   totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   setCurrentPage={this.props.setCurrentPage}
                   users={this.props.users}
                   filter={this.props.filter}
                   followUser={this.onFollowUser}
                   unfollowUser={this.onUnfollowUser}
                   followingProgressQueue={this.props.followingProgressQueue}
                   onFilterChanged={this.onFilterChanged}
            />
        </>;
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    users: getUsersSelector(state),
    filter: getFilter(state),
    currentPage: getCurrentPage(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    isFetching: getIsFetching(state),
    followingProgressQueue: getFollowingProgressQueue(state),
});

export default compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, AppStateType>(mapStateToProps,
        {
            setCurrentPage,
            getUsers,
            followUser,
            unfollowUser,
            setFilter
        }),
)(UsersContainer);