import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {Route, Routes} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginContainer from "./components/Login/LoginContainer";
import React, {Component} from "react";
import {checkLoginThunkCreator} from "./redux/authReducer";
import {connect} from "react-redux";
import {initialisedSuccessfulThunkCreator} from "./redux/appReducer";
import Loader from "./components/common/Loader/Loader";


class App extends Component {
    componentDidMount() {
        this.props.initialisedSuccessfulThunkCreator()
    }
    render() {
        if(!this.props.initialised){
            return <Loader isFetching/>
        }
        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Routes>
                        <Route path="/profile/:user_id"
                               element={<ProfileContainer/>}/>
                        <Route path="/profile/"
                               element={<ProfileContainer/>}/>
                        <Route path="/dialogs/*"
                               element={<DialogsContainer/>}/>
                        <Route path="/users/*"
                               element={<UsersContainer/>}/>
                        <Route path="/login/*"
                               element={<LoginContainer/>}/>
                    </Routes>
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state) => ({
    initialised: state.app.initialised
})

export default connect(mapStateToProps,{
    checkLoginThunkCreator,
    initialisedSuccessfulThunkCreator
})(App);
