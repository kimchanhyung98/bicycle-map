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

        this.state = {
            id: this.props.match.params.id,
            ride: {}
        }
    }

    getData() {
        axios.get(`/api/ride/${this.state.id}`).then(res => {
            console.log(res);
            this.setState({
                ride: res.data.ride
            });

            console.log(this.state);
        }).catch(err => {
            console.log(err);
        })
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        let ride = JSON.stringify(this.state.ride);

        return (
            <div>
                {ride}
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
                                <span className="user-name">{ ride.user }</span>
                                <p className="user-summary">
                                    { ride.user }
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
                        <button type="button">참가 하기</button>
                    </div>
                </section>
            </div>
        );
    }
};

export default connect(mapStateToProps)(Home);
