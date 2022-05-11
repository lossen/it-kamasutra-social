import {checkLoginThunkCreator} from "./authReducer";

const INITIALISED_SUCCESSFUL = "INITIALISED_SUCCESSFUL";

export type InitialStateType = {
    initialised: boolean
}
let initialState: InitialStateType = {
    initialised: false,
}

type InitialisedSuccessfulActionType = {
    type: typeof INITIALISED_SUCCESSFUL
}
const appReducer = (state = initialState, action:any):InitialStateType => {
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

export const initialisedSuccessful = ():InitialisedSuccessfulActionType => ({
    type: INITIALISED_SUCCESSFUL,
})

//action creators end

//thunk creators
export const initialisedSuccessfulThunkCreator = () =>
    async (dispatch) => {
        await dispatch(checkLoginThunkCreator())
        dispatch(initialisedSuccessful())
    }


//thunk creators end
export default appReducer;