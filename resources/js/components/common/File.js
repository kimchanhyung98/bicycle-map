import React, { Component } from 'react';

class File extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        const formData = new FormData();
        formData.append('file', e.target.files[0]);

        axios.post(this.props.url, formData).then(res => {
            this.props.handleSetFile(res.data.file);
            alert('업로드 성공');
        }).catch(err => {
            alert('업로드 실패');
        });
    }

    render() {
        return (
            <div className="file-wrap">
                <input type="text"
                    className="file-name"
                    value={ this.props.file ? this.props.file.name : '' }
                    placeholder={ this.props.placeholder }
                    readOnly />
                <label htmlFor="file"
                    className="file-label">등록</label>

                <input type="file"
                    id="file"
                    className="file-input"
                    readOnly
                    onChange={ e => this.handleSubmit(e) } />
            </div>
        );
    }
};

export default File;
