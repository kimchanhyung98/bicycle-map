import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from '@/reducers/user.js';
import thunk from 'redux-thunk';

import Main from '@/Router';
import Header from '@/components/Header';

import '@sass/app.scss';

const store = createStore(reducers, applyMiddleware(thunk));

class Index extends Component {
    render() {
        return (
            <Provider store = {store}>
                <BrowserRouter>
                    <Header />

                    <main className="main">
                       <Route component={Main}/>
                    </main>
                </BrowserRouter>
            </Provider>
        );
    }
}

ReactDOM.render(<Index />, document.getElementById('app'));
