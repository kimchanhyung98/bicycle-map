import React, {Component} from 'react';
import { connect } from 'react-redux';
import { login } from '@/actions/user.js';
import storage from '@/lib/storage.js';
import { handleChange } from '@/helpers/form';

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

        this.handleSubmit = this.handleSubmit.bind(this);
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
                            <label className="form-label required">이메일</label>

                            <input type="email" name="email" placeholder="이메일을 입력해주세요."
                                onChange={ e=> {
                                    handleChange(e, this)
                                }} />
                        </div>

                        <div className="form-group">
                            <label className="form-label required">비밀번호</label>

                            <input type="password" name="password" placeholder="비밀번호를 입력해주세요."
                                onChange={ e=> {
                                    handleChange(e, this)
                                }} />
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
