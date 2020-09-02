import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import storage from '@/lib/storage.js';

const mapStateToProps = (state) => ({
    state
});

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isMenu: false
        };

        this.logout = this.logout.bind(this);
        this.menuClick = this.menuClick.bind(this);
    }

    logout(e) {
        e.preventDefault();

        storage.set('loggedToken', '');
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
            Menu = (
                <ul className="gnb-menu-list">
                    <li><Link to="/">메인</Link></li>
                    <li><Link to="/ride/create">라이드 개설</Link></li>
                    <li><a href="#" onClick={ this.logout }>로그아웃</a></li>
                </ul>
            );
        } else {
            Menu = (
                <ul className="gnb-menu-list">
                    <li><Link to="/">메인</Link></li>
                    <li><Link to="/login">로그인</Link></li>
                    <li><Link to="/register">회원가입</Link></li>
                </ul>
            );
        }

        return (
            <header className="header">
                <div className="header-wrap">
                    <div className="gnb-area">
                        <button type="button" className="btn-gnb" onClick={ this.menuClick }></button>

                        { this.state.isMenu ?
                            Menu : ''
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
