import React from 'react';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';

const Main = props => (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
    </Switch>
);

export default Main;
