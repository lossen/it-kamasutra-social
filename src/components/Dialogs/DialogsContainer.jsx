import {sendMessage, updateNewMessageBody} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import withRedirect from "../hocs/withRedirect/withRedirect";
import {compose} from "redux";

const mapStateToProps = (state) => ({
    dialogsPage: state.dialogsPage,
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

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRedirect
)(Dialogs);