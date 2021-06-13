import React, {Component} from "react";
import styled from "styled-components";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import {logout} from "@/actions/user";
import color from "@/constant/color";
import font from "@/constant/font";

const StyledAside = styled.div`
    .top-area {
        overflow: hidden;
        width: 100%;
        height: 80px;
        padding: 12px;
        background: ${color.pageColor};
        box-sizing: border-box;

        .btn-home {
            float: left;
            width: 25px;
            height: 25px;
            background: ${color.white};
        }

        .btn-aside-close {
            overflow: hidden;
            width: 32px;
            height: 32px;
            padding: 0;
            border: 0;
            background: url('/images/global/menu_white_icon.png') no-repeat center center;
            background-size: 26px 26px;
            text-indent: -9999px;
        }
    }

    .user-info-area {
        overflow: hidden;
        margin-top: -30px;
        text-align: center;

        .user-profile {
            width: 75px;
            height: 75px;
            margin: 0 auto;
        }

        .user-name {
            margin-top: 10px;
            font-weight: bold;
            font-size: ${font.sizeLarge};
        }
    }

    .nav-area {
        margin-top: 30px;
        padding: 0 15px;

        .nav-list {
            padding-bottom: 12px;
            border-bottom: 1px solid ${color.borderColor};
        }

        .nav-list li a {
            display: block;
            padding: 6px 0 6px 8px;
            color: ${font.color};
            text-decoration: none;
        }
    }

    .btn-area {
        margin-top: 30px;
        padding: 0 15px;

        *[class^="btn-"] {
            display: block;
            width: 100%;
            height: 45px;
            padding: 0;
            border: 0;
            border-radius: 4px;
            background: ${color.pageColor};
            font-size: ${font.sizeLarge};
            line-height: 45px;
            color: ${color.white};
            text-align: center;
            text-decoration: none;
            box-sizing: border-box;
        }
    }
`;

const mapStateToProps = (state) => ({
    state
});

class Aside extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isMenu: false
        };

        this.handleLogout = this.handleLogout.bind(this);
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    handleMenuClick() {
        this.props.toggleAside(false);
    }

    handleLogout(e) {
        e.preventDefault();
        const {dispatch} = this.props;

        dispatch(logout());
        alert('로그아웃 되었습니다.');
        this.handleMenuClick();
        this.props.history.push('/');
    }

    render() {
        let user = this.props.state.user.user;
        let isLoggedIn = this.props.state.user.isLoggedIn;

        return (
            <StyledAside>
                <div className="top-area">
                    <button type="button" className="btn-aside-close"
                            onClick={this.handleMenuClick}>닫기
                    </button>
                </div>

                <div className="user-info-area">
                    <img src="/images/global/default_profile.png" className="user-profile" alt="프로필 이미지"/>
                    <p className="user-name">
                        {isLoggedIn ? `${user.name} 님` : '비로그인'}
                    </p>
                </div>

                <nav className="nav-area">
                    {isLoggedIn ?
                        <ul className="nav-list">
                            <li><Link to="/" onClick={this.handleMenuClick}>메인</Link></li>
                            <li><Link to="/ride/create" onClick={this.handleMenuClick}>라이드 개설</Link></li>
                            <li><Link to="/account/attend" onClick={this.handleMenuClick}>신청내역</Link></li>
                            <li><Link to="/account/manage" onClick={this.handleMenuClick}>개설내역</Link></li>
                        </ul>
                        :
                        <ul className="nav-list">
                            <li><Link to="/" onClick={this.handleMenuClick}>메인</Link></li>
                            <li><Link to="/login" onClick={this.handleMenuClick}>로그인</Link></li>
                            <li><Link to="/register" onClick={this.handleMenuClick}>회원가입</Link></li>
                        </ul>
                    }
                </nav>

                <div className="btn-area">
                    {isLoggedIn ?
                        <button type="button" className="btn-logout"
                                onClick={this.handleLogout}>로그아웃</button>
                        :
                        <Link to="/login" className="btn-login"
                              onClick={this.handleMenuClick}>로그인</Link>
                    }
                </div>
            </StyledAside>
        );
    }
}

export default withRouter(connect(mapStateToProps)(Aside));
