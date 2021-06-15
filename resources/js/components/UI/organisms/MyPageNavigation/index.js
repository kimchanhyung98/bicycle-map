import React, {memo} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
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

const MyPageNavigation = memo(() => {
    return (
        <StyledNav>
            <StyledList>
                <li>
                    <Link to="/mypage">신청내역</Link>
                </li>
                <li>
                    <Link to="/mypage/manage">개설내역</Link>
                </li>
            </StyledList>
        </StyledNav>
    );
});

export default MyPageNavigation;
