import {sendMessage, updateNewMessageBody} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";

const mapStateToProps = (state) => ({
    dialogsPage: state.dialogsPage
});
const mapDispatchToProps = (dispatch) => {
    return {
        updateNewMessageBody: body => {
            dispatch(updateNewMessageBody(body))
        },
        sendMessage: () => {
            dispatch(sendMessage())
        }
    }

};
const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;