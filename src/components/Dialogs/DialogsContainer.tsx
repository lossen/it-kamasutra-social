import {sendMessageThunkCreator} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import withRedirect from "../hocs/withAuthRedirect/withAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/reduxStore";

const mapStateToProps = (state:AppStateType) => ({
    dialogs: state.dialogsPage.dialogs,
    messages: state.dialogsPage.messages,
});

export default compose(
    connect(mapStateToProps, {
        sendMessageThunkCreator
    }),
    withRedirect
    // @ts-ignore
)(Dialogs);