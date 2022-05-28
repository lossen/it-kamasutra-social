import React from 'react';
import {sendMessage, updateNewMessageBody} from '../../redux/dialogsReducer';
import Dialogs from './Dialogs';
import StoreContext from '../../StoreContext';
import {connect} from 'react-redux';

const DialogsContainer = (props) => {
    return <StoreContext.Consumer>
        {(store) => {
            let state = store.getState().dialogsPage;
            const sendMessage = () => {
                store.dispatch(sendMessage())
            }

            const updateNewMessageBody = (body) => {
                store.dispatch(updateNewMessageBody(body))
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
            dispatch(sendMessage())
        },
        sendMessage: body => {
            dispatch(updateNewMessageBody(body))
        }
    }

};
const SuperDialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;