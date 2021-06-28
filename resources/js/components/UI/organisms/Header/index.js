import React, {memo} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import Heading from "@components/UI/atoms/Heading";
import color from "@/constant/color";
import font from "@/constant/font";

const StyledHeader = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 45px;
    background: ${color.pageColor};
`;

const HeaderWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
    height: 100%;
    box-sizing: border-box;
`;

const HeaderLogo = styled(Heading)`

    a {
        font-weight: normal;
        font-size: ${font.sizeBase};
        line-height: 32px;
        color: ${color.white};
        text-decoration: none;
    }
`;

const Header = memo(() => {
    return (
        <StyledHeader>
            <HeaderWrapper>
                <HeaderLogo level={1}>
                    <Link to="/">[BETA] 문제 발생 시 관리자에게 문의</Link>
                </HeaderLogo>
            </HeaderWrapper>
        </StyledHeader>
    );
});

export default Header;
