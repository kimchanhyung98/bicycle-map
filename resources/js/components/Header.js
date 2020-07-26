import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

const mapStateToProps = (state) => ({
    state
});

const AuthMenuList = (user) => {
    return [
        <li><Link to="/">메인</Link></li>,
        <li><Link to="/logout">로그아웃</Link></li>
    ]
};

const MenuList = (user) => {
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

        this.logout = this.logout.bind(this);
        this.menuClick = this.menuClick.bind(this);
    }

    logout() {
        let state = {
            isLoggedIn: false,
            fetchingUpdate: false,
            user: {},
        };
        localStorage['loggedInfo'] = JSON.stringify(state);
        this.setState(state);
        alert('로그아웃 되었습니다.');
        this.props.history.push('/');
    }

    menuClick() {
        this.setState({
            isMenu: !this.state.isMenu
        });
    }

    render() {
        let Menu;

        if (this.props.state.user.isLoggedIn) {
            Menu = <AuthMenuList user={this.props.state.user} />;
        } else {
            Menu = <MenuList user={this.props.state.user} />;
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
