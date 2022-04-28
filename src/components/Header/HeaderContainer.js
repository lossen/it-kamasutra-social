import React from 'react';
import {connect} from "react-redux";
import Header from "./Header";
import {checkLoginThunkCreator, logoutThunkCreator, setAuthUserData} from "../../redux/authReducer";

class HeaderContainer extends React.Component{
    componentDidMount() {
        this.props.checkLoginThunkCreator()
    }

    render() {
        return (
            <Header {...this.props}/>
        )
    }
}

let mapStateToProps = (state) => ({
    email: state.auth.email,
    login: state.auth.login,
    isAuth: state.auth.isAuth,

})

export default connect(mapStateToProps,{
    setAuthUserData,
    checkLoginThunkCreator,
    logoutThunkCreator
})(HeaderContainer);