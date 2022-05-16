import {ResultCodesEnum} from "../api/api";
import {FormAction, stopSubmit} from "redux-form";
import {APP_NAME} from "../commonConsts";
import {InferActionsTypes, TBaseThunk} from "./reduxStore";
import {authAPI} from "../api/authAPI";
import {securityAPI} from "../api/securityAPI";

const SET_USER_DATA = `${APP_NAME}/auth/SET_USER_DATA` as const;
const SET_CAPTCHA_URL = `${APP_NAME}/auth/SET_CAPTCHA_URL` as const;

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null,
}
type TInitialState = typeof initialState;

const authReducer = (state = initialState, action:ActionsTypes): TInitialState => {
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

type ActionsTypes = InferActionsTypes<typeof actionCreators>
const actionCreators = {
    setAuthUserData: (userId:number,email: string,login: string,isAuth: boolean) => ({
        type: SET_USER_DATA,
        payload: {userId,email,login,isAuth}
    }),
    getCaptchaUrl: (captchaUrl:string) => ({
        type: SET_CAPTCHA_URL,
        payload: {captchaUrl}
    })
}

//thunk creators
export const checkLoginThunkCreator = ():TThunk => //thunk creator
    async (dispatch) => { //thunk function
        let data = await authAPI.checkLogin()
        if (data.resultCode === ResultCodesEnum.Success) {
            let {id, email, login} = data.data;
            let isAuth = true;
            dispatch(actionCreators.setAuthUserData(id, email, login, isAuth))
        }
    }

export const loginThunkCreator = (email: string, password: string, rememberMe:boolean,captcha:string):TThunk =>
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

export const logoutThunkCreator = ():TThunk =>
    async (dispatch) => {
        let data = await authAPI.logout()
        if (data.resultCode === ResultCodesEnum.Success) {
            let {userId, email, login, isAuth} = initialState;
            dispatch(actionCreators.setAuthUserData(userId, email, login, isAuth))
        }
    }

export const getCaptchaUrl = ():TThunk =>//thunk creator
    async (dispatch) => { //thunk
        let data = await securityAPI.getCaptchaUrl()
        dispatch(actionCreators.getCaptchaUrl(data.url))

    }
//thunk creators end
export default authReducer;
type TThunk = TBaseThunk<ActionsTypes | FormAction>;
