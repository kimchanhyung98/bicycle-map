import React, {memo} from "react";
import styled from "styled-components";
import Label from "@components/UI/atoms/Label";
import Input from "@components/UI/atoms/Input";
import color from "@/constant/color";

const StyledLabelInput = styled.div`
    &:after{
        display: block;
        clear: both;
        content: '';
    }

    .required::after {
        padding-left: 4px;
        font-size: 15px;
        color: ${color.red};
        content: '(필수)';
    }
`;

const LabelInput = memo(({labelProps, inputProps}) => {
    return (
        <StyledLabel>
            <Label {...labelProps} />
            <Input {...inputProps} />
        </StyledLabel>
    );
});

export default LabelInput;
