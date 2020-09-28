import React, {Component} from 'react';

// helper
import { handleChange } from '@/helpers/form';

// scss
import '@sass/pages/auth.scoped.scss';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                name: '',
                email: '',
                phone: '',
                password: ''
            },
            isLoading: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.state.isLoading) {
            return false;
        }

        if (this.state.user.password != this.state.user.password_confirmation) {
            alert('비빌번호가 일치하지 않습니다.');
            return false;
        }

        this.setState({
            isLoading: true
        }, () => {
            axios.post('/register', this.state.user).then(res => {
                alert('회원가입 성공');
                this.props.history.push('/login');
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
        return (
            <main className="main">
                <article className="auth-container">
                    <h2 className="title">회원가입</h2>

                    <form onSubmit={ this.handleSubmit }>
                        <div className="form-group">
                            <label className="form-label required">이름</label>

                            <input type="text"
                                name="name"
                                placeholder="이름"
                                maxLength="255"
                                required
                                onChange={ e => {
                                    handleChange(e, this, 'user')
                                }} />
                        </div>

                        <div className="form-group">
                            <label className="form-label required">이메일</label>

                            <input type="email"
                                name="email"
                                placeholder="이메일"
                                maxLength="255"
                                required
                                onChange={ e => {
                                    handleChange(e, this, 'user')
                                }} />
                        </div>

                        <div className="form-group">
                            <label className="form-label required">전화번호</label>

                            <input type="text"
                                name="phone"
                                placeholder="전화번호"
                                required
                                onChange={ e => {
                                    handleChange(e, this, 'user')
                                }} />
                        </div>

                        <div className="form-group">
                            <label className="form-label required">비밀번호</label>

                            <input type="password"
                                name="password"
                                placeholder="8자리 이상 입력해주세요"
                                minLength="8"
                                required
                                onChange={ e => {
                                    handleChange(e, this, 'user')
                                }} />
                        </div>

                        <div className="form-group">
                            <label className="form-label required">비밀번호 확인</label>

                            <input type="password"
                                name="password_confirmation"
                                placeholder="비밀번호 확인"
                                minLength="8"
                                required
                                onChange={ e => {
                                    handleChange(e, this, 'user')
                                }} />
                        </div>

                        <div className="btn-area">
                            <input type="submit" className="btn-submit" value="회원가입" />
                        </div>
                    </form>
                </article>
            </main>
        );
    }
};

export default Register;
