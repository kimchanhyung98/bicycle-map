import React from 'react';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import Home from '@/components/pages/Home';
import Login from '@/components/pages/auth/Login';
import Register from '@/components/pages/auth/Register';
import RideCreate from '@/components/pages/ride/Create';
import RideEdit from '@/components/pages/ride/Edit';
import RideDetail from '@/components/pages/ride/Detail';
import AccountAttend from '@/components/pages/account/Attend';
import AccountManage from '@/components/pages/account/Manage';

const Main = props => (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route path='/ride/create' component={RideCreate}/>
        <Route path='/ride/edit/:id' component={RideEdit}/>
        <Route path='/ride/:id' component={RideDetail}/>
        <Route path='/account/attend' component={AccountAttend}/>
        <Route path='/account/manage' component={AccountManage}/>
    </Switch>
);

export default Main;
