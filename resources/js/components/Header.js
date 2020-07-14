import React, {Component} from 'react';

class Header extends Component {
    render() {
        return (
            <header className="header">
                <div className="header-wrap">
                    <div className="gnb-area">
                        <button type="button" className="btn-gnb"></button>

                        <ul className="gnb-menu-list">
                            <li><Link to="/login">로그인</Link></li>
                            <li><Link to="/register">회원가입</Link></li>
                        </ul>
                    </div>

                    <h1 className="header-logo">
                        <a href="/">Ride</a>
                    </h1>

                    <div className="header-btn-area">
                        <a href="#"></a>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
