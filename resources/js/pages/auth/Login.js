import React, {Component} from 'react';
import { connect } from 'react-redux';

import '@sass/pages/auth.scss';


const mapStateToProps = (state) => ({
    state
});

class Login extends Component {
    render() {
        return (
            <article className="auth-container">
                <h2 className="title">로그인</h2>

                <form>
                    {JSON.stringify(this.props.state.user)} 
                    <div className="form-group">
                        <input type="text" name="id" placeholder="아이디" />
                    </div>

                    <div className="form-group">
                        <input type="password" name="password" placeholder="패스워드" />
                    </div>

                    <div className="btn-area">
                        <input type="submit" className="btn-submit" value="로그인" />
                    </div>
                </form>
            </article>
        );
    }
};

export default connect(mapStateToProps)(Login);
