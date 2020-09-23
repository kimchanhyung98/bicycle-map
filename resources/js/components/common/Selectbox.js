import React, { Component } from 'react';

class Selectbox extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <select
                value={ this.props.value || '' }
                onChange={ e => this.props.handleSetData(e) }>
                { this.props.options.map((option) => {
                    return (
                        <option
                            key={ option.value }
                            value={ option.value }>
                            { option.text }
                        </option>
                    )
                }) }
            </select>
        );
    }
};

export default Selectbox;
