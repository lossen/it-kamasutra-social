import {authAPI} from "../api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "SET_USER_DATA";

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type){
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        default: return state;
    }
}
//action creators

export const setAuthUserData = (userId,email,login,isAuth) => ({
    type: SET_USER_DATA,
    payload: {userId,email,login,isAuth}
})

//action creators end

//thunk creators
export const checkLoginThunkCreator = () => //thunk creator
    async (dispatch) => { //thunk function
        let data = await authAPI.checkLogin()
        if (data.resultCode === 0) {
            let {id, email, login} = data.data;
            let isAuth = true;
            dispatch(setAuthUserData(id, email, login, isAuth))
        }
    }

export const loginThunkCreator = (email, password, rememberMe) =>
    async (dispatch) => {
        let data = await authAPI.login(email, password, rememberMe)
        if (data.resultCode === 0) {
            dispatch(checkLoginThunkCreator())
        } else if (data.resultCode === 1) {
            let errorMessage = data.messages.length > 0 ? data.messages[0] : 'Server error'
            dispatch(stopSubmit("login", {_error: errorMessage}))
        }
    }

export const logoutThunkCreator = () =>
    async (dispatch) => {
        let data = await authAPI.logout()
        if (data.resultCode === 0) {
            let {userId, email, login, isAuth} = initialState;
            dispatch(setAuthUserData(userId, email, login, isAuth))
        }
    }
//thunk creators end
export default authReducer;