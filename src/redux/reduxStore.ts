import {Action, applyMiddleware, combineReducers, compose, createStore} from 'redux';
import profileReducer from './profileReducer';
import dialogsReducer from './dialogsReducer';
import sidebarReducer from './sidebarReducer';
import usersReducer from './usersReducer';
import authReducer from './authReducer';
import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import appReducer from './appReducer';

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
});

type rootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<rootReducerType>

export type InferActionsTypes<T> = T extends {[key: string]: (...args: any[])=> infer U} ? U : never //Get types of actions

export type TBaseThunk<A extends Action> = ThunkAction<Promise<void>, AppStateType, unknown, A> //type for base thunk function

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;//enhance redux store with redux browser extension
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunkMiddleware)
));
//
// window.store = store;
export default store;