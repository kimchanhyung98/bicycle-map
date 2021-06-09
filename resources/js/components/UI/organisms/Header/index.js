import React, {PureComponent} from "react";
import styled from "styled-components";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import color from "@/constant/color";
import font from "@/constant/font";

const StyledHeader = styled.div`
    overflow: hidden;
    position: relative;
    height: 100%;
    padding: 12px;
    box-sizing: border-box;

    .gnb-area {
        float: left;

        .btn-gnb {
            display: block;
            overflow: hidden;
            width: 32px;
            height: 32px;
            padding: 0;
            border: 0;
            background: url('/images/global/menu_white_icon.png') no-repeat center center;
            background-size: cover;
            text-indent: -9999px;
        }
    }

    .header-logo {
        position: absolute;
        left: 50%;
        width: 200px;
        margin-left: -100px;
        text-align: center;

        a {
            font-size: ${font.sizeLarge};
            line-height: 32px;
            color: ${color.white};
            text-decoration: none;
        }
    }
`;

const mapStateToProps = (state) => ({
    state
});

class Header extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isMenu: false
        };
    }

    render() {
        return (
            <StyledHeader>
                <div className="gnb-area">
                    <button type="button"
                            className="btn-gnb"
                            onClick={this.props.toggleAside}>gnb</button>
                </div>

                <h1 className="header-logo">
                    <Link to="/">Ride</Link>
                </h1>

                <div className="header-btn-area">
                    <a href="#"></a>
                </div>
            </StyledHeader>
        );
    }
}

export default connect(mapStateToProps)(Header);
