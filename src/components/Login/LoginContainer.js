import React from "react";
import Login from "./Login";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {loginThunkCreator} from "../../redux/authReducer";
import {Navigate} from "react-router-dom";

let ReduxFormLogin = reduxForm({
    form: "login"
})(Login)

const LoginContainer = (props) => {
    const onSubmit = (formData) => {
        let {email, password, rememberMe} = formData;
        if (formData) {
            props.loginThunkCreator(email, password,rememberMe)
        }
    }
    if(props.isAuth) return <Navigate to={"/profile"}/>
    return (
        <ReduxFormLogin {...props} onSubmit={onSubmit}/>
    )
}

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {
    loginThunkCreator
})(LoginContainer);