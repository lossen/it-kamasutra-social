import {dialogsAPI} from "../api";

const SEND_MESSAGE = "SEND_MESSAGE";

let initialState = {
    messages: [],
    dialogs: [
        {id: 1, name: "Anechka"},
        {id: 2, name: "Maxim"},
        {id: 3, name: "Reginald"},
    ],
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type){
        case SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.newMessage],
            }
        default: return state;
    }
}

export const sendMessage = (newMessage) => ({type: SEND_MESSAGE, newMessage})

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