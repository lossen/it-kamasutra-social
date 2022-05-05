import {profileAPI} from "../api";
import {APP_NAME} from "../commonConsts";
import {stopSubmit} from "redux-form";

const ADD_POST = `${APP_NAME}/profile/ADD_POST`,
    SET_USER_PROFILE = `${APP_NAME}/profile/SET_USER_PROFILE`,
    SET_PROFILE_STATUS = `${APP_NAME}/profile/SET_PROFILE_STATUS`,
    DELETE_POST = `${APP_NAME}/profile/DELETE_POST`,
    SAVE_PHOTOS = `${APP_NAME}/profile/SAVE_PHOTOS`;

let initialState = {
    posts: [
        {id: 1, message: "hi", likesCount: 12},
        {id: 2, message: "how are you?", likesCount: 11},
        {id: 3, message: "me first post", likesCount: 0},
    ],
    profile: null,
    profileStatus: ""
}

const profileReducer = (state = initialState, action) => {
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
export const addPost = (body) => ({type: ADD_POST, body})
export const deletePost = (id) => ({type: DELETE_POST, id})
export const saveAvatarActionCreator = (photos) => ({type: SAVE_PHOTOS, photos})

export const setUserProfile = (profile) => ({
    type: SET_USER_PROFILE,
    profile})

export const setProfileStatus = (profileStatus) => ({
    type: SET_PROFILE_STATUS,
    profileStatus
})
//action creators end

//thunk creators
export const getProfileDataThunkCreator = (userId) =>
    async (dispatch) => {
        let data = await profileAPI.getProfileData(userId)
        dispatch(setUserProfile(data))
    }

export const getProfileStatusThunkCreator = (userId) =>
    async (dispatch) => {
        let data = await profileAPI.getProfileStatus(userId)
        dispatch(setProfileStatus(data))
    }

export const setProfileStatusThunkCreator = (status) =>
    async (dispatch) => {
        let res = await profileAPI.setProfileStatus(status)
        if (res.data.resultCode === 0) {
            dispatch(setProfileStatus(status))
        }
    }

export const addPostThunkCreator = (newPostText) =>
    async (dispatch) => {
        let data = await profileAPI.addNewPost(newPostText)
        if (data.resultCode === 0) {
            dispatch(addPost(data.post))
        }
    }

export const saveAvatar = (file) =>
    async (dispatch) => {
        let res = await profileAPI.sendPhoto(file)
        if (res.resultCode === 0) {
            dispatch(saveAvatarActionCreator(res.data.photos))
        }
    }

export const saveProfileData = (data) =>
    async (dispatch,getState) => {
        let res = await profileAPI.saveProfile(data)
        if (res.resultCode === 0) {
            dispatch(getProfileDataThunkCreator(getState().auth.userId))
        }else {
            dispatch(stopSubmit("profileDataForm", {"contacts": {"_error": res.messages[0]}}))
            return Promise.reject(res.messages[0])
        }
    }
//thunk creators end
export default profileReducer;