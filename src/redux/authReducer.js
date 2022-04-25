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

//action creators end

//thunk creators
export const loginThunkCreator = () => //thunk creator
    (dispatch) => { //thunk function
        authAPI.login()
            .then(data => {
                if(data.resultCode === 0){
                    let {id,email,login} = data.data;
                    dispatch(setAuthUserData(id,email,login))
                }
            })
    }
//thunk creators end
export default authReducer;