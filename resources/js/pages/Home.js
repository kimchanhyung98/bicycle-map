import React, {Component} from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    state
});

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let data = this.props.state;

        return (
            <div>
                <h2>
                    홈
                </h2>
            </div>
        );
    }
};

export default connect(mapStateToProps)(Home);
