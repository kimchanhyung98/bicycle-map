import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';


const mapStateToProps = (state) => ({
    state
});

class Edit extends Component {
    constructor(props) {
        super(props);
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    componentDidMount() {
    }

    render() {
        return (
            <main className="main">
                <section className="create-container">
                    <form>
                        <div className="ride-name">
                            <label className="form-label">제목</label>

                            <input type="text" name="name" placeholder="내용을 입력해주세요" />
                        </div>

                        <div className="ride-description">
                            <label className="form-label">설명</label>

                            <textarea name="description" placeholder="내용을 입력해주세요"></textarea>
                        </div>

                        <div className="ride-date">
                            <label className="form-label">시간</label>

                            <select name="started_at">
                                <option>11</option>
                                <option>22</option>
                            </select>
                            <select name="ended_at">
                                <option>11</option>
                                <option>22</option>
                            </select>
                        </div>

                        <div className="ride-course">
                            <label className="form-label">코스</label>

                            <input type="file" name="course" placeholder="GPX 파일을 업로드해주세요" />
                        </div>

                        <div className="ride-difficulty">
                            <label className="form-label">난이도</label>

                            <select name="difficulty">
                                <option>11</option>
                                <option>22</option>
                            </select>
                        </div>

                        <div className="ride-capacity">
                            <label className="form-label">정원</label>

                            <select name="capacity">
                                <option>11</option>
                                <option>22</option>
                            </select>
                        </div>

                        <div className="ride-distance">
                            <label className="form-label">거리</label>

                            <select name="distance">
                                <option>11</option>
                                <option>22</option>
                            </select>
                        </div>

                        <div className="ride-altitude">
                            <label className="form-label">고도</label>

                            <select name="altitude">
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

export default connect(mapStateToProps)(Edit);
