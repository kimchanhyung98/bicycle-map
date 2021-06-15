import React, {memo, useCallback} from "react";
import styled from "styled-components";
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Heading from "@components/UI/atoms/Heading";
import Button from "@components/UI/atoms/Button";
import font from "@/constant/font";
import color from "@/constant/color";

import {logout} from "@/actions/user";

const StyledHeader = styled.header`
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 12px;
    box-sizing: border-box;
`;

const ThumbnailWrapper = styled.div`
    overflow: hidden;
    width: 86px;
    height: 86px;
    margin-right: 20px;
    border-radius: 50%;
    flex-shrink: 0;

    img {
        width: 100%;
        height: 100%;
    }
`;

const StyledSection = styled.section`
    display: flex;
    flex-direction: column;
    width: calc(100% - 106px);
`;

const NameWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 36px;
    padding-top: 5px;
`;

const NameHeading = styled(Heading)`
    overflow: hidden;
    font-weight: normal;
    font-size: 26px;
    color: ${font.color};
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const ButtonWrapper = styled.div`
    height: 28px;
    margin-top: 12px;
`;

const StyledButton = styled(Button)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100%;
    border-radius: 4px;
    background: ${color.pageColor};
    font-weight: bold;
    font-size: ${font.sizeBase};
    color: ${color.white};
`;

const mapStateToProps = (state) => {
    return {
        ...state
    };
};

const MyPageHeader = memo(({...props}) => {
    const user = props.user.info;
    const {name} = user;

    const handleLogout = useCallback((event) => {
        event.preventDefault();
        const {dispatch} = props;
        dispatch(logout());
        alert('로그아웃 되었습니다.');
        props.history.push('/');
    }, []);

    return (
        <StyledHeader>
            <ThumbnailWrapper>
                <img src="/images/global/default_profile.png"/>
            </ThumbnailWrapper>

            <StyledSection>
                <NameWrapper>
                    <NameHeading level={2}>{name}</NameHeading>
                </NameWrapper>

                <ButtonWrapper>
                    <StyledButton onClick={handleLogout}>로그아웃</StyledButton>
                </ButtonWrapper>
            </StyledSection>
        </StyledHeader>
    );
});

export default compose(
    withRouter,
    connect(mapStateToProps)
)(MyPageHeader);
