import {profileAPI} from "../api";

const ADD_POST = "ADD_POST",
    UPDATE_NEW_POST_TEXT = "UPDATE_NEW_POST_TEXT",
    SET_USER_PROFILE = "SET_USER_PROFILE",
    SET_PROFILE_STATUS = "SET_PROFILE_STATUS";

let initialState = {
    posts: [
        {id: 1, message: "hi", likesCount: 12},
        {id: 2, message: "how are you?", likesCount: 11},
        {id: 3, message: "me first post", likesCount: 0},
    ],
    newPostText: '',
    profile: null,
    profileStatus: ""
}

const profileReducer = (state = initialState, action) => {
    switch (action.type){
        case ADD_POST:
            let newPost = {id: 4, message: state.newPostText, likesCount: 17};
            return {
                ...state,
                posts: [...state.posts, newPost ],
                newPostText: ''
            }
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText
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
        default: return state;
    }
}
//action creators
export const addPost = () => ({type: ADD_POST})

export const updateNewPostText = (newText) => ({
    type: UPDATE_NEW_POST_TEXT,
    newText})

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
    (dispatch) => {
        profileAPI.getProfileData(userId)
            .then(data => {
                dispatch(setUserProfile(data))
            })
    }

export const getProfileStatusThunkCreator = (userId) =>
    (dispatch) => {
        profileAPI.getProfileStatus(userId)
            .then(data => {
                dispatch(setProfileStatus(data))
            })
    }

export const setProfileStatusThunkCreator = (status) =>
    (dispatch) => {
        profileAPI.setProfileStatus(status)
            .then(res => {
                if(res.data.resultCode === 0){
                    dispatch(setProfileStatus(status))
                }
            })
    }
//thunk creators end
export default profileReducer;