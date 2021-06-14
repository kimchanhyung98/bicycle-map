import React, {memo, useCallback, useEffect} from "react";
import styled from "styled-components";
import {loginSuccess} from "@/actions/user";
import storage from "@/utils/storage";

import Navigation from "@components/UI/organisms/Navigation";

const StyledMain = styled.main`
    margin-top: 45px;
    padding: 20px 20px 45px;
`;

const PageTemplate = memo(({
    Header, children, ...props
}) => {
    const initUserInfo = useCallback(() => {
        const loggedToken = storage.get('loggedToken');
        if (!loggedToken) return;
        const loggedInfo = storage.get('loggedInfo');
        const {dispatch} = props;

        axios.defaults.headers.common.Authorization = `Bearer ${loggedToken.access_token}`;
        dispatch(loginSuccess(loggedInfo));
    }, []);

    useEffect(() => {
        initUserInfo();
    }, []);

    return (
        <section>
            <Header/>

            <Navigation />

            <StyledMain>
                {children}
            </StyledMain>
        </section>
    );
});

export default PageTemplate;
