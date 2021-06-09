import '@/bootstrap';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from '@/store/reducers/user.js';
import thunk from 'redux-thunk';

// import Index from '@/Index';
const store = createStore(reducers, applyMiddleware(thunk));
import Routes from "@/routes";

import {Reset} from 'styled-reset';
import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        width: 100%;
        min-width: 320px;
        background: #fff;
        font-family: Helvetica,"Malgun Gothic","Apple SD Gothic Neo",AppleGothic,Dotum,Arial,Tahoma;
        font-size: 16px;
        line-height: 1;
        color: #333;
    }

    .hidden{
        display: none;
    }

`;

ReactDOM.render(
    <Provider store={store}>
        <Reset/>
        <Routes />
    </Provider>,
    document.getElementById('app')
);
