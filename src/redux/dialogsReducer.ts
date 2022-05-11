import {dialogsAPI} from "../api";

const SEND_MESSAGE = "SEND_MESSAGE";
let initialState = {
    messages: [] as Array<MessageType>,
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
type MessageType = {
    id: number,
    message: string
}

const dialogsReducer = (state = initialState, action):initialStateType => {
    switch (action.type){
        case SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.newMessage],
            }
        default: return state;
    }
}

type sendMessageActionType = {type: typeof SEND_MESSAGE, newMessage: string}

export const sendMessage = (newMessage:string):sendMessageActionType => ({type: SEND_MESSAGE, newMessage})

export const sendMessageThunkCreator = (body) =>
    (dispatch) => {
        dialogsAPI.sendNewMessage(body)
            .then(res => {
                if(res.resultCode === 0){
                    dispatch(sendMessage(res.data.message))
                }
            })
    }
export default dialogsReducer;