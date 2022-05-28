import './App.css';
import Navbar from './components/Navbar/Navbar';
import {Route, Routes} from 'react-router-dom';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginContainer from './components/Login/LoginContainer';
import React, {Component} from 'react';
import {checkLoginThunkCreator} from './redux/authReducer';
import {connect} from 'react-redux';
import {initialisedSuccessfulThunkCreator} from './redux/appReducer';
import Loader from './components/common/Loader/Loader';
import {withSuspense} from './components/hocs/WithSuspense/WithSuspense';
import {AppStateType} from './redux/reduxStore';

type TStateProps = ReturnType<typeof mapStateToProps>
type TDispatchProps = {
    checkLoginThunkCreator: () => void
    initialisedSuccessfulThunkCreator: () => void
}

const DialogsContainer = withSuspense(React.lazy(() => import('./components/Dialogs/DialogsContainer')));
const ProfileContainer = withSuspense(React.lazy(() => import('./components/Profile/ProfileContainer')));
const UsersContainer = withSuspense(React.lazy(() => import('./components/Users/UsersContainer')));

class App extends Component<TStateProps & TDispatchProps> {
    componentDidMount() {
        this.props.initialisedSuccessfulThunkCreator()
    }

    render() {
        if (!this.props.initialised) {
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

let mapStateToProps = (state:AppStateType) => ({
    initialised: state.app.initialised
})

export default connect<TStateProps,TDispatchProps>(mapStateToProps, {
    checkLoginThunkCreator,
    initialisedSuccessfulThunkCreator
})(App);
