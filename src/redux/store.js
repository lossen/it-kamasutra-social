import profileReducer from './profileReducer';
import dialogsReducer from './dialogsReducer';
import sidebarReducer from './sidebarReducer';

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'hi', likesCount: 12},
                {id: 2, message: 'how are you?', likesCount: 11},
                {id: 3, message: 'me first post', likesCount: 0},
            ],
            newPostText: ''
        },
        dialogsPage: {
            messages: [
                {id: 1, text: 'hi'},
                {id: 2, text: 'hello'},
                {id: 3, text: 'bye'},
            ],
            newMessageBody: '',
            dialogs: [
                {id: 1, name: 'Anechka'},
                {id: 2, name: 'Maxim'},
                {id: 3, name: 'Reginald'},
            ],
        },
        sidebar: {}
    },
    _callSubscriber() {

    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    setState(newState) {
        this._state = {...this._state, newState};
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);
        this._callSubscriber(this._state);
    }
};

export default store;