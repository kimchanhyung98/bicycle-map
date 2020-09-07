import React, {Component, useState} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

import '@sass/pages/account/account.scoped.scss';

const mapStateToProps = (state) => ({
    state
});

class Manage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rides: [],
            page: 0,
            isEnd: false
        }

        this.handleScroll = this.handleScroll.bind(this);
        this.handleRideDelete = this.handleRideDelete.bind(this);
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

    handleRideDelete(e, ride_id) {
        e.preventDefault();

        axios.delete(`/api/ride/${ride_id}`, {
            ride_id: ride_id
        }).then(res => {
            this.setState((state) => ({
                rides: state.rides.filter(ride => {
                    return ride.id !== ride_id
                })
            }));

            alert(res.data.message);
        }).catch(err => {
            alert('오류');
            console.log(err);
        })
    }

    getData() {
        this.setState({
            page: ++this.state.page,
            isEnd: false
        }, () => {
            axios.get(`/api/account/manage?page=${this.state.page}`).then(res => {
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
                <section className="manage-container">
                    <h2 className="title">개설내역</h2>

                    <ul className="ride-list">
                        { rides.map((ride) => {
                            return (
                                <li key={ride.id}>
                                    <div className="ride-header">
                                        <h2 className="ride-title">{ ride.name }</h2>
                                        <span className="ride-difficulty">{ ride.difficulty }</span>
                                    </div>

                                    <ul className="ride-detail">
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
                                    </ul>

                                    <div className="btn-area">
                                        <Link to={`/ride/${ride.id}`}>바로가기</Link>
                                        <Link to={`/ride/edit/${ride.id}`}>수정하기</Link>
                                        <button type="button"
                                            onClick={e => {
                                                this.handleRideDelete(e, ride.id);
                                            }}>삭제하기</button>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </section>
            </main>
        );
    }
};

export default connect(mapStateToProps)(Manage);
