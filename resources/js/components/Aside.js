import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import storage from '@/lib/storage.js';

const mapStateToProps = (state) => ({
    state
});

class Aside extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isMenu: false
        };
    }

    render() {
        return (
            <aside className="aside">
                <div className="top-area">
                    <Link to="/" className="btn-home">홈</Link>
                    <button type="button" className="btn-aside-close">닫기</button>
                </div>

                <div className="user-info-area">
                    <img src="/images/default_profile.png" className="user-profile" alt="프로필 이미지" />
                    <p className="user-name">
                        <span>ㅁㄴㅇ</span> 님
                    </p>
                </div>

                <nav className="nav-area">
                    <ul className="nav-list">
                        <li><Link to="/">123123</Link></li>
                    </ul>
                </nav>

                <div className="btn-area">
                    <button type="button" className="btn-logout">로그아웃</button>
                </div>
            </aside>
        );
    }
}

export default connect(mapStateToProps)(Aside);
