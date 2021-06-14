import React, {memo} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import styled from "styled-components";
import List from "@components/UI/atoms/List";
import color from "@/constant/color";
import font from "@/constant/font";

const StyledNav = styled.nav`
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 45px;
    border-top: 1px solid ${color.borderColor};
`;

const NavList = styled(List)`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
    margin-top: 0;

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

const mapStateToProps = (state) => {
    return {
        ...state
    };
};

const Navigation = memo(({...props}) => {
    console.log(props);
    return (
        <StyledNav>
            <NavList>
                <li>
                    <Link to={'/'}>Home</Link>
                </li>
                <li>
                    <Link to={'/ride/create'}>Create</Link>
                </li>
                <li>
                    <Link to={'/account/manage'}>MyPage</Link>
                </li>
            </NavList>
        </StyledNav>
    );
});

export default connect(mapStateToProps)(Navigation);
