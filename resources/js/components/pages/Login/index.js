import React, {memo, useCallback, useState} from "react";
import styled from "styled-components";
import {connect} from "react-redux";
import {login} from "@/actions/user";
import storage from "@/utils/storage";
import PageTemplate from "@components/templates/PageTemplate";
import LoginForm from "@components/UI/organisms/LoginForm";
import Heading from "@components/UI/atoms/Heading";

const StyledHeading = styled(Heading)`
    margin-top: 10px;
    font-weight: bold;
    font-size: 20px;
`;

const Login = memo(({...props}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        const {dispatch} = props;

        console.log(email);
        console.log(password);

        dispatch(login(email, password)).then(() => {
            const check = storage.get('loggedToken');

            if (check) {
                alert('로그인 성공');
                props.history.push('/');
            }
        });

    }, [email, password]);

    return (
        <PageTemplate>
            <section>
                <StyledHeading level={2}>로그인</StyledHeading>

                <LoginForm onSubmit={handleSubmit}
                           email={email}
                           setEmail={setEmail}
                           password={password}
                           setPassword={setPassword} />
            </section>
        </PageTemplate>
    );
});

export default connect()(Login);
