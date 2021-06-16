import React, {memo} from "react";
import styled, {css} from "styled-components";
import font from "@/constant/font";
import color from "@/constant/color";

const Styles = css`
    padding: 0 20px;
    border: 1px solid ${color.borderColor};
    border-radius: 4px;
    font-size: ${font.sizeBase};
    color: ${font.color};
    box-sizing: border-box;
    outline: none;
    resize: none;

    &::placeholder {
        color: ${color.gray900}
    }

    &:disabled {
        background: ${color.lightGray600};
    }
`;

const StyledTextarea = styled.textarea`${Styles}`;
const StyledInput = styled.input`${Styles}`;

const Input = memo(({...props}) => {
    const {type} = props;
    if (type === 'textarea') {
        return <StyledTextarea {...props} />;
    } else if (type === 'file') {
        return <StyledInput {...props} />;
    } else {
        return <StyledInput {...props} />;
    }
});

export default Input;
