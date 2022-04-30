import {usersAPI} from "../api";
import {updateObjectsInArray} from "../utils/helpers";

const FOLLOW_USER = 'FOLLOW_USER',
    UNFOLLOW_USER = 'UNFOLLOW_USER',
    SET_USERS = 'SET_USERS',
    SET_CURRENT_PAGE = 'SET_CURRENT_PAGE',
    SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT',
    SET_FETCHING = 'SET_FETCHING',
    SET_FOLLOWING_PROGRESS_QUEUE = 'SET_FOLLOWING_PROGRESS_QUEUE';

let initialState = {
    users: [],
    pageSize: 100,
    totalUsersCount: 21,
    currentPage: 1,
    isFetching: false,
    followingProgressQueue: [],
};

const usersReducer = (state = initialState, action) => {
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
export const followUser = (user_id) => {
    return {
        type: FOLLOW_USER,
        user_id
    }
}

export const unfollowUser = (user_id) => {
    return {
        type: UNFOLLOW_USER,
        user_id
    }
}

export const setUsers = (users) => {
    return {
        type: SET_USERS,
        users
    }
}

export const setCurrentPage = (currentPage) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage
    }
}

export const setTotalUsersCount = (totalUsersCount) => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        totalUsersCount
    }
}

export const setFetching = (isFetching) => {
    return {
        type: SET_FETCHING,
        isFetching
    }
}

export const toggleFollowingIsFetching = (isFetching, userId) => {
    return {
        type: SET_FOLLOWING_PROGRESS_QUEUE,
        isFetching,
        userId
    }
}
//end action creators

//thunk creators
export const getUsersThunkCreator = (page, pageSize) =>
    async (dispatch) => { //thunk function
        dispatch(setFetching(true))
        let data = await usersAPI.getUsers(page, pageSize);
        dispatch(setFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setTotalUsersCount(data.totalCount))
    }

const followUnfollowFlow = async (dispatch, user_id, apiMethod, actionCreator) => {
    dispatch(toggleFollowingIsFetching(true, user_id))
    let data = await apiMethod(user_id)
    if (data.resultCode === 0) {
        dispatch(actionCreator(user_id))
        dispatch(toggleFollowingIsFetching(false, user_id))
    }
}
export const followUserThunkCreator = (user_id) =>//thunk creator
    async (dispatch) => {//thunk function
        await followUnfollowFlow(dispatch, user_id, usersAPI.followUser, followUser)
    }

export const unfollowUserThunkCreator = (user_id) =>//thunk creator
    async (dispatch) => {//thunk function
        await followUnfollowFlow(dispatch, user_id, usersAPI.unfollowUser, unfollowUser)
    }
//thunk functions end
export default usersReducer;