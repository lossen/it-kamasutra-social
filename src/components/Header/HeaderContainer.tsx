import React from 'react';
import {connect} from "react-redux";
import Header from "./Header";
import {logoutThunkCreator} from "../../redux/authReducer";
import {AppStateType} from "../../redux/reduxStore";

class HeaderContainer extends React.Component<TStateProps & TDispatchProps & TOwnProps>{

    render() {
        return (
            <Header {...this.props}/>
        )
    }
}

let mapStateToProps = (state:AppStateType) => ({
    email: state.auth.email,
    login: state.auth.login,
    isAuth: state.auth.isAuth,

})

export default connect<TStateProps,TDispatchProps,TOwnProps, AppStateType>(mapStateToProps,{
    logoutThunkCreator
})(HeaderContainer);

export type TStateProps = {
    email: string
    login: string
    isAuth: boolean
}

export type TDispatchProps = {
    logoutThunkCreator: () => void
}
type TOwnProps = {}