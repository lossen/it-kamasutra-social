import {sendMessageActionCreator, updateNewMessageBodyActionCreator} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";

const mapStateToProps = (state) => ({
    dialogsPage: state.dialogsPage
});
const mapDispatchToProps = (dispatch) => {
    return {
        updateNewMessageBody: body => {
            dispatch(updateNewMessageBodyActionCreator(body))
        },
        sendMessage: () => {
            dispatch(sendMessageActionCreator())
        }
    }

};
const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;