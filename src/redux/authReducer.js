import {authAPI} from "../api";

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
    (dispatch) => { //thunk function
        authAPI.checkLogin()
            .then(data => {
                if(data.resultCode === 0){
                    let {id,email,login} = data.data;
                    let isAuth = true;
                    dispatch(setAuthUserData(id,email,login,isAuth))
                }
            })
    }

export const loginThunkCreator = (email,password,rememberMe) =>
    (dispatch) => {
        authAPI.login(email,password,rememberMe)
            .then(data => {
                if(data.resultCode === 0){
                    dispatch(checkLoginThunkCreator())
                }
            })
    }

export const logoutThunkCreator = () =>
    (dispatch) => {
        authAPI.logout()
            .then(data => {
                if(data.resultCode === 0){
                    let {userId,email,login,isAuth} = initialState;
                    dispatch(setAuthUserData(userId,email,login,isAuth))
                }
            })
    }
//thunk creators end
export default authReducer;