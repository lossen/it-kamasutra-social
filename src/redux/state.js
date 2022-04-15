import rerenderEntireTree from "../render";

let state = {
    profilePage: {
        posts: [
            {id: 1, message: "hi", likesCount: 12},
            {id: 2, message: "how are you?", likesCount: 11},
            {id: 3, message: "me first post", likesCount: 0},
        ],
        newPostText: 'it-kamasutra'
    },
    dialogsPage:{
        messages: [
            {id: 1, text: "hi"},
            {id: 2, text: "hello"},
            {id: 3, text: "bye"},
        ],
        dialogs: [
            {id: 1, name: "Anechka"},
            {id: 2, name: "Maxim"},
            {id: 3, name: "Reginald"},
        ],
    }
}

export const addPost = () => {
    let newPost = {id: 4, message: state.profilePage.newPostText, likesCount: 17};
    state.profilePage.posts.push(newPost)
    state.profilePage.newPostText = '';
    rerenderEntireTree(state)
}

export const updateNewPostText = (newText) => {
    state.profilePage.newPostText = newText
    rerenderEntireTree(state)
}

export default state;