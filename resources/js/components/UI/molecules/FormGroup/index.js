import React, {memo} from "react";
import styled from "styled-components";
import Label from "@components/UI/atoms/Label";
import color from "@/constant/color";
import font from "@/constant/font";

const StyledFormGroup = styled.div`
    margin-top: 15px;

    &:first-child {
        margin-top: 27px;
    }

    &:after{
        display: block;
        clear: both;
        content: '';
    }

    &.required label::after {
        padding-left: 4px;
        font-size: 15px;
        color: ${color.red};
        content: '(필수)';
    }

    label {
        display: block;
        font-size: ${font.sizeLarge};
        line-height: 18px;
    }

    input[type="text"],
    input[type="password"],
    input[type="email"],
    input[type="tel"] {
        width: 100%;
        height: 45px;
        margin-top: 8px;
    }
`;

const FormGroup = memo(({isRequired, labelProps, children}) => {
    return (
        <StyledFormGroup className={isRequired ? 'required' : ''}>
            <Label {...labelProps} />

            {children}
        </StyledFormGroup>
    );
});

export default FormGroup;
