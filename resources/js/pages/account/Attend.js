import React, {Component, useState} from 'react';
import { connect } from 'react-redux';

import '@sass/pages/account/account.scoped.scss';

const mapStateToProps = (state) => ({
    state
});

class Attend extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {
        return (
            <main className="main">
                <section className="attend-container">
                    신청내역
                </section>
            </main>
        );
    }
};

export default connect(mapStateToProps)(Attend);
