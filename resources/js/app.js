require('./bootstrap');

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import store from './store';
import { INCREMENT, DECREMENT } from './actions';

window.store = store;
window.INCREMENT = INCREMENT;

ReactDOM.render(<App />, document.getElementById('app'));
