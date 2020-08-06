import React, {Component} from 'react';
import { connect } from 'react-redux';

import '@sass/pages/index.scss';

const mapStateToProps = (state) => ({
    state
});

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let data = this.props.state;

        return (
            <article className="main-container">
                <ul className="ride-list">
                    <li>
                        <a href="#">
                            <div className="left-area">
                                <h2 className="ride-title">제목 ㅁㄴㅇㅁㄴㅇ</h2>
                                <div className="ride-detail">
                                    <span>초급</span>
                                    <span>거리 100km</span>
                                    <span>고도 1000m</span>
                                </div>
                                <div className="ride-detail">
                                    <span>봉천로 123-4</span>
                                    <span>출발시간</span>
                                </div>
                            </div>

                            <div className="right-area">
                                <time className="ride-date">2020-07-01 10:10</time>
                                <span className="ride-attend">1명 참석</span>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <div className="left-area">
                                <h2 className="ride-title">제목 ㅁㄴㅇㅁㄴㅇ</h2>
                                <div className="ride-detail">
                                    <span>초급</span>
                                    <span>거리 100km</span>
                                    <span>고도 1000m</span>
                                </div>
                                <div className="ride-detail">
                                    <span>봉천로 123-4</span>
                                    <span>출발시간</span>
                                </div>
                            </div>

                            <div className="right-area">
                                <time className="ride-date">2020-07-01 10:10</time>
                                <span className="ride-attend">1명 참석</span>
                            </div>
                        </a>
                    </li>
                </ul>
            </article>
        );
    }
};

export default connect(mapStateToProps)(Home);
