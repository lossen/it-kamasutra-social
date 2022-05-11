import {sendMessageThunkCreator} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import withRedirect from "../hocs/withAuthRedirect/withAuthRedirect";
import {compose} from "redux";

const mapStateToProps = (state) => ({
    dialogs: state.dialogsPage.dialogs,
    messages: state.dialogsPage.messages,
});

export default compose(
    connect(mapStateToProps, {
        sendMessageThunkCreator
    }),
    withRedirect
)(Dialogs);