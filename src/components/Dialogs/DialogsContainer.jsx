import React from 'react';
import {sendMessageActionCreator, updateNewMessageBodyActionCreator} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import StoreContext from "../../StoreContext";

const DialogsContainer = (props) => {
    return <StoreContext.Consumer>
        {(store) => {
            let state = store.getState().dialogsPage;
            const sendMessage = () => {
                store.dispatch(sendMessageActionCreator())
            }

            const updateNewMessageBody = (body) => {
                store.dispatch(updateNewMessageBodyActionCreator(body))
            }
            return <Dialogs updateNewMessageBody={updateNewMessageBody}
                            sendMessage={sendMessage}
                            newMessageBody={state.newMessageBody}
                            messages={state.messages}
                            dialogs={state.dialogs}/>
        }}
    </StoreContext.Consumer>
}



export default DialogsContainer;