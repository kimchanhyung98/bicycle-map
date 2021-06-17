import React, {memo, useCallback, useEffect} from "react";
import styled from "styled-components";
import {connect} from "react-redux";
import {loginSuccess} from "@/actions/user";
import storage from "@/utils/storage";

import Header from "@components/UI/organisms/Header";
import Navigation from "@components/UI/organisms/Navigation";

const StyledSection = styled.section`
    padding-bottom: 45px;
`;

const StyledMain = styled.main`
    margin-top: 45px;
    padding: ${props => props.padding};
`;

const PageTemplate = memo(({
    Header: HeaderComponent,
    Navigation: NavComponent,
    padding = '20px',
    children,
    ...props
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
        <StyledSection>
            {HeaderComponent || <Header/>}
            {NavComponent || <Navigation/>}

            <StyledMain padding={padding}>
                {children}
            </StyledMain>
        </StyledSection>
    );
});

export default connect()(PageTemplate);
