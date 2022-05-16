import {checkLoginThunkCreator} from "./authReducer";
import {APP_NAME} from "../commonConsts";
import {InferActionsTypes, TBaseThunk} from "./reduxStore";

const INITIALISED_SUCCESSFUL = `${APP_NAME}/app/INITIALISED_SUCCESSFUL` as const;

let initialState = {
    initialised: false,
}
export type TInitialState =  typeof initialState

const appReducer = (state = initialState, action:any):TInitialState => {
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
type ActionsTypes = InferActionsTypes<typeof actionCreators>

const actionCreators = {
    initialisedSuccessful: () => ({
        type: INITIALISED_SUCCESSFUL,
    })
}

//thunk creators
export const initialisedSuccessfulThunkCreator = ():TThunk =>
    async (dispatch) => {
        await dispatch(checkLoginThunkCreator())
        dispatch(actionCreators.initialisedSuccessful())
    }


//thunk creators end
export default appReducer;
type TThunk = TBaseThunk<ActionsTypes>;
