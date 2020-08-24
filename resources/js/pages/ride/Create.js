import React, {Component} from 'react';
import { connect } from 'react-redux';

import Map from '@/components/Map';
import File from '@/components/common/File';

const mapStateToProps = (state) => ({
    state
});

class Create extends Component {
    constructor(props) {
        super(props);

        this.state = {
            file_id: '',
            name: 'asdasd',
            description: 'asdasd',
            started_at: '2020-06-25 20:17:25',
            ended_at: '',

            address: 'asdasd',
            address_detail: '',
            locality: '',
            sublocality1: '',
            sublocality2: '',
            latitude: '37.554722',
            longitude: '126.970833',

            difficulty: 'advanced',
            capacity: '123123',
            distance: '',
            altitude: '123123',
            altitude_detail: ''
        };

        this.handleSetMarker = this.handleSetMarker.bind(this);
        this.handleSetFile = this.handleSetFile.bind(this);
        this.handleSetAddress = this.handleSetAddress.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSetMarker(latitude, longitude) {
        this.setState({
            latitude: latitude,
            longitude: longitude
        });

        this.handleSetAddress(latitude, longitude);
    }

    handleSetFile(file) {
        this.setState({
            file_id: file.id
        });
    }

    handleSetAddress(latitude, longitude) {
        let lnglat = `${longitude},${latitude}`;

        axios.get(`/api/reverse-geocode?lnglat=${lnglat}`).then(res => {
            let data = res.data.results[0].region;

            this.setState({
                address: `${data.area1.name} ${data.area2.name} ${data.area3.name}`,
                locality: data.area1.name,
                sublocality1: data.area2.name,
                sublocality2: data.area3.name
            });
        }).catch(err => {
            console.log(err);
        });
    }

    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleSubmit(e) {
        e.preventDefault();

        axios.post('/api/ride/store', this.state).then(res => {
            alert(res.data.message);
            this.props.history.push(`/ride/${res.data.ride_id}`);
        }).catch(err => {
            if (err.response.status == 422) {
                const messages = err.response.data.errors;
                alert(messages[Object.keys(messages)[0]]);
            } else {
                alert('오류');
            }
        });
    }

    render() {
        return (
            <main className="main">
                <section className="create-container">
                    <form onSubmit={ this.handleSubmit}>
                        <div className="ride-name">
                            <label className="form-label">제목</label>

                            <input type="text" name="name" placeholder="내용을 입력해주세요"
                                   onChange={this.handleChange} />
                        </div>

                        <div className="ride-description">
                            <label className="form-label">설명</label>

                            <textarea name="description" placeholder="내용을 입력해주세요"
                                      onChange={this.handleChange}></textarea>
                        </div>

                        <div className="ride-date">
                            <label className="form-label">시간</label>

                            <select name="started_at"
                                    onChange={this.handleChange}>
                                <option>11</option>
                                <option>22</option>
                            </select>
                            <select name="ended_at"
                                    onChange={this.handleChange}>
                                <option>11</option>
                                <option>22</option>
                            </select>
                        </div>

                        <div className="ride-address">
                            <label className="form-label">장소</label>

                            <input type="text" name="address" value={this.state.address} placeholder="장소를 지도에 표시해주세요" readOnly
                                   onChange={this.handleChange} />

                               <Map
                                    width={'100%'}
                                    height={'300px'}
                                    lat={this.state.latitude}
                                    lng={this.state.longitude}
                                    zoom={12}
                                    handleSetMarker={this.handleSetMarker} />

                                <input type="text" name="address_detail" placeholder="상세 장소를 입력해주세요"
                                       onChange={this.handleChange} />
                        </div>

                        <div className="ride-course">
                            <label className="form-label">코스</label>

                            <File placeholder={'GPX 파일을 업로드해주세요'}
                                handleSetFile={this.handleSetFile} />
                        </div>

                        <div className="ride-difficulty">
                            <label className="form-label">난이도</label>

                            <select name="difficulty"
                                    onChange={this.handleChange}>
                                <option>11</option>
                                <option>22</option>
                            </select>
                        </div>

                        <div className="ride-capacity">
                            <label className="form-label">정원</label>

                            <select name="capacity"
                                    onChange={this.handleChange}>
                                <option>11</option>
                                <option>22</option>
                            </select>
                        </div>

                        <div className="ride-distance">
                            <label className="form-label">거리</label>

                            <select name="distance"
                                    onChange={this.handleChange}>
                                <option>11</option>
                                <option>22</option>
                            </select>
                        </div>

                        <div className="ride-altitude">
                            <label className="form-label">고도</label>

                            <select name="altitude"
                                    onChange={this.handleChange}>
                                <option>11</option>
                                <option>22</option>
                            </select>
                        </div>

                        <div className="btn-area">
                            <input type="submit" className="btn-submit" value="코스 만들기" />
                        </div>
                    </form>
                </section>
            </main>
        );
    }
};

export default connect(mapStateToProps)(Create);
