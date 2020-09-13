import React, {Component} from 'react';
import { handleChange } from '@/common/form';

import '@sass/pages/auth.scoped.scss';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            phone: '',
            password: '',
            isLoading: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.state.isLoading) {
            return false;
        }

        let name = this.state.name;
        let email = this.state.email;
        let phone = this.state.phone;
        let password = this.state.password;
        let password_confirmation = this.state.password_confirmation;

        if (password != password_confirmation) {
            alert('비빌번호가 일치하지 않습니다.');
            return false;
        }

        this.setState({
            isLoading: true
        }, () => {
            axios.post('/register', {
                name: name,
                email: email,
                phone: phone,
                password: password,
                password_confirmation: password_confirmation
            }).then(res => {
                alert('회원가입 성공');
                this.props.history.push('/login');
            }).catch(err => {
                alert('오류');
            });
        });

    }

    render() {
        return (
            <main className="main">
                <article className="auth-container">
                    <h2 className="title">회원가입</h2>

                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input type="text" name="name" placeholder="이름" maxLength="255" required
                                onChange={ e => {
                                    handleChange(e, this)
                                }} />
                        </div>

                        <div className="form-group">
                            <input type="email" name="email" placeholder="이메일" maxLength="255" required
                                onChange={ e => {
                                    handleChange(e, this)
                                }} />
                        </div>

                        <div className="form-group">
                            <input type="text" name="phone" placeholder="전화번호" required
                                onChange={ e => {
                                    handleChange(e, this)
                                }} />
                        </div>

                        <div className="form-group">
                            <input type="password" name="password" placeholder="비밀번호" minLength="8" required
                                onChange={ e => {
                                    handleChange(e, this)
                                }} />
                        </div>

                        <div className="form-group">
                            <input type="password" name="password_confirmation" placeholder="비밀번호 확인" minLength="8" required
                                onChange={ e => {
                                    handleChange(e, this)
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
