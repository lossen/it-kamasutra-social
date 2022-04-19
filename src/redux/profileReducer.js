const ADD_POST = "ADD_POST",
    UPDATE_NEW_POST_TEXT = "UPDATE_NEW_POST_TEXT";

let initialState = {
    posts: [
        {id: 1, message: "hi", likesCount: 12},
        {id: 2, message: "how are you?", likesCount: 11},
        {id: 3, message: "me first post", likesCount: 0},
    ],
    newPostText: ''
}

const profileReducer = (state = initialState, action) => {
    switch (action.type){
        case ADD_POST:
            let newPost = {id: 4, message: state.newPostText, likesCount: 17};
            return {
                ...state,
                posts: [...state.posts, newPost ],
                newPostText: ''
            }
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText
            }
        default: return state;
    }
}

export const addPostActionCreator = () => ({type: ADD_POST})

export const updateNewPostTextActionCreator = (newText) => ({
    type: UPDATE_NEW_POST_TEXT,
    newText})

export default profileReducer;