import React, {memo, useCallback, useEffect, useState} from "react";
import styled from "styled-components";
import PageTemplate from "@components/templates/PageTemplate";
import Heading from "@components/UI/atoms/Heading";
import RegisterForm from "@components/UI/organisms/RegisterForm";

import {userEditApi} from "@/api/userApi";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

const StyledHeading = styled(Heading)`
    margin: 10px 0 15px;
    font-weight: bold;
    font-size: 20px;
`;

const buttonText = '내 정보 수정';

const mapStateToProps = (state) => {
    return {
        ...state
    };
};

const UserEdit = memo(({...props}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [pwConfirm, setPwConfirm] = useState('');

    const handleSubmit = useCallback(async (event) => {
        event.preventDefault();

        const target = event.target.querySelector('input[type="submit"]');
        if (target.disabled) return;

        if (password !== pwConfirm) {
            alert('비빌번호가 일치하지 않습니다.');
            return;
        }

        target.disabled = true;
        try {
            const options = {
                data: {
                    name: name,
                    email: email,
                    phone: phone,
                    password: password,
                    password_confirmation: pwConfirm
                }
            };
            const response = await userEditApi(options);

            if (response.success) {
                const {message} = response.data;
                alert(message);
                props.history.push('/');
            } else {
                throw response;
            }
        } catch (err) {
            const {message} = err.data;
            alert(message);
            target.disabled = false;
        }

    }, [name, email, phone, password, pwConfirm]);

    useEffect(() => {
        const check = props.user.isLoggedIn;
        if (check) {
            const userInfo = props.user.info;
            setName(userInfo.name);
            setEmail(userInfo.email);
            setPhone(userInfo.phone);
        }
    }, [props.user]);

    return (
        <PageTemplate>
            <section>
                <StyledHeading level={2}>{buttonText}</StyledHeading>

                <RegisterForm onSubmit={handleSubmit}
                              name={name}
                              setName={setName}
                              email={email}
                              setEmail={setEmail}
                              phone={phone}
                              setPhone={setPhone}
                              password={password}
                              setPassword={setPassword}
                              pwConfirm={pwConfirm}
                              setPwConfirm={setPwConfirm}
                              buttonText={buttonText} />
            </section>
        </PageTemplate>
    );
});

export default compose(
    withRouter,
    connect(mapStateToProps)
)(UserEdit);
