import React, {Component} from 'react';
import { connect } from 'react-redux';

import '@sass/pages/index.scss';

const mapStateToProps = (state) => ({
    state
});

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rides: {}
        }
    }

    getData() {
        axios.get('/api/rides').then(res => {
            this.setState({
                rides: res.data.rides.data
            });
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        let rides = Array.from(this.state.rides);

        return (
            <article className="main-container">
                <ul className="ride-list">
                    { rides.map((ride) => {
                        return (
                            <li key={ride.id}>
                                <a href="#">
                                    <div className="left-area">
                                        <h2 className="ride-title">{ ride.name }</h2>
                                        <div className="ride-detail">
                                            <span>{ ride.difficulty }</span>
                                            <span>거리 { ride.distance }km</span>
                                            <span>고도 { ride.altitude }km</span>
                                        </div>
                                        <div className="ride-detail">
                                            <span>{ ride.address } { ride.address_detail }</span>
                                            <span>출발시간: { ride.started_at }</span>
                                        </div>
                                    </div>

                                    <div className="right-area">
                                        <time className="ride-date">2020-07-01 10:10</time>
                                        <span className="ride-attend">1명 참석</span>
                                    </div>
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </article>
        );
    }
};

export default connect(mapStateToProps)(Home);
