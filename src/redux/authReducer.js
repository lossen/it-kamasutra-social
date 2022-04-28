import {authAPI} from "../api";

const SET_USER_DATA = "SET_USER_DATA",
SET_IS_AUTH = "SET_IS_AUTH";

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
                ...action.data,
                isAuth: true
            }
        case SET_IS_AUTH:
            return {
                ...state,
                ...action.data,
                isAuth: true
            }


        default: return state;
    }
}
//action creators

export const setAuthUserData = (userId,email,login) => ({
    type: SET_USER_DATA,
    data: {userId,email,login}
})

export const setIsAuth = (isAuth) => ({
    type: SET_USER_DATA,
    data: {isAuth}
})

//action creators end

//thunk creators
export const checkLoginThunkCreator = () => //thunk creator
    (dispatch) => { //thunk function
        authAPI.checkLogin()
            .then(data => {
                if(data.resultCode === 0){
                    let {id,email,login} = data.data;
                    dispatch(setAuthUserData(id,email,login))
                }
            })
    }

export const loginThunkCreator = (email,password) =>
    (dispatch) => {
        authAPI.login(email,password)
            .then(data => {
                if(data.resultCode === 0){
                    dispatch(setIsAuth(true))
                }
            })
    }
//thunk creators end
export default authReducer;