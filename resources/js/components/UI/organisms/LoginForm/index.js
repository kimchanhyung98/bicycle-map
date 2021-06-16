import React, {memo} from "react";
import styled from "styled-components";
import LabelInput from "@components/UI/molecules/LabelInput";
import Input from "@components/UI/atoms/Input";
import color from "@/constant/color";

const ButtonWrapper = styled.div`
    overflow: hidden;
    margin-top: 20px;
    line-height: 40px;
`;

const StyledSubmitInput = styled(Input)`
    display: block;
    margin: 0 auto;
    border: 0;
    background: ${color.pageColor};
    line-height: 40px;
    color: ${color.white};
    cursor: pointer;
`;

const LoginForm = memo(({onSubmit, email, setEmail, password, setPassword}) => {
    return (
        <form onSubmit={onSubmit}>
            <LabelInput isRequired={true}
                             labelProps={{
                                 children: '이메일'
                             }}
                             inputProps={{
                                 type: 'email',
                                 name: 'email',
                                 defaultValue: email,
                                 placeholder: '이메일을 입력해주세요.',
                                 onChange: event => setEmail(event.target.value)
                             }}/>

            <LabelInput isRequired={true}
                             labelProps={{
                                 children: '비밀번호'
                             }}
                             inputProps={{
                                 type: 'password',
                                 name: 'password',
                                 defaultValue: password,
                                 placeholder: '비밀번호를 입력해주세요.',
                                 onChange: event => setPassword(event.target.value)
                             }}/>

            <ButtonWrapper>
                <StyledSubmitInput type="submit"
                                   value="로그인"/>
            </ButtonWrapper>
        </form>
    );
});

export default LoginForm;
