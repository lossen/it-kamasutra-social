import React from 'react';
import Login from './Login';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {loginThunkCreator} from '../../redux/authReducer';
import {Navigate} from 'react-router-dom';
import {AppStateType} from '../../redux/reduxStore';

let ReduxFormLogin = reduxForm<TLoginValues, TOwnProps>({
    form: 'login'
})(Login);

type TStateProps = ReturnType<typeof mapStateToProps>

type TDispatchProps = {
    loginThunkCreator: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}
export type TOwnProps = {}
type TProps = TStateProps & TDispatchProps & TOwnProps;
export type TLoginValues = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
const LoginContainer: React.FC<TProps> = (props) => {
    const onSubmit = (formData: TLoginValues) => {
        let {email, password, rememberMe, captcha} = formData;
        if (formData) {
            props.loginThunkCreator(email, password, rememberMe, captcha);
        }
    };
    if (props.isAuth) return <Navigate to={'/profile'}/>;
    return (
        <ReduxFormLogin {...props} onSubmit={onSubmit}/>
    );
};

let mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
});

export default connect<TStateProps, TDispatchProps, TOwnProps>(mapStateToProps, {
    loginThunkCreator
})(LoginContainer);