import {APP_NAME} from "../commonConsts";
import {FormAction, stopSubmit} from "redux-form";
import {TPost, TProfile} from "../types/types";
import {InferActionsTypes, TBaseThunk} from "./reduxStore";
import {profileAPI} from "../api/profileAPI";

const ADD_POST = `${APP_NAME}/profile/ADD_POST` as const,
    SET_USER_PROFILE = `${APP_NAME}/profile/SET_USER_PROFILE` as const,
    SET_PROFILE_STATUS = `${APP_NAME}/profile/SET_PROFILE_STATUS` as const,
    DELETE_POST = `${APP_NAME}/profile/DELETE_POST` as const,
    SAVE_PHOTOS = `${APP_NAME}/profile/SAVE_PHOTOS` as const;

type InitialStateType = typeof initialState;

let initialState = {
    posts: [] as Array<TPost> | [],
    profile: null as null | TProfile,
    profileStatus: ""
}

const profileReducer = (state = initialState, action:ActionsTypes):InitialStateType => {
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
type ActionsTypes = InferActionsTypes<typeof actionCreators>
export const actionCreators = {
    addPost: (body) => ({type: ADD_POST, body}),
    deletePost: (id) => ({type: DELETE_POST, id}),
    saveAvatar: (photos) => ({type: SAVE_PHOTOS, photos}),
    setUserProfile: (profile) => ({
        type: SET_USER_PROFILE,
        profile
    }),
    setProfileStatus: (profileStatus:string) => ({
        type: SET_PROFILE_STATUS,
        profileStatus
    })
}

//thunk creators

export const getProfileDataThunkCreator = (userId:number):TThunk =>
    async (dispatch) => {
        let data = await profileAPI.getProfileData(userId)
        dispatch(actionCreators.setUserProfile(data))
    }

export const getProfileStatusThunkCreator = (userId:number):TThunk =>
    async (dispatch) => {
        let data = await profileAPI.getProfileStatus(userId)
        dispatch(actionCreators.setProfileStatus(data))
    }

export const setProfileStatusThunkCreator = (status:string):TThunk =>
    async (dispatch) => {
        let res = await profileAPI.setProfileStatus(status)
        if (res.data.resultCode === 0) {
            dispatch(actionCreators.setProfileStatus(status))
        }
    }

export const addPostThunkCreator = (newPostText:string):TThunk =>
    async (dispatch) => {
        let data = await profileAPI.addNewPost(newPostText)
        if (data.resultCode === 0) {
            dispatch(actionCreators.addPost(data.post))
        }
    }

export const saveAvatar = (file:File):TThunk =>
    async (dispatch) => {
        let res = await profileAPI.sendPhoto(file)
        if (res.resultCode === 0) {
            dispatch(actionCreators.saveAvatar(res.data.photos))
        }
    }

export const saveProfileData = (data:TProfile):TThunk =>
    async (dispatch,getState) => {
        let res = await profileAPI.saveProfile(data)
        if (res.resultCode === 0) {
            return dispatch(getProfileDataThunkCreator(getState().auth.userId))
        }else {
            dispatch(stopSubmit("profileDataForm", {"contacts": {"_error": res.messages[0]}})) //stop submit allows any action
            return Promise.reject(res.messages[0])
        }
    }
//thunk creators end
type TThunk = TBaseThunk<ActionsTypes | FormAction>;

export default profileReducer;