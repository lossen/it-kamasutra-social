import {updateObjectsInArray} from "../utils/helpers";
import {APP_NAME} from "../commonConsts";
import {TUser} from "../types/types";
import {AppStateType, InferActionsTypes} from "./reduxStore";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {usersAPI} from "../api/usersAPI";

const FOLLOW_USER = `${APP_NAME}/users/FOLLOW_USER` as const,
    UNFOLLOW_USER = `${APP_NAME}/users/UNFOLLOW_USER` as const,
    SET_USERS = `${APP_NAME}/users/SET_USERS` as const,
    SET_CURRENT_PAGE = `${APP_NAME}/users/SET_CURRENT_PAGE` as const,
    SET_TOTAL_USERS_COUNT = `${APP_NAME}/users/SET_TOTAL_USERS_COUNT` as const,
    SET_FETCHING = `${APP_NAME}/users/SET_FETCHING` as const,
    SET_FOLLOWING_PROGRESS_QUEUE = `${APP_NAME}/users/SET_FOLLOWING_PROGRESS_QUEUE` as const;

type initialStateType = typeof initialState;

let initialState = {
    users: [] as Array<TUser> | [],
    pageSize: 100,
    totalUsersCount: 21,
    currentPage: 1,
    isFetching: false,
    followingProgressQueue: [] as Array<number>, // Array of users ids
};

const usersReducer = (state = initialState, action:ActionsTypes):initialStateType => {
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
//action creators
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
        }
    ),
    setFetching: (isFetching: boolean) => ({
        type: SET_FETCHING,
        isFetching
    }),
    toggleFollowingIsFetching: (isFetching: boolean, userId: number) => ({
        type: SET_FOLLOWING_PROGRESS_QUEUE,
        isFetching,
        userId
    })

}

//end action creators

//thunk creators
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>
export type DispatchType = Dispatch<ActionsTypes>

export const getUsers = (page:number, pageSize:number):ThunkType =>
    async (dispatch) => { //thunk function
        dispatch(actionCreators.setFetching(true))
        let data = await usersAPI.getUsers(page, pageSize);
        dispatch(actionCreators.setFetching(false))
        dispatch(actionCreators.setUsers(data.items))
        dispatch(actionCreators.setTotalUsersCount(data.totalCount))
    }

const _followUnfollowFlow = async (dispatch: DispatchType, user_id: number, apiMethod, actionCreator: (user_id: number) => any) => {
    dispatch(actionCreators.toggleFollowingIsFetching(true, user_id))
    let data = await apiMethod(user_id)
    if (data.resultCode === 0) {
        dispatch(actionCreator(user_id))
        dispatch(actionCreators.toggleFollowingIsFetching(false, user_id))
    }
}
export const followUser = (user_id):ThunkType =>//thunk creator
    async (dispatch) => {//thunk function
        await _followUnfollowFlow(dispatch, user_id, usersAPI.followUser, actionCreators.followUser)
    }

export const unfollowUser = (user_id):ThunkType =>//thunk creator
    async (dispatch) => {//thunk function
        await _followUnfollowFlow(dispatch, user_id, usersAPI.unfollowUser, actionCreators.unfollowUser)
    }

export const setCurrentPage = (currentPage:number):ThunkType => //thunk creator
    async (dispatch) => { //thunk function
        dispatch(actionCreators.setCurrentPage(currentPage))
    }
//thunk functions end
export default usersReducer;