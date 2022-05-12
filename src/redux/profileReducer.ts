import {profileAPI} from "../api";
import {APP_NAME} from "../commonConsts";
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./reduxStore";

const ADD_POST = `${APP_NAME}/profile/ADD_POST`,
    SET_USER_PROFILE = `${APP_NAME}/profile/SET_USER_PROFILE`,
    SET_PROFILE_STATUS = `${APP_NAME}/profile/SET_PROFILE_STATUS`,
    DELETE_POST = `${APP_NAME}/profile/DELETE_POST`,
    SAVE_PHOTOS = `${APP_NAME}/profile/SAVE_PHOTOS`;

type InitialStateType = typeof initialState;

let initialState = {
    posts: [] as Array<PostType> | [],
    profile: null as null | ProfileType,
    profileStatus: ""
}

const profileReducer = (state = initialState, action):InitialStateType => {
    switch (action.type){
        case ADD_POST:
            let newPost = {id: state.posts.length +1, message: action.body, likesCount: 17};
            return {
                ...state,
                posts: [...state.posts, newPost ],
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_PROFILE_STATUS:
            return {
                ...state,
                profileStatus: action.profileStatus
            }
        case DELETE_POST:
            return {
                ...state,
                posts: [...state.posts].filter(p => p.id !== action.id)
            }
        case SAVE_PHOTOS:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }
        default: return state;
    }
}
//action creators
type ActionsTypes = addPostActionType | deletePostActionType | saveAvatarActionType | setUserProfileActionType | setProfileStatusActionType;

type addPostActionType = {type: typeof ADD_POST, body: string}
export const addPost = (body):addPostActionType => ({type: ADD_POST, body})

type deletePostActionType = {type: typeof DELETE_POST, id:number}
export const deletePost = (id):deletePostActionType => ({type: DELETE_POST, id})

type saveAvatarActionType = {type: typeof SAVE_PHOTOS, photos:PhotosType}
export const saveAvatarActionCreator = (photos):saveAvatarActionType => ({type: SAVE_PHOTOS, photos})

type setUserProfileActionType = { type: typeof SET_USER_PROFILE, profile: ProfileType }
export const setUserProfile = (profile):setUserProfileActionType => ({
    type: SET_USER_PROFILE,
    profile
})

type setProfileStatusActionType = {
    type: typeof SET_PROFILE_STATUS,
    profileStatus:string
}
export const setProfileStatus = (profileStatus:string):setProfileStatusActionType => ({
    type: SET_PROFILE_STATUS,
    profileStatus
})
//action creators end

//thunk creators
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

export const getProfileDataThunkCreator = (userId:number):ThunkType =>
    async (dispatch) => {
        let data = await profileAPI.getProfileData(userId)
        dispatch(setUserProfile(data))
    }

export const getProfileStatusThunkCreator = (userId:number):ThunkType =>
    async (dispatch) => {
        let data = await profileAPI.getProfileStatus(userId)
        dispatch(setProfileStatus(data))
    }

export const setProfileStatusThunkCreator = (status:string):ThunkType =>
    async (dispatch) => {
        let res = await profileAPI.setProfileStatus(status)
        if (res.data.resultCode === 0) {
            dispatch(setProfileStatus(status))
        }
    }

export const addPostThunkCreator = (newPostText:string):ThunkType =>
    async (dispatch) => {
        let data = await profileAPI.addNewPost(newPostText)
        if (data.resultCode === 0) {
            dispatch(addPost(data.post))
        }
    }

export const saveAvatar = (file:File):ThunkType =>
    async (dispatch) => {
        let res = await profileAPI.sendPhoto(file)
        if (res.resultCode === 0) {
            dispatch(saveAvatarActionCreator(res.data.photos))
        }
    }

export const saveProfileData = (data:ProfileType):ThunkType =>
    async (dispatch,getState) => {
        let res = await profileAPI.saveProfile(data)
        if (res.resultCode === 0) {
            return dispatch(getProfileDataThunkCreator(getState().auth.userId))
        }else {
            dispatch(stopSubmit("profileDataForm", {"contacts": {"_error": res.messages[0]}}))
            return Promise.reject(res.messages[0])
        }
    }
//thunk creators end
export default profileReducer;