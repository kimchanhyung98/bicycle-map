import React from "react";
import {BrowserRouter, Switch} from "react-router-dom";
import AuthRoute from "@/hoc/AuthRoute";
import Home from "@components/pages/Home";
import Login from "@components/pages/Login";
import Register from "@components/pages/Register";
import RideCreate from "@components/pages/RideCreate";
import RideEdit from "@components/pages/RideEdit";
import RideDetail from "@components/pages/RideDetail";
import MyPage from "@components/pages/MyPage";
import UserEdit from "@components/pages/UserEdit";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <AuthRoute exact path='/' component={Home}/>
                <AuthRoute check={false} path='/login' component={Login}/>
                <AuthRoute check={false} path='/register' component={Register}/>
                <AuthRoute check={true} path='/ride/create' component={RideCreate}/>
                <AuthRoute check={true} path='/ride/edit/:id' component={RideEdit}/>
                <AuthRoute path='/ride/:id' component={RideDetail}/>
                <AuthRoute check={true} path='/mypage' component={MyPage}/>
                <AuthRoute check={true} path='/user/edit' component={UserEdit}/>
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
