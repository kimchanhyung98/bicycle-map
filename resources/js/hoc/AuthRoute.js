import React, {useEffect} from "react";
import {Route, useHistory} from 'react-router-dom';

import {getUserStatus} from "@/api/userApi";

const AuthRoute = ({check = null, ...props}) => {
    const history = useHistory();

    const authCheck = async () => {
        if (check === null) return;

        try {
            const response = await getUserStatus();
            const {success} = response;

            if (check && !success) {
                alert('로그인후 가능');
                history.push('/login');
            } else if (!check && success) {
                history.push('/');
            }
        } catch (err) {
            history.push('/');
        }
    };

    useEffect(() => {
        authCheck();
    }, []);

    return <Route {...props} />;
};

export default AuthRoute;
