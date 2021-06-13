import '@/bootstrap';

import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Reset} from "styled-reset";
import {createGlobalStyle} from "styled-components";

import configureStore from "@/stores";
import reducers from "@/reducers/user";
import Routes from "@/routes";

const store = configureStore(reducers);
const GlobalStyle = createGlobalStyle`
    body {
        width: 100%;
        min-width: 320px;
        background: #fff;
        font-family: Helvetica, "Malgun Gothic", "Apple SD Gothic Neo", AppleGothic, Dotum, Arial, Tahoma;
        font-size: 16px;
        line-height: 1;
        color: #333;
    }

    .hidden {
        display: none;
    }
`;

ReactDOM.render(
    <Provider store={store}>
        <Reset/>
        <GlobalStyle />
        <Routes/>
    </Provider>,
    document.getElementById('app')
);
