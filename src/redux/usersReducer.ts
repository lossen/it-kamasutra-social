import {updateObjectsInArray} from '../utils/helpers';
import {APP_NAME} from '../commonConsts';
import {TUser} from '../types/types';
import {InferActionsTypes, TBaseThunk} from './reduxStore';
import {Dispatch} from 'redux';
import {usersAPI} from '../api/usersAPI';
import {TAPIResponse} from '../api/api';

const FOLLOW_USER = `${APP_NAME}/users/FOLLOW_USER` as const,
    UNFOLLOW_USER = `${APP_NAME}/users/UNFOLLOW_USER` as const,
    SET_USERS = `${APP_NAME}/users/SET_USERS` as const,
    SET_CURRENT_PAGE = `${APP_NAME}/users/SET_CURRENT_PAGE` as const,
    SET_TOTAL_USERS_COUNT = `${APP_NAME}/users/SET_TOTAL_USERS_COUNT` as const,
    SET_FETCHING = `${APP_NAME}/users/SET_FETCHING` as const,
    SET_FILTER = `${APP_NAME}/users/SET_FILTER` as const,
    SET_FOLLOWING_PROGRESS_QUEUE = `${APP_NAME}/users/SET_FOLLOWING_PROGRESS_QUEUE` as const;

let initialState = {
    users: [] as Array<TUser> | [],
    pageSize: 100,
    filter: {
        term: '',
        friend: null as null | boolean
    },
    totalUsersCount: 21,
    currentPage: 1,
    isFetching: false,
    followingProgressQueue: [] as Array<number>, // Array of users ids
};

const usersReducer = (state = initialState, action: ActionsTypes): TInitialState => {
    switch (action.type) {
        case FOLLOW_USER:
            return {
                ...state,
                users: updateObjectsInArray(state.users, action.user_id, 'id', {followed: true})
            };
        case UNFOLLOW_USER:
            return {
                ...state,
                users: updateObjectsInArray(state.users, action.user_id, 'id', {followed: false})
            };
        case SET_USERS:
            return {
                ...state,
                users: action.users
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            };
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            };
        case SET_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };
        case SET_FOLLOWING_PROGRESS_QUEUE:
            return {
                ...state,
                followingProgressQueue:
                    action.isFetching ? [...state.followingProgressQueue, action.userId]
                        : state.followingProgressQueue.filter(id => id !== action.userId)
            };
        case SET_FILTER:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};
type ActionsTypes = InferActionsTypes<typeof actionCreators>
export const actionCreators = {
    followUser: (user_id: number) => ({
        type: FOLLOW_USER,
        user_id
    }),
    unfollowUser: (user_id: number) => ({
        type: UNFOLLOW_USER,
        user_id
    }),
    setUsers: (users: Array<TUser>) => ({
        type: SET_USERS,
        users
    }),
    setCurrentPage: (currentPage: number) => ({
        type: SET_CURRENT_PAGE,
        currentPage
    }),
    setTotalUsersCount: (totalUsersCount: number) => ({
        type: SET_TOTAL_USERS_COUNT,
        totalUsersCount
    }),
    setFetching: (isFetching: boolean) => ({
        type: SET_FETCHING,
        isFetching
    }),
    toggleFollowingIsFetching: (isFetching: boolean, userId: number) => ({
        type: SET_FOLLOWING_PROGRESS_QUEUE,
        isFetching,
        userId
    }),
    setFilter: (filter:TFilter) => ({
        type: SET_FILTER,
        payload: {filter}
    })

};

//thunk creators
export const getUsers = (page: number, pageSize: number, filter:TFilter): TThunk =>
    async (dispatch) => { //thunk function
        dispatch(actionCreators.setFetching(true));
        dispatch(actionCreators.setFilter(filter));
        dispatch(actionCreators.setCurrentPage(page));
        let data = await usersAPI.getUsers(page, pageSize, filter);
        dispatch(actionCreators.setFetching(false));
        dispatch(actionCreators.setUsers(data.items));
        dispatch(actionCreators.setTotalUsersCount(data.totalCount));
    };

const _followUnfollowFlow = async (dispatch: DispatchType,
                                   user_id: number,
                                   apiMethod: (userId: number) => Promise<TAPIResponse>,
                                   actionCreator: (user_id: number) => ActionsTypes) => {
    dispatch(actionCreators.toggleFollowingIsFetching(true, user_id));
    let data = await apiMethod(user_id);
    if (data && data.resultCode === 0) {
        dispatch(actionCreator(user_id));
        dispatch(actionCreators.toggleFollowingIsFetching(false, user_id));
    }
};

export const followUser = (user_id): TThunk =>//thunk creator
    async (dispatch) => {//thunk function
        await _followUnfollowFlow(dispatch, user_id, usersAPI.followUser.bind(usersAPI), actionCreators.followUser);
    };

export const unfollowUser = (user_id): TThunk =>//thunk creator
    async (dispatch) => {//thunk function
        await _followUnfollowFlow(dispatch, user_id, usersAPI.unfollowUser.bind(usersAPI), actionCreators.unfollowUser);
    };

export const setCurrentPage = (currentPage: number): TThunk => //thunk creator
    async (dispatch) => { //thunk function
        dispatch(actionCreators.setCurrentPage(currentPage));
    };
export const setFilter = (filter:TFilter): TThunk =>
    async (dispatch) => {
        dispatch(actionCreators.setFilter(filter));
    };
//thunk functions end
export default usersReducer;

type TThunk = TBaseThunk<ActionsTypes>;
export type DispatchType = Dispatch<ActionsTypes>
export type TInitialState = typeof initialState;
export type TFilter = typeof initialState.filter;

