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
            </article>
        );
    }
};

export default connect(mapStateToProps)(Home);
