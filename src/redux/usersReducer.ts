import {usersAPI} from "../api";
import {updateObjectsInArray} from "../utils/helpers";
import {APP_NAME} from "../commonConsts";
import {UserType} from "../types/types";
import {AppStateType} from "./reduxStore";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";

const FOLLOW_USER = `${APP_NAME}/users/FOLLOW_USER`,
    UNFOLLOW_USER = `${APP_NAME}/users/UNFOLLOW_USER`,
    SET_USERS = `${APP_NAME}/users/SET_USERS`,
    SET_CURRENT_PAGE = `${APP_NAME}/users/SET_CURRENT_PAGE`,
    SET_TOTAL_USERS_COUNT = `${APP_NAME}/users/SET_TOTAL_USERS_COUNT`,
    SET_FETCHING = `${APP_NAME}/users/SET_FETCHING`,
    SET_FOLLOWING_PROGRESS_QUEUE = `${APP_NAME}/users/SET_FOLLOWING_PROGRESS_QUEUE`;

type initialStateType = typeof initialState;

let initialState = {
    users: [] as Array<UserType> | [],
    pageSize: 100,
    totalUsersCount: 21,
    currentPage: 1,
    isFetching: false,
    followingProgressQueue: [] as Array<number>, // Array of users ids
};

const usersReducer = (state = initialState, action):initialStateType => {
    switch (action.type) {
        case FOLLOW_USER:
            return {
                ...state,
                users: updateObjectsInArray(state.users, action.user_id, 'id', {followed: true})
            }
        case UNFOLLOW_USER:
            return {
                ...state,
                users: updateObjectsInArray(state.users, action.user_id, 'id', {followed: false})
            }
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        case SET_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case SET_FOLLOWING_PROGRESS_QUEUE:
            return {
                ...state,
                followingProgressQueue:
                    action.isFetching ? [...state.followingProgressQueue, action.userId]
                        : state.followingProgressQueue.filter(id => id !== action.userId)
            }
        default:
            return state;
    }
}
type ActionsTypes =
    followUserActionType
    | unfollowUserActionType
    | setUsersActionType
    | setCurrentPageActionType
    | setTotalUsersCountActionType
    | setFetchingActionType
    | toggleFollowingIsFetchingActionType;
//action creators
type followUserActionType = { type: typeof FOLLOW_USER, user_id: number}
export const followUser = (user_id:number):followUserActionType => {
    return {
        type: FOLLOW_USER,
        user_id
    }
}

type unfollowUserActionType = { type: typeof UNFOLLOW_USER, user_id:number }
export const unfollowUser = (user_id:number):unfollowUserActionType => {
    return {
        type: UNFOLLOW_USER,
        user_id
    }
}

type setUsersActionType = { type: typeof SET_USERS, users:Array<UserType> }
export const setUsers = (users:Array<UserType>):setUsersActionType => {
    return {
        type: SET_USERS,
        users
    }
}

type setCurrentPageActionType = { type: typeof SET_CURRENT_PAGE, currentPage:number }
export const setCurrentPage = (currentPage:number):setCurrentPageActionType => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage
    }
}

type setTotalUsersCountActionType = { type: typeof SET_TOTAL_USERS_COUNT, totalUsersCount:number }
export const setTotalUsersCount = (totalUsersCount:number):setTotalUsersCountActionType => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        totalUsersCount
    }
}

type setFetchingActionType = { type: typeof SET_FETCHING, isFetching:boolean }
export const setFetching = (isFetching:boolean):setFetchingActionType => {
    return {
        type: SET_FETCHING,
        isFetching
    }
}

type toggleFollowingIsFetchingActionType = { type: typeof SET_FOLLOWING_PROGRESS_QUEUE, isFetching:boolean,userId:number }
export const toggleFollowingIsFetching = (isFetching:boolean, userId:number):toggleFollowingIsFetchingActionType => {
    return {
        type: SET_FOLLOWING_PROGRESS_QUEUE,
        isFetching,
        userId
    }
}
//end action creators

//thunk creators
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>
export type DispatchType = Dispatch<ActionsTypes>
export const getUsersThunkCreator = (page:number, pageSize:number):ThunkType =>
    async (dispatch) => { //thunk function
        dispatch(setFetching(true))
        let data = await usersAPI.getUsers(page, pageSize);
        dispatch(setFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setTotalUsersCount(data.totalCount))
    }

const _followUnfollowFlow = async (dispatch: DispatchType, user_id: number, apiMethod, actionCreator: (user_id: number) => followUserActionType | unfollowUserActionType) => {
    dispatch(toggleFollowingIsFetching(true, user_id))
    let data = await apiMethod(user_id)
    if (data.resultCode === 0) {
        dispatch(actionCreator(user_id))
        dispatch(toggleFollowingIsFetching(false, user_id))
    }
}
export const followUserThunkCreator = (user_id):ThunkType =>//thunk creator
    async (dispatch) => {//thunk function
        await _followUnfollowFlow(dispatch, user_id, usersAPI.followUser, followUser)
    }

export const unfollowUserThunkCreator = (user_id):ThunkType =>//thunk creator
    async (dispatch) => {//thunk function
        await _followUnfollowFlow(dispatch, user_id, usersAPI.unfollowUser, unfollowUser)
    }
//thunk functions end
export default usersReducer;