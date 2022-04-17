import React from "react";
import './index.css';
import reportWebVitals from './reportWebVitals';
import store from "./redux/reduxStore";
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";

const container = document.getElementById('root');
const root = createRoot(container);


export const rerenderEntireTree = () => {
    root.render(
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
         </BrowserRouter>
    )
}
rerenderEntireTree();
store.subscribe(() => {
    rerenderEntireTree()
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
