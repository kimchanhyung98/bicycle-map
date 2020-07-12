import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import Main from '@/Router';

import Header from '@/components/Header';

import { Provider } from 'react-redux';
import store from '@/store';

import '@sass/app.scss';

class Index extends Component {
    render() {
        return (
            <div>
                <Header />

                <main className="main">
                    <BrowserRouter>
                       <Route component={Main}/>
                    </BrowserRouter>
                </main>
            </div>
        );
    }
}

ReactDOM.render(<Provider store = {store}>
    <Index />
</Provider>, document.getElementById('app'));
