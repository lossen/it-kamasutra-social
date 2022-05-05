import {authAPI, securityAPI} from "../api";
import {stopSubmit} from "redux-form";
import {APP_NAME} from "../commonConsts";

const SET_USER_DATA = `${APP_NAME}/auth/SET_USER_DATA`;
const SET_CAPTCHA_URL = `${APP_NAME}/auth/SET_CAPTCHA_URL`;

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null, //if null then captcha is not required
}

const authReducer = (state = initialState, action) => {
    switch (action.type){
        case SET_USER_DATA:
        case SET_CAPTCHA_URL:
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

export const getCaptchaUrlActionCreator = (captchaUrl) => ({
    type: SET_CAPTCHA_URL,
    payload: {captchaUrl}
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

export const loginThunkCreator = (email, password, rememberMe,captcha) =>
    async (dispatch) => {
        let data = await authAPI.login(email, password, rememberMe,captcha)
        if (data.resultCode === 0) {
            dispatch(checkLoginThunkCreator())
        } else {
            if (data.resultCode === 10){
                dispatch(getCaptchaUrl())
            }
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

export const getCaptchaUrl = () =>//thunk creator
    async (dispatch) => { //thunk
        let data = await securityAPI.getCaptchaUrl()
        dispatch(getCaptchaUrlActionCreator(data.url))

    }
//thunk creators end
export default authReducer;