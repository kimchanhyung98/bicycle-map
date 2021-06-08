import React, {memo, useCallback} from "react";
import styled from "styled-components";
import font from "@/constant/font";
import color from "@/constant/color";

const StyledInput = styled.input`
    padding: 0 20px;
    border: 1px solid ${color.borderColor};
    border-radius: 4px;
    font-size: ${font.sizeBase};
    color: ${font.color};
    box-sizing: border-box;
    outline: none;

    &::placeholder {
        color: ${color.gray900}
    }

    &:disabled {
        background: ${color.lightGray600};
    }
`;

const Input = memo(({onChange, value, ...props}) => {
    const handleChange = useCallback((event) => {
        const {value} = event.target;
        onChange(value);
    }, []);
    return <StyledInput onInput={handleChange}
                        {...props} />;
});

export default Input;
