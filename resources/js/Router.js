import React from 'react';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import Home from '@/pages/Home';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import RideCreate from '@/pages/ride/Create';
import RideEdit from '@/pages/ride/Edit';
import RideDetail from '@/pages/ride/Detail';

const Main = props => (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route path='/ride/create' component={RideCreate}/>
        <Route path='/ride/edit/:id' component={RideEdit}/>
        <Route path='/ride/:id' component={RideDetail}/>
    </Switch>
);

export default Main;
