import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import { loginSuccess } from '@/actions/user.js';
import storage from '@/lib/storage.js';

import Main from '@/Router';
import Header from '@/components/Header';
import Aside from '@/components/Aside';

import '@sass/app.scss';

const mapStateToProps = (state) => ({
    state
});

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showAside: false
        };

        this.handleAside = this.handleAside.bind(this);
    }

    initUserInfo() {
        const loggedToken = storage.get('loggedToken');
        if(!loggedToken) return;
        const loggedInfo = storage.get('loggedInfo');
        const { dispatch } = this.props;

        dispatch(loginSuccess(loggedInfo));
    }

    handleAside() {
        this.setState((state) => ({
            showAside: !state.showAside
        }));
    }

    componentDidMount() {
        this.initUserInfo();
    }

    render() {
        return (
            <BrowserRouter>
                <Header handleAside={ this.handleAside } />

                <Aside handleAside={ this.handleAside }
                    showAside={ this.state.showAside } />

               <Route component={Main}/>
            </BrowserRouter>
        );
    }
}

export default connect(mapStateToProps)(Index);
