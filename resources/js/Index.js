import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import { Provider } from 'react-redux';

import Main from '@/Router';
import Header from '@/components/Header';

import '@sass/app.scss';

class Index extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Header />

                    <main className="main">
                       <Route component={Main}/>
                    </main>
                </BrowserRouter>
            </div>
        );
    }
}

ReactDOM.render(<Provider store = {store}>
    <Index />
</Provider>, document.getElementById('app'));
