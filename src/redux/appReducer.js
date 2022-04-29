import {checkLoginThunkCreator} from "./authReducer";

const INITIALISED_SUCCESSFUL = "INITIALISED_SUCCESSFUL";

let initialState = {
    initialised: false,
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALISED_SUCCESSFUL:
            return {
                ...state,
                initialised: true
            }
        default:
            return state;
    }
}
//action creators

export const initialisedSuccessful = () => ({
    type: INITIALISED_SUCCESSFUL
})

//action creators end

//thunk creators
export const initialisedSuccessfulThunkCreator = () =>
    (dispatch) => {
        dispatch(checkLoginThunkCreator())
            .then(() => {
                dispatch(initialisedSuccessful())
            })
    }


//thunk creators end
export default appReducer;