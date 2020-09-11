import React, {Component} from 'react';

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

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
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
                            <input type="text" name="name" placeholder="이름 (한글만)" maxLength="20" required
                                   onChange={this.handleChange} />
                        </div>

                        <div className="form-group">
                            <input type="email" name="email" placeholder="이메일" maxLength="100" required
                                   onChange={this.handleChange} />
                        </div>

                        <div className="form-group">
                            <input type="text" name="phone" placeholder="전화번호 (숫자만)" required
                                   onChange={this.handleChange} />
                        </div>

                        <div className="form-group">
                            <input type="password" name="password" placeholder="비밀번호 (8자 이상)" minLength="8" required
                                   onChange={this.handleChange} />
                        </div>

                        <div className="form-group">
                            <input type="password" name="password_confirmation" placeholder="비밀번호 확인" minLength="8" required
                                   onChange={this.handleChange} />
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
