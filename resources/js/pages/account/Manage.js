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
    }

    render() {
        return (
            <main className="main">
                <section className="manage-container">
                    <h2 className="title">개설내역</h2>

                </section>
            </main>
        );
    }
};

export default connect(mapStateToProps)(Manage);
