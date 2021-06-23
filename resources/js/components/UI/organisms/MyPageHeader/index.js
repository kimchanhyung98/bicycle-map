import React, {memo, useCallback} from "react";
import styled, {css} from "styled-components";
import {compose} from "redux";
import {connect, useDispatch} from "react-redux";
import {withRouter, Link, useHistory} from "react-router-dom";
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
    display: flex;
    flex-direction: row;
    height: 28px;
    margin-top: 12px;
`;

const ButtonStyles = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    height: 100%;
    margin-right: 8px;
    padding: 0 8px;
    border-radius: 4px;
    background: ${color.pageColor};
    font-weight: normal;
    font-size: ${font.sizeSmall};
    color: ${color.white};
    text-decoration: none;
`;

const StyledButton = styled(Button)`${ButtonStyles}`;
const StyledLink = styled(Link)`${ButtonStyles}`;

const mapStateToProps = (state) => {
    return {
        ...state
    };
};

const MyPageHeader = memo(({...props}) => {
    let history = useHistory();
    const dispatch = useDispatch();
    const user = props.user.info;
    const {name} = user;

    const handleLogout = useCallback((event) => {
        event.preventDefault();
        dispatch(logout());
        alert('로그아웃 하셨습니다.');
        history.push('/');
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
                    {/*<StyledButton onClick={handleLogout}>로그아웃</StyledButton>*/}
                    <StyledLink to="/user/edit">내 정보 수정</StyledLink>
                </ButtonWrapper>
            </StyledSection>
        </StyledHeader>
    );
});

export default compose(
    withRouter,
    connect(mapStateToProps)
)(MyPageHeader);
