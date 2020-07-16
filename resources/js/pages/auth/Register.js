import React, {Component} from 'react';

import '@sass/pages/auth.scss';

class Register extends Component {
    render() {
        return (
            <article className="auth-container">
                <h2 className="title">회원가입</h2>

                <form>
                    <div className="form-group">
                        <input type="text" name="id" placeholder="아이디" />
                    </div>

                    <div className="form-group">
                        <input type="password" name="password" placeholder="패스워드" />
                    </div>

                    <div className="form-group">
                        <input type="email" name="email" placeholder="이메일" />
                    </div>

                    <div className="form-group">
                        <input type="tel" name="phone" placeholder="전화번호" pattern="[0-9]{3}[0-9]{2}[0-9]{3}" />
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
