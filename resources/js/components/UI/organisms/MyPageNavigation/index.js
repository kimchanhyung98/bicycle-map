import React, {memo} from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import List from "@components/UI/atoms/List";
import color from "@/constant/color";
import font from "@/constant/font";

const StyledNav = styled.nav`
    display: flex;
    flex-direction: row;
    height: 44px;
    border-top: 1px solid ${color.borderColor};
    border-bottom: 1px solid ${color.borderColor};
`;

const StyledList = styled(List)`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    margin: 0;

    li {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1 1 auto;
        height: 100%;
    }

    a {
        padding: 12px 15px;
        font-size: ${font.sizeBase};
        color: ${font.color};
        text-decoration: none;
    }
`;

const CustomLink = ({children, ...props}) => {
    return (
        <NavLink {...props} activeStyle={{
            fontWeight: 'bold'
        }}>
            {children}
        </NavLink>
    );
};

const MyPageNavigation = memo(() => {
    return (
        <StyledNav>
            <StyledList>
                <li>
                    <CustomLink exact to="/mypage">신청내역</CustomLink>
                </li>
                <li>
                    <CustomLink to="/mypage/manage">개설내역</CustomLink>
                </li>
            </StyledList>
        </StyledNav>
    );
});

export default MyPageNavigation;
