import React, {memo, useCallback, useEffect, useState} from "react";
import styled from "styled-components";
import axios from "axios";
import {connect} from 'react-redux';
import {loginSuccess} from '@/store/actions/user';
import storage from '@/utils/storage';
import color from "@/constant/color";

const StyledMain = styled.main`
    padding: 20px;
`;

const StyledHeader = styled.header`
    height: 56px;
    background: ${color.pageColor};
`;

const StyledAside = styled.aside`
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 300;
    width: 100%;
    height: 100%;
    background: ${color.white};

    &.show{
        display: block;
    }
`;

const mapStateToProps = (state) => ({
    state
});

const PageTemplate = memo(({
   Header, Aside, children, ...props
}) => {
    const [showAside, setShowAside] = useState(false);
    const toggleAside = useCallback((isShow) => {
        setShowAside((prevShowAside) => isShow || !prevShowAside);
    }, []);
    const initUserInfo = useCallback(() => {
        const loggedToken = storage.get('loggedToken');
        if (!loggedToken) return;
        const loggedInfo = storage.get('loggedInfo');
        const { dispatch } = props;

        axios.defaults.headers.common.Authorization = `Bearer ${loggedToken.access_token}`;
        dispatch(loginSuccess(loggedInfo));
    }, []);

    useEffect(() => {
        initUserInfo();
    }, []);

    return (
        <>
            <StyledHeader>
                <Header toggleAside={toggleAside} />
            </StyledHeader>

            <StyledAside className={showAside ? 'show' : ''}>
                <Aside toggleAside={toggleAside} />
            </StyledAside>

            <StyledMain>
                {children}
            </StyledMain>
        </>
    );
});

export default connect(mapStateToProps)(PageTemplate);
