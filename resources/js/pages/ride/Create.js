import React, {Component, useState} from 'react';
import { connect } from 'react-redux';
import { RenderAfterNavermapsLoaded } from "react-naver-maps";

// test
import DateFnsUtils from '@date-io/date-fns';
import {
    DatePicker,
    TimePicker,
    DateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';

// helper
import { formatDate } from '@/helpers/dateFormat';
import { handleChange } from '@/helpers/form';

// component
import Map from '@/components/map/Map';
import File from '@/components/common/File';

// scss
import '@sass/pages/ride/ride-create.scoped.scss';

const mapStateToProps = (state) => ({
    state
});

class Create extends Component {
    constructor(props) {
        super(props);

        this.state = {
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
            altitude_detail: '',

            isLoading: false
        };

        this.handleSetMarker = this.handleSetMarker.bind(this);
        this.handleSetFile = this.handleSetFile.bind(this);
        this.handleSetAddress = this.handleSetAddress.bind(this);
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

    handleSubmit(e) {
        e.preventDefault();

        if (this.state.isLoading) {
            return false;
        }

        let started_at = formatDate(this.state.started_date_time);
        let ended_at = formatDate(this.state.ended_date_time);

        this.setState({
            started_at: started_at,
            ended_at: ended_at,
            isLoading: true
        }, () => {
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
        });

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
                                placeholder="내용을 입력해주세요"
                                value={this.state.name}
                                onChange={ e => {
                                    handleChange(e, this)
                                }} />
                        </div>

                        <div className="form-group ride-description">
                            <label className="form-label">설명</label>

                            <textarea name="description"
                                placeholder="내용을 입력해주세요"
                                onChange={ e => {
                                    handleChange(e, this)
                                }}></textarea>
                        </div>

                        <div className="form-group ride-date">
                            <label className="form-label">시간</label>

                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DateTimePicker />
                            </MuiPickersUtilsProvider>
                        </div>

                        <div className="form-group ride-address">
                            <label className="form-label">장소</label>

                            <input type="text"
                                name="address"
                                value={this.state.address}
                                placeholder="장소를 지도에 표시해주세요"
                                readOnly
                                onChange={ e => {
                                    handleChange(e, this)
                                }} />

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
                                placeholder="상세 장소를 입력해주세요"
                                onChange={ e => {
                                    handleChange(e, this)
                                }} />
                        </div>

                        <div className="form-group ride-course">
                            <label className="form-label">코스</label>

                            <File placeholder={'GPX 파일을 업로드해주세요'}
                                handleSetFile={this.handleSetFile} />
                        </div>

                        <div className="form-group ride-difficulty">
                            <label className="form-label">난이도</label>

                            <select name="difficulty"
                                defaultValue={'beginner'}
                                onChange={ e => {
                                    handleChange(e, this)
                                }}>
                                <option value="beginner">초보자</option>
                                <option value="intermediate">중급자</option>
                                <option value="advanced">숙련자</option>
                            </select>
                        </div>

                        <div className="form-group ride-capacity">
                            <label className="form-label">정원</label>

                            <input type="text"
                                name="capacity"
                                onChange={ e => {
                                    handleChange(e, this)
                                }} />
                        </div>

                        <div className="form-group ride-distance">
                            <label className="form-label">거리</label>

                            <input type="text"
                                name="distance"
                                placeholder="거리 (km)"
                                onChange={ e => {
                                    handleChange(e, this)
                                }} />
                        </div>

                        <div className="form-group ride-altitude">
                            <label className="form-label">고도</label>

                            <select name="altitude"
                                defaultValue={'flat'}
                                onChange={ e => {
                                    handleChange(e, this)
                                }}>
                                <option value="flat">flat</option>
                                <option value="uphill">uphill</option>
                                <option value="mountain">mountain</option>
                            </select>

                            <input type="text"
                                name="altitude_detail"
                                placeholder="고도 (m)"
                                onChange={ e => {
                                    handleChange(e, this)
                                }} />
                        </div>

                        <div className="btn-area">
                            <input type="submit"
                                className="btn-submit"
                                value="코스 만들기" />
                        </div>
                    </form>
                </section>
            </main>
        );
    }
};

export default connect(mapStateToProps)(Create);
