import '@/bootstrap';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from '@/store/reducers/user.js';
import thunk from 'redux-thunk';

import Index from '@/Index';
const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(<Provider store = {store}><Index /></Provider>, document.getElementById('app'));
