import {BrowserRouter} from "react-router-dom";
import App from "./App";
import {addPost,updateNewPostText} from "./redux/state";
import React from "react";
import {createRoot} from "react-dom/client";
const container = document.getElementById('root');
const root = createRoot(container);

let rerenderEntireTree = (state) => {
    root.render(
        <BrowserRouter>
            <App state={state} addPost={addPost} updateNewPostText={updateNewPostText} />
        </BrowserRouter>
    )
}

export default rerenderEntireTree;