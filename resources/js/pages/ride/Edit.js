import React, {Component, useState} from 'react';
import { connect } from 'react-redux';
import DateTimePicker from 'react-datetime-picker';
import { RenderAfterNavermapsLoaded } from "react-naver-maps";

import Map from '@/components/map/Map';
import File from '@/components/common/File';

import '@sass/pages/ride/ride-create.scoped.scss';

const mapStateToProps = (state) => ({
    state
});

class Edit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            file_id: '',
            name: '',
            description: '',
            started_date_time: new Date(),
            started_at: '',
            ended_date_time: new Date(),
            ended_at: '',

            address: '',
            address_detail: '',
            locality: '',
            sublocality1: '',
            sublocality2: '',
            latitude: '37.554722',
            longitude: '126.970833',

            difficulty: 'beginner',
            capacity: '',
            distance: '',
            altitude: 'flat',
            altitude_detail: ''
        };

        this.handleSetMarker = this.handleSetMarker.bind(this);
        this.handleSetFile = this.handleSetFile.bind(this);
        this.handleSetAddress = this.handleSetAddress.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.formatNaturalDate = this.formatNaturalDate.bind(this);
        this.formatDigit = this.formatDigit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getData = this.getData.bind(this);
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

    formatDate(date) {
        let year = date.getFullYear();
        let month = this.formatDigit(date.getMonth() + 1);
        let day = this.formatDigit(date.getDate());
        let hour = this.formatDigit(date.getHours());
        let minute = this.formatDigit(date.getMinutes());

        return `${year}-${month}-${day} ${hour}:${minute}:00`;
    }

    formatNaturalDate(date) {
        date = date.split(' ');
        let splitDate = date[0].split('-');
        let splitTime = date[1].split(':');

        return new Date(splitDate[0], splitDate[1] - 1, splitDate[2], splitTime[0], splitTime[1], 0);
    }

    formatDigit(date) {
        return date < 10 ? `0${date}` : date;
    }

    handleSubmit(e) {
        e.preventDefault();

        let started_at = this.formatDate(this.state.started_date_time);
        let ended_at = this.formatDate(this.state.ended_date_time);

        this.setState({
            started_at: started_at,
            ended_at: ended_at
        }, () => {
            axios.put(`/api/ride/${this.state.id}`, this.state).then(res => {
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
        });
    }

    getData() {
        axios.get(`/api/ride/edit/${this.state.id}`).then(res => {
            let data = res.data.ride;
            data.started_date_time = this.formatNaturalDate(data.started_at);
            data.ended_date_time = this.formatNaturalDate(data.ended_at);
            this.setState(res.data.ride);
        }).catch(err => {
            console.log(err);
        });
    }

    componentWillReceiveProps() {
        this.getData();
    }

    render() {
        const NAVER_API_KEY = env.NCLOUD_CLIENT_ID;

        return (
            <main className="main">
                <section className="create-container">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group ride-name">
                            <label className="form-label">제목</label>

                            <input type="text"
                                name="name"
                                value={this.state.name || ''}
                                placeholder="내용을 입력해주세요"
                                onChange={this.handleChange} />
                        </div>

                        <div className="form-group ride-description">
                            <label className="form-label">설명</label>

                            <textarea name="description"
                                value={this.state.description || ''}
                                placeholder="내용을 입력해주세요"
                                onChange={this.handleChange}></textarea>
                        </div>

                        <div className="form-group ride-date">
                            <label className="form-label">시간</label>

                            <DateTimePicker
                                format={'y-MM-dd HH:mm'}
                                value={this.state.started_date_time}
                                onChange={(value) => {
                                    this.setState({
                                        started_date_time: value
                                    })
                                }} />

                            <DateTimePicker
                                format={'y-MM-dd HH:mm'}
                                value={this.state.ended_date_time}
                                onChange={(value) => {
                                    this.setState({
                                        ended_date_time: value
                                    })
                                }} />
                        </div>

                        <div className="form-group ride-address">
                            <label className="form-label">장소</label>

                            <input type="text"
                                name="address"
                                value={this.state.address || ''}
                                placeholder="장소를 지도에 표시해주세요"
                                readOnly
                                onChange={this.handleChange} />

                            <RenderAfterNavermapsLoaded
                                ncpClientId={NAVER_API_KEY}
                                error={<p>Maps Load Error</p>}
                                loading={<p>Maps Loading...</p>}>
                                <Map width={'100%'}
                                   height={'300px'}
                                   disabled={false}
                                   zoom={12}
                                   center={{
                                       lat: this.state.latitude,
                                       lng: this.state.longitude

                                   }}
                                   markers={[
                                       {
                                           lat: this.state.latitude,
                                           lng: this.state.longitude
                                       }
                                   ]}
                                   handleSetMarker={this.handleSetMarker} />
                            </RenderAfterNavermapsLoaded>

                            <input type="text"
                                name="address_detail"
                                value={this.state.address_detail || ''}
                                placeholder="상세 장소를 입력해주세요"
                                onChange={this.handleChange} />
                        </div>

                        <div className="form-group ride-course">
                            <label className="form-label">코스</label>

                            <File value={this.state.file_id || ''}
                                placeholder={'GPX 파일을 업로드해주세요'}
                                handleSetFile={this.handleSetFile} />
                        </div>

                        <div className="form-group ride-difficulty">
                            <label className="form-label">난이도</label>

                            <select name="difficulty"
                                value={this.state.difficulty || ''}
                                onChange={this.handleChange}>
                                <option value="beginner">beginner</option>
                                <option value="intermediate">intermediate</option>
                                <option value="advanced">advanced</option>
                            </select>
                        </div>

                        <div className="form-group ride-capacity">
                            <label className="form-label">정원</label>

                            <input type="text"
                                name="capacity"
                                value={this.state.capacity || ''}
                                onChange={this.handleChange} />
                        </div>

                        <div className="form-group ride-distance">
                            <label className="form-label">거리</label>

                            <input type="text"
                                name="distance"
                                placeholder="거리 (km)"
                                value={this.state.distance || ''}
                                onChange={this.handleChange} />
                        </div>

                        <div className="form-group ride-altitude">
                            <label className="form-label">고도</label>

                            <select name="altitude"
                                value={this.state.altitude || ''}
                                onChange={this.handleChange}>
                                <option value="flat">flat</option>
                                <option value="uphill">uphill</option>
                                <option value="mountain">mountain</option>
                            </select>

                            <input type="text"
                                name="altitude_detail"
                                value={this.state.altitude_detail || ''}
                                placeholder="고도 (m)"
                                onChange={this.handleChange} />
                        </div>

                        <div className="btn-area">
                            <input type="submit"
                                className="btn-submit"
                                value="코스 수정하기" />
                        </div>
                    </form>
                </section>
            </main>
        );
    }
};

export default connect(mapStateToProps)(Edit);
