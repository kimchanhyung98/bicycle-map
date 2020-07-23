import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

const mapStateToProps = (state) => ({
    state
});

const AuthMenuList = (props) => {
    return [
        <li><Link to="/">메인</Link></li>,
        <li><Link to="/logout">로그아웃</Link></li>
    ]
};

const MenuList = (props) => {
    return [
        <li><Link to="/">메인</Link></li>,
        <li><Link to="/login">로그인</Link></li>,
        <li><Link to="/register">회원가입</Link></li>
    ]
};

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isMenu: false
        };

        this.user = this.props.state.user;
        this.logout = this.logout.bind(this);
        this.menuClick = this.menuClick.bind(this);
    }

    logout() {
        let state = {
            user: {},
            isLogin: false
        };
        localStorage['appState'] = JSON.stringify(state);
        this.setState(state);
        this.props.history.push('/login');
    }

    menuClick() {
        this.setState({
            isMenu: !this.state.isMenu
        });
    }

    render() {
        let Menu;

        if (this.user.isLoggedIn) {
            Menu = <AuthMenuList />;
        } else {
            Menu = <MenuList />;
        }

        return (
            <header className="header">
                <div className="header-wrap">
                    <div className="gnb-area">
                        <button type="button" className="btn-gnb" onClick={ this.menuClick }></button>

                        { this.state.isMenu ?
                            <ul className="gnb-menu-list">{ Menu }</ul> : ''
                        }
                    </div>

                    <h1 className="header-logo">
                        <Link to="/">Ride</Link>
                    </h1>

                    <div className="header-btn-area">
                        <a href="#"></a>
                    </div>
                </div>
            </header>
        );
    }
}

export default connect(mapStateToProps)(Header);
