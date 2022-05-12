import {authAPI, ResultCodesEnum, securityAPI} from "../api";
import {stopSubmit} from "redux-form";
import {APP_NAME} from "../commonConsts";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./reduxStore";

const SET_USER_DATA = `${APP_NAME}/auth/SET_USER_DATA`;
const SET_CAPTCHA_URL = `${APP_NAME}/auth/SET_CAPTCHA_URL`;

type InitialStateType = typeof initialState;
let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null,
}

const authReducer = (state = initialState, action): InitialStateType => {
    switch (action.type){
        case SET_USER_DATA:
        case SET_CAPTCHA_URL:
            return {
                ...state,
                ...action.payload,
            }
        default: return state;
    }
}
//action creators
type setAuthUserDataActionPayloadType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
}

type ActionsTypes = setAuthUserDataActionType | getCaptchaUrlActionCreatorType;

type setAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: setAuthUserDataActionPayloadType
}
export const setAuthUserData = (userId:number,email: string,login: string,isAuth: boolean):setAuthUserDataActionType => ({
    type: SET_USER_DATA,
    payload: {userId,email,login,isAuth}
})

type getCaptchaUrlActionCreatorType = {
    type: typeof SET_CAPTCHA_URL,
    payload: {captchaUrl: string}
}
export const getCaptchaUrlActionCreator = (captchaUrl:string):getCaptchaUrlActionCreatorType => ({
    type: SET_CAPTCHA_URL,
    payload: {captchaUrl}
})

//action creators end

//thunk creators
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

export const checkLoginThunkCreator = ():ThunkType => //thunk creator
    async (dispatch) => { //thunk function
        let data = await authAPI.checkLogin()
        if (data.resultCode === ResultCodesEnum.Success) {
            let {id, email, login} = data.data;
            let isAuth = true;
            dispatch(setAuthUserData(id, email, login, isAuth))
        }
    }

export const loginThunkCreator = (email: string, password: string, rememberMe:boolean,captcha:string):ThunkType =>
    async (dispatch) => {
        let data = await authAPI.login(email, password, rememberMe,captcha)
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(checkLoginThunkCreator())
        } else {
            if (data.resultCode === ResultCodesEnum.CaptchaIsRequired){
                dispatch(getCaptchaUrl())
            }
            let errorMessage = data.messages.length > 0 ? data.messages[0] : 'Server error'
            dispatch(stopSubmit("login", {_error: errorMessage}))
        }
    }

export const logoutThunkCreator = ():ThunkType =>
    async (dispatch) => {
        let data = await authAPI.logout()
        if (data.resultCode === ResultCodesEnum.Success) {
            let {userId, email, login, isAuth} = initialState;
            dispatch(setAuthUserData(userId, email, login, isAuth))
        }
    }

export const getCaptchaUrl = ():ThunkType =>//thunk creator
    async (dispatch) => { //thunk
        let data = await securityAPI.getCaptchaUrl()
        dispatch(getCaptchaUrlActionCreator(data.url))

    }
//thunk creators end
export default authReducer;