import React, {Component} from 'react';

import '@sass/pages/auth.scss';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        }

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

        let name = this.state.name;
        let email = this.state.email;
        let password = this.state.password;

        axios.post('/register', {
            name: name,
            email: email,
            password: password
        }).then(res => {
            alert('회원가입 성공');
            this.props.history.push('/login');
        }).catch(err => {
            alert('오류');
            console.log(err);
        })
    }

    render() {
        return (
            <article className="auth-container">
                <h2 className="title">회원가입</h2>

                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input type="text" name="name" placeholder="이름"
                               onChange={this.handleChange} />
                    </div>

                    <div className="form-group">
                        <input type="email" name="email" placeholder="이메일"
                               onChange={this.handleChange} />
                    </div>

                    <div className="form-group">
                        <input type="password" name="password" placeholder="패스워드"
                               onChange={this.handleChange} />
                    </div>

                    <div className="btn-area">
                        <input type="submit" className="btn-submit" value="회원가입" />
                    </div>
                </form>
            </article>
        );
    }
};

export default Register;
