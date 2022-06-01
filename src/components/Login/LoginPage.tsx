import React from 'react';
import Login from './Login';
import {reduxForm} from 'redux-form';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../redux/authReducer';
import {Navigate} from 'react-router-dom';
import {AppStateType, TThunkDispatch} from '../../redux/reduxStore';

let ReduxFormLogin = reduxForm<TLoginValues, {captchaUrl: string}>({
    form: 'login'
})(Login);

export type TLoginValues = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
const LoginPage: React.FC = (props) => {
    const captchaUrl = useSelector((state:AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state:AppStateType) => state.auth.isAuth)
    const dispatch:TThunkDispatch = useDispatch();

    const onSubmit = (formData: TLoginValues) => {
        let {email, password, rememberMe, captcha} = formData;
        if (formData) {
            dispatch(login(email, password, rememberMe, captcha))
        }
    };
    if (isAuth) return <Navigate to={'/profile'}/>;
    return (
        <ReduxFormLogin {...props} captchaUrl={captchaUrl} onSubmit={onSubmit}/>
    );
};

export default LoginPage