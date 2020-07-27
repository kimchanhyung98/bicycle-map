import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import { saveLoggedToken } from '@/actions/user.js';
import storage from '@/lib/storage.js';

import Main from '@/Router';
import Header from '@/components/Header';

import '@sass/app.scss';

const mapStateToProps = (state) => ({
    state
});

class Index extends Component {
    initUserInfo() {
        const loggedToken = storage.get('loggedToken');
        if(!loggedToken) return;

        const { dispatch } = this.props;
        dispatch(saveloggedToken(loggedToken));
    }

    componentDidMount() {
        this.initUserInfo();
    }

    render() {
        return (
            <BrowserRouter>
                <Header />

                <main className="main">
                   <Route component={Main}/>
                </main>
            </BrowserRouter>
        );
    }
}

export default connect(mapStateToProps)(Index);
