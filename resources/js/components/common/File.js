import React, { Component } from 'react';

class File extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        const formData = new FormData();
        formData.append('file', e.target.files[0]);

        axios.post('/api/upload', formData).then(res => {
            this.props.handleSetFile(res.data.file);
            alert('업로드 성공');
        }).catch(err => {
            alert('업로드 실패');
        });
    }

    render() {
        return (
            <input type="file"
                name={this.props.name}
                placeholder={this.props.placeholder}
                onChange={e => this.handleSubmit(e)} />
        );
    }
};

export default File;
