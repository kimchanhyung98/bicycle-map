import React, {memo} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import styled, {css} from "styled-components";
import LabelInput from "@components/UI/molecules/LabelInput";
import Input from "@components/UI/atoms/Input";
import color from "@/constant/color";
import font from "@/constant/font";

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    overflow: hidden;
    margin-top: 20px;
    line-height: 40px;
`;

const ButtonStyles = css`
    width: auto;
    margin: 0 6px;
    padding: 0 20px;
    border-radius: 4px;
    line-height: 40px;
    font-size: ${font.sizeSmall};
    text-decoration: none;
    cursor: pointer;
`;

const StyledSubmitInput = styled(Input)`
    ${ButtonStyles};
    border: 0;
    background: ${color.pageColor};
    color: ${color.white};
`;
const StyledLink = styled(Link)`
    ${ButtonStyles};
    border: 1px solid ${color.pageColor};
    background: ${color.white};
    color: ${color.pageColor};
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
                <StyledLink to="/register">회원가입</StyledLink>
            </ButtonWrapper>
        </form>
    );
});

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    setEmail: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    setPassword: PropTypes.func.isRequired
};

export default LoginForm;
