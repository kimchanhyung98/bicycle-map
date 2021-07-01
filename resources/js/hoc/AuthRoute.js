import React, {useEffect} from "react";
import {Route, useHistory} from 'react-router-dom';
import storage from "@/utils/storage";
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
                storage.set('loggedToken', '');
                storage.set('loggedInfo', '');
                history.push('/login');
            } else if (!check && success) {
                history.push('/');
            }
        } catch (err) {
            storage.set('loggedToken', '');
            storage.set('loggedInfo', '');
            history.push('/');
        }
    };

    useEffect(() => {
        authCheck();
    }, []);

    return <Route {...props} />;
};

export default AuthRoute;
