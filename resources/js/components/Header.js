import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import storage from '@/utils/storage.js';

const mapStateToProps = (state) => ({
    state
});

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isMenu: false
        };
    }

    render() {
        return (
            <header className="header">
                <div className="header-wrap">
                    <div className="gnb-area">
                        <button type="button" className="btn-gnb"
                            onClick={ this.props.handleAside }></button>
                    </div>

                    <h1 className="header-logo">
                        <Link to="/">Ride</Link>
                    </h1>

                    <div className="header-btn-area">
                        <a href="#"></a>
                    </div>
                </div>
            </header>
        );
    }
}

export default connect(mapStateToProps)(Header);
