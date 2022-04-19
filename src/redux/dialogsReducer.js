const UPDATE_NEW_MESSAGE_BODY = "UPDATE_NEW_MESSAGE_BODY",
    SEND_MESSAGE = "SEND_MESSAGE";

let initialState = {
    messages: [
        {id: 1, text: "hi"},
        {id: 2, text: "hello"},
        {id: 3, text: "bye"},
    ],
    newMessageBody: '',
    dialogs: [
        {id: 1, name: "Anechka"},
        {id: 2, name: "Maxim"},
        {id: 3, name: "Reginald"},
    ],
};

const dialogsReducer = (state = initialState, action) => {

    switch (action.type){
        case UPDATE_NEW_MESSAGE_BODY:
            return{
            ...state,
                newMessageBody: action.body
            }
        case SEND_MESSAGE:
            let newMessage = {id: 4, text: state.newMessageBody};
            return {
                ...state,
                messages: [...state.messages, newMessage],
                newMessageBody: ''
            }
        default: return state;
    }
}

export const sendMessageActionCreator = () => ({type: SEND_MESSAGE})

export const updateNewMessageBodyActionCreator = (body) => ({
    type: UPDATE_NEW_MESSAGE_BODY,
    body
})

export default dialogsReducer;