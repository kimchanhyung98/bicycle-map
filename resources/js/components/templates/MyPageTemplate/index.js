import React, {memo, useCallback, useEffect} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {connect} from "react-redux";
import {loginSuccess} from "@/actions/user";
import storage from "@/utils/storage";

import Header from "@components/UI/organisms/Header";
import Navigation from "@components/UI/organisms/Navigation";
import MyPageHeader from "@components/UI/organisms/MyPageHeader";
import MyPageNavigation from "@components/UI/organisms/MyPageNavigation";

const StyledMain = styled.main`
    margin-top: 45px;
    padding-bottom: 45px;
`;

const StyledWrapper = styled.div`
    padding: ${props => props.padding};
`;

const MyPageTemplate = memo(({
    Header: HeaderComponent,
    Navigation: NavComponent,
    padding = '0 20px',
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
        <section>
            <HeaderComponent/>
            <NavComponent/>

            <StyledMain>
                <MyPageHeader />
                <MyPageNavigation />

                <StyledWrapper padding={padding}>
                    {children}
                </StyledWrapper>
            </StyledMain>
        </section>
    );
});

MyPageTemplate.defaultProps = {
    Header: Header,
    Navigation: Navigation,
    padding: '0 20px'
};

MyPageTemplate.propTypes = {
    Header: PropTypes.any,
    Navigation: PropTypes.any
};

export default connect()(MyPageTemplate);
