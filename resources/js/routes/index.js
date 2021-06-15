import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "@components/pages/Home";
import Login from "@components/pages/Login";
import Register from "@components/pages/Register";
import RideCreate from "@components/pages/RideCreate";
import RideEdit from "@components/pages/RideEdit";
import RideDetail from "@components/pages/RideDetail";
import MyPage from "@components/pages/MyPage";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/login' component={Login}/>
                <Route path='/register' component={Register}/>
                <Route path='/ride/create' component={RideCreate}/>
                <Route path='/ride/edit/:id' component={RideEdit}/>
                <Route path='/ride/:id' component={RideDetail}/>
                <Route path='/mypage' component={MyPage}/>
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
