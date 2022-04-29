import React from "react";
import {Field} from "redux-form";
import {Input} from "../common/Forms/FormControls";
import {required} from "../../utils/validators";
import classes from "./Login.module.css";
const Login = (props) => {
    return(
        <div>
            <h1>Login page</h1>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field name={"email"} type="text" placeholder="Email" component={Input} validate={required}/>
                </div>
                <div>
                    <Field name={"password"} type="text" placeholder="Password" component={Input} validate={required}/>
                </div>
                <div>
                    <Field name={"rememberMe"} type="checkbox" component={"input"}/> Remember me
                </div>
                {props.error && <div className={classes.errorBox}>
                    <span className={classes.errorTitle}>{props.error}</span>
                </div>}
                <button>Submit</button>
            </form>
        </div>
    )
}

export default Login;