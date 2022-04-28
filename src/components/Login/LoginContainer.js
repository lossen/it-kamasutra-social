import React from "react";
import Login from "./Login";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {loginThunkCreator} from "../../redux/authReducer";

let ReduxFormLogin = reduxForm({
    form: "login"
})(Login)

const LoginContainer = (props) => {
    const onSubmit = (formData) => {
        let {email, password} = formData;
        if(formData){
            props.loginThunkCreator(email, password)
        }
    }
    return(
        <ReduxFormLogin {...props} onSubmit={onSubmit}/>
    )
}

let mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, {
    loginThunkCreator
})(LoginContainer);