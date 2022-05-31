import {sendMessageThunkCreator} from '../../redux/dialogsReducer';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import withRedirect from '../hocs/withAuthRedirect/withAuthRedirect';
import {compose} from 'redux';
import {AppStateType} from '../../redux/reduxStore';
import React from 'react';

type TStateProps = ReturnType<typeof mapStateToProps>
type TDispatchProps = {
    sendMessageThunkCreator: (body: string) => void
}
type TOwnProps = {}

const mapStateToProps = (state: AppStateType) => ({
    dialogs: state.dialogsPage.dialogs,
    messages: state.dialogsPage.messages,
});

export default compose<React.ComponentType>(
    connect<TStateProps, TDispatchProps, TOwnProps>(mapStateToProps, {
        sendMessageThunkCreator
    }),
    withRedirect
)(Dialogs);