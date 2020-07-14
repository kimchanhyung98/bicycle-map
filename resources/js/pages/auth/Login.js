import React from 'react';

import '@sass/pages/auth.scss';

const Home = () => {
    return (
        <article className="auth-container">
            <h2 className="title">로그인</h2>

            <form>
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
};

export default Home;
