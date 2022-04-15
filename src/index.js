import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
// import * as serviceWorker from "./serviceWorker";

const container = document.getElementById('root');
const root = createRoot(container);
let dialogs = [
    {id: 1, name: "Anechka"},
    {id: 2, name: "Maxim"},
    {id: 3, name: "Reginald"},
]

let messages = [
    {id: 1, text: "hi"},
    {id: 2, text: "hello"},
    {id: 3, text: "bye"},
]
let posts = [
    {id: 1, message: "hi", likesCount: 12},
    {id: 2, message: "how are you?", likesCount: 11},
    {id: 3, message: "me first post", likesCount: 0},
]
root.render(
    <BrowserRouter>
        <App posts={posts} dialogs={dialogs} messages={messages}/>
    </BrowserRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
