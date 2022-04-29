import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {Route, Routes} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginContainer from "./components/Login/LoginContainer";
import {Component} from "react";
import {checkLoginThunkCreator} from "./redux/authReducer";
import {connect} from "react-redux";


class App extends Component {
    componentDidMount() {
        this.props.checkLoginThunkCreator()
    }
    render() {
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

export default connect(null,{
    checkLoginThunkCreator
})(App);
