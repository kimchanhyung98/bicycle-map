import React, {memo} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Label from "@components/UI/atoms/Label";
import color from "@/constant/color";

const StyledFormGroup = styled.div`
    margin-top: 20px;

    &:first-child {
        margin-top: 0;
    }

    &:after{
        display: block;
        clear: both;
        content: '';
    }

    > &.required label::after {
        padding-left: 4px;
        font-size: 15px;
        color: ${color.red};
        content: '(필수)';
    }

    > label {
        display: block;
        line-height: 18px;
    }

    input[type="text"],
    input[type="password"],
    input[type="email"],
    input[type="tel"],
    textarea {
        width: 100%;
        height: 45px;
        margin-top: 8px;
        line-height: 20px;
    }

    textarea {
        padding-top: 12px;
        height: 100px;
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

FormGroup.propTypes = {
    labelProps: PropTypes.object
};

export default FormGroup;
