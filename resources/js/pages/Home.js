import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

import '@sass/pages/index.scoped.scss';

const mapStateToProps = (state) => ({
    state
});

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rides: {}
        };
    }

    getData() {
        axios.get('/api/ride').then(res => {
            this.setState({
                rides: res.data.rides.data
            });
        }).catch(err => {
            console.log(err);
        });
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        let rides = Array.from(this.state.rides);

        return (
            <main className="main">
                <article className="main-container">
                    <ul className="ride-list">
                        { rides.map((ride) => {
                            return (
                                <li key={ride.id}>
                                    <Link to={`/ride/${ride.id}`}>
                                        <span className="ride-attend">1명 참석</span>

                                        <div className="ride-header">
                                            <h2 className="ride-title">{ ride.name }</h2>
                                            <span className="ride-difficulty">{ ride.difficulty }</span>
                                        </div>

                                        <div className="ride-detail">
                                            <span>거리 { ride.distance }km</span>
                                            <span>출발시간 { ride.started_at }</span>
                                            <span>소요시간 3시간</span>
                                        </div>
                                        <div className="ride-address">
                                            <span>출발장소: { ride.address } { ride.address_detail }</span>
                                        </div>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </article>
            </main>
        );
    }
};

export default connect(mapStateToProps)(Home);
