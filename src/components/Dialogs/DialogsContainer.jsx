import {sendMessageThunkCreator} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import withRedirect from "../hocs/withAuthRedirect/withAuthRedirect";
import {compose} from "redux";

const mapStateToProps = (state) => ({
    dialogsPage: state.dialogsPage,
});

export default compose(
    connect(mapStateToProps, {
        sendMessageThunkCreator
    }),
    withRedirect
)(Dialogs);