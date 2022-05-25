import React from "react";
import {Field, InjectedFormProps} from "redux-form";
import {Input} from "../common/Forms/FormControls";
import {required} from "../../utils/validators";
import classes from "./Login.module.css";
import {TLoginValues} from "./LoginContainer";

export type TOwnProps = {
    captchaUrl: string
}
const Login: React.FC<InjectedFormProps<TLoginValues, TOwnProps> & TOwnProps> =
    ({handleSubmit, error, captchaUrl = null, ...props}) => {
        return (
            <div>
                <h1>Login page</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <Field name={"email"} type="text" placeholder="Email" component={Input} validate={required}/>
                    </div>
                    <div>
                        <Field name={"password"} type="text" placeholder="Password" component={Input}
                               validate={required}/>
                    </div>
                    <div>
                        <Field name={"rememberMe"} type="checkbox" component={"input"}/> Remember me
                    </div>
                    {error && <div className={classes.errorBox}>
                        <span className={classes.errorTitle}>{error}</span>
                    </div>}
                    {captchaUrl && <img src={captchaUrl} alt=""/>}
                    {captchaUrl && <div>
                        <Field name={"captcha"} type="text" placeholder="Symbols from image" component={Input}
                               validate={required}/>
                    </div>}
                    <button>Submit</button>
                </form>
            </div>
        )
    }

export default Login;