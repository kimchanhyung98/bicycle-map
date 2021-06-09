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

const RegisterForm = memo(({
    onSubmit,
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    password,
    setPassword,
    pwConfirm,
    setPwConfirm
}) => {
    return (
        <form onSubmit={onSubmit}>
            <LabelInput isRequired={true}
                        labelProps={{
                            children: '이름'
                        }}
                        inputProps={{
                            type: 'text',
                            name: 'name',
                            defaultValue: name,
                            placeholder: '이름을 입력해주세요.',
                            onChange: setName
                        }}/>

            <LabelInput isRequired={true}
                        labelProps={{
                            children: '이메일'
                        }}
                        inputProps={{
                            type: 'email',
                            name: 'email',
                            defaultValue: email,
                            placeholder: '이메일을 입력해주세요.',
                            onChange: setEmail
                        }}/>

            <LabelInput isRequired={true}
                        labelProps={{
                            children: '전화번호'
                        }}
                        inputProps={{
                            type: 'text',
                            name: 'phone',
                            defaultValue: phone,
                            placeholder: '전화번호를 입력해주세요.',
                            onChange: setPhone
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
                            onChange: setPassword
                        }}/>

            <LabelInput isRequired={true}
                        labelProps={{
                            children: '비밀번호 확인'
                        }}
                        inputProps={{
                            type: 'password',
                            name: 'password_confirmation',
                            defaultValue: pwConfirm,
                            placeholder: '비밀번호 다시 입력해주세요.',
                            onChange: setPwConfirm
                        }}/>

            <ButtonWrapper>
                <StyledSubmitInput type="submit"
                                   value="회원가입"/>
            </ButtonWrapper>
        </form>
    );
});

export default RegisterForm;
