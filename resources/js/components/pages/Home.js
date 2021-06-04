import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { formatDifficulty } from '@/utils/ride';

import '@sass/pages/index.scoped.scss';

const mapStateToProps = (state) => ({
    state
});

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rides: [],
            page: 0,
            isEnd: false
        };

        this.handleScroll = this.handleScroll.bind(this);
        this.getData = this.getData.bind(this);
    }

    handleScroll(e) {
        if (this.state.isEnd) {
            let scrollPosition = e.srcElement.scrollingElement.scrollTop + window.innerHeight;

            if (scrollPosition >= document.body.offsetHeight) {
                this.getData();
            }
        }
    }

    getData() {
        this.setState({
            page: ++this.state.page,
            isEnd: false
        }, () => {
            axios.get(`/api/ride?page=${this.state.page}`).then(res => {
                let resData = res.data.rides.data;
                let data = this.state.rides.concat(resData);

                if (resData.length < 10) {
                    window.removeEventListener('scroll', this.handleScroll);
                }

                this.setState({
                    rides: data,
                    isEnd: true
                });
            }).catch(err => {
                console.log(err);
            });
        });
    }

    componentDidMount() {
        this.getData();
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    render() {
        let rides = Array.from(this.state.rides);

        return (
            <main className="main">
                <article className="main-container">
                    <ul className="ride-list">
                        { rides.length > 0 ?
                            rides.map((ride) => {
                                return (
                                    <li key={ride.id}>
                                        <Link to={`/ride/${ride.id}`}>
                                            <span className="ride-attend">
                                                { ride.participants_count }명 참석
                                            </span>

                                            <div className="ride-header">
                                                <h2 className="ride-title">{ ride.name }</h2>
                                                <span className="ride-difficulty">{ formatDifficulty(ride.difficulty) }</span>
                                            </div>

                                            <ul className="ride-detail">
                                                <li>
                                                    <span>거리</span>
                                                    <p>
                                                        { ride.distance ?
                                                            `${ride.distance}km` : '미정'
                                                        }
                                                    </p>
                                                </li>
                                                <li>
                                                    <span>출발시간</span>
                                                    <p>
                                                        { ride.started_at }
                                                    </p>
                                                </li>
                                                <li>
                                                    <span>종료시간</span>
                                                    <p>
                                                        { ride.ended_at || '미정' }
                                                    </p>
                                                </li>
                                                <li>
                                                    <span>장소</span>
                                                    <p>
                                                        { ride.address } { ride.address_detail }
                                                    </p>
                                                </li>
                                            </ul>
                                        </Link>
                                    </li>
                                )
                            })
                            :
                            <li className="empty-list">개설된 라이드가 없습니다.</li>
                        }
                    </ul>
                </article>
            </main>
        );
    }
};

export default connect(mapStateToProps)(Home);
