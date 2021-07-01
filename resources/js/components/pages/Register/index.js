import React, {memo, useCallback, useState} from "react";
import styled from "styled-components";
import PageTemplate from "@components/templates/PageTemplate";
import Heading from "@components/UI/atoms/Heading";
import RegisterForm from "@components/UI/organisms/RegisterForm";

import {registerApi} from "@/api/userApi";

const StyledHeading = styled(Heading)`
    margin: 10px 0 15px;
    font-weight: bold;
    font-size: 20px;
`;

const buttonText = '회원가입';

const Register = memo(({...props}) => {
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
            const response = await registerApi(options);

            if (response.success) {
                const {message} = response.data;
                alert(message);
                props.history.push('/login');
            } else {
                throw response;
            }
        } catch (err) {
            const {message} = err.data;
            alert(message);
            target.disabled = false;
        }
    }, [name, email, phone, password, pwConfirm]);

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
                              buttonText={buttonText}/>
            </section>
        </PageTemplate>
    );
});

export default Register;
