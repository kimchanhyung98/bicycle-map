import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

import '@sass/pages/ride.scss';

const mapStateToProps = (state) => ({
    state
});

class Home extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <section className="map-container"></section>
                <section className="main-container">
                    <div className="ride-header">
                        <div className="ride-attend">EAsY</div>
                        <a href="#" className="btn-share">공유</a>
                    </div>

                    <div className="ride-content">
                        <div>
                            <h2 className="ride-title">제목 ㅁㄴㅇㅁㄴㅇㅁ</h2>
                        </div>

                        <div>
                            <div className="img-area">
                                <img src="" alt="" />
                            </div>

                            <div className="user-info-area">
                                <span className="user-name">이름</span>
                                <p className="user-summary">
                                    소개글
                                </p>
                            </div>
                        </div>

                        <div>
                            <div className="ride-detail">
                                <span>거리 100km</span>
                                <span>획득고도 1000m</span>
                            </div>

                            <div className="ride-date">
                                시간 2020.7.1 (수) 09:00 (3시간)
                            </div>

                            <div className="ride-address">
                                <span>
                                    장소 봉청로 1234-1
                                </span>
                                <span>
                                    상세 (옵션) asdasd
                                </span>
                            </div>
                        </div>

                        <div>
                            <p>
                                소개긂ㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇ
                            </p>
                        </div>

                        <div>
                            <span>정원 10명</span>
                            <span>현재 5명 참석</span>
                        </div>
                    </div>

                    <div className="btn-area">
                        <button type="button">참가 하기</button>
                    </div>
                </section>
            </div>
        );
    }
};

export default connect(mapStateToProps)(Home);
