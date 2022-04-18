import React from 'react';
import {sendMessageActionCreator, updateNewMessageBodyActionCreator} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import StoreContext from "../../StoreContext";
import {connect} from "react-redux";

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

const mapStateToProps = (state) => ({
    dialogsPage: state.dialogsPage
});
const mapDispatchToProps = (dispatch) => {
    return {
        updateNewMessageBody: () => {
            dispatch(sendMessageActionCreator())
        },
        sendMessage: body => {
            dispatch(updateNewMessageBodyActionCreator(body))
        }
    }

};
const SuperDialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;