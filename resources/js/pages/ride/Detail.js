import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

import '@sass/pages/ride/ride-detail.scoped.scss';

const mapStateToProps = (state) => ({
    state
});

class Detail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            ride: {
                user: {}
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getData() {
        axios.get(`/api/ride/${this.state.id}`).then(res => {
            this.setState({
                ride: res.data.ride
            });
        }).catch(err => {
            console.log(err);
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        let user = this.props.state.user;

        if (!user.isLoggedIn) {
            alert('로그인을 해주세요');
            return false;
        }

        axios.post('/api/ride/attend', {
            user_id: user.user.id,
            ride_id: this.state.id
        }).then(res => {
            alert(res.data.message);
        }).catch(err => {
            alert('오류');
        });
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        let ride = this.state.ride;

        return (
            <main className="main">
                <section className="map-container"></section>
                <section className="main-container">
                    <div className="ride-header">
                        <div className="ride-difficulty">{ ride.difficulty }</div>
                        <a href="#" className="btn-share">공유</a>
                    </div>

                    <div className="ride-content">
                        <div>
                            <h2 className="ride-title">{ ride.name }</h2>
                        </div>

                        <div>
                            <div className="img-area">
                                <img src="" alt="" />
                            </div>

                            <div className="user-info-area">
                                <span className="user-name">{ ride.user.name }</span>
                                <p className="user-description">
                                    소개글
                                </p>
                            </div>
                        </div>

                        <div>
                            <div className="ride-detail">
                                <span>거리 { ride.distance }km</span>
                                <span>획득고도 { ride.altitude }km</span>
                            </div>

                            <div className="ride-date">
                                { ride.started_at } ~ { ride.ended_at }
                                /*시간 2020.7.1 (수) 09:00 (3시간) */
                            </div>

                            <div className="ride-address">
                                <span>
                                    장소 { ride.address }
                                </span>
                                <span>
                                    상세 { ride.address_detail }
                                </span>
                            </div>
                        </div>

                        <div>
                            <p>
                                { ride.description }
                            </p>
                        </div>

                        <div>
                            <span>정원 { ride.capacity }명</span>
                            <span>현재 5명 참석</span>
                        </div>
                    </div>

                    <div className="btn-area">
                        <button type="button" onClick={ this.handleSubmit }>참가 하기</button>
                    </div>
                </section>
            </main>
        );
    }
};

export default connect(mapStateToProps)(Detail);
