// import {createSelector} from "reselect";

import {AppStateType} from './reduxStore';

export const getUsersSelector = (state: AppStateType) => {
    return state.usersPage.users;
};
// export const getUsersReselector = createSelector(getUsers,(users) => {
//     return users.filter(u => true)
// })
export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage;
};

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize;
};

export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount;
};

export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching;
};

export const getFollowingProgressQueue = (state: AppStateType) => {
    return state.usersPage.followingProgressQueue;
};

export const getFilter = (state: AppStateType) => {
    return state.usersPage.filter;
};