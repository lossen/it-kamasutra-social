import React from 'react';
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/reduxStore";

type TStateProps = ReturnType<typeof mapStateToProps>
let mapStateToProps = (state:AppStateType) => ({
    isAuth: state.auth.isAuth
})
export const withAuthRedirect = (Component:React.ComponentType<TStateProps>) => {
    class RedirectComponent extends React.Component<TStateProps>{
        render() {
            if(!this.props.isAuth) return <Navigate to={"/login"}/>
            return <Component {...this.props}/>
        }
    }
    return connect<TStateProps>(mapStateToProps)(RedirectComponent);
}

export default withAuthRedirect;