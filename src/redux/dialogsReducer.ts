import {TMessage} from '../types/types';
import {dialogsAPI} from '../api/dialogsAPI';
import {InferActionsTypes, TBaseThunk} from './reduxStore';
import {APP_NAME} from '../commonConsts';

const SEND_MESSAGE = `${APP_NAME}/dialogs/SEND_MESSAGE` as const;
let initialState = {
    messages: [] as Array<TMessage> | [],
    dialogs: [
        {id: 1, name: "Anechka"},
        {id: 2, name: "Maxim"},
        {id: 3, name: "Reginald"},
    ] as Array<DialogType>,
};
type initialStateType = typeof initialState;
type DialogType = {
    id: number,
    name: string
}

const dialogsReducer = (state = initialState, action:ActionsTypes):initialStateType => {
    switch (action.type){
        case SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, {id: state.messages.length++ , message: action.newMessage}],
            }
        default: return state;
    }
}
type ActionsTypes = InferActionsTypes<typeof actionCreators>
const actionCreators = {
    sendMessage: (newMessage:string) => ({type: SEND_MESSAGE, newMessage})
}
export const sendMessageThunkCreator = (body:string):TThunk =>
    async (dispatch) => {
        let res = await dialogsAPI.sendNewMessage(body)
        if(res.resultCode === 0){
            dispatch(actionCreators.sendMessage(res.data.message))
        }
    }
export default dialogsReducer;
type TThunk = TBaseThunk<ActionsTypes>
