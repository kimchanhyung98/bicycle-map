import React, {Component} from 'react';
import { connect } from 'react-redux';
import { login } from '@/actions/user.js';
import storage from '@/lib/storage.js';

import '@sass/pages/auth.scoped.scss';

const mapStateToProps = (state) => ({
    state
});

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
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

        const { dispatch } = this.props;
        let email = this.state.email;
        let password = this.state.password;

        dispatch(login(email, password)).then(() => {
            const check = storage.get('loggedToken');

            if (check == '' || check == null || check == undefined) {
                alert('로그인 실패');
            } else {
                alert('로그인 성공');
                this.props.history.push('/');
            }
        });
    }

    render() {
        const user = this.props.state.user;

        return (
            <main className="main">
                <article className="auth-container">
                    <h2 className="title">로그인</h2>

                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input type="email" name="email" placeholder="이메일"
                                   onChange={this.handleChange} />
                        </div>

                        <div className="form-group">
                            <input type="password" name="password" placeholder="패스워드"
                                   onChange={this.handleChange} />
                        </div>

                        <div className="btn-area">
                            <input type="submit" className="btn-submit" value="로그인" />
                        </div>
                    </form>
                </article>
            </main>
        );
    }
};

export default connect(mapStateToProps)(Login);
