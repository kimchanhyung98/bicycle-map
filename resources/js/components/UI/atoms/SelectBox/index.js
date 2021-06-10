import React, {memo} from "react";
import styled from "styled-components";
import color from "@/constant/color";
import font from "@/constant/font";

const StyledSelectBox = styled.select`
    background: ${color.white};
    font-size: ${font.sizeBase};
    color: ${font.color};
    text-align: center;
    outline: none;
`;

const SelectBox = memo(({
    value,
    onChange,
    children,
    ...props
}) => {
    return (
        <StyledSelectBox value={value}
                         onChange={onChange}
                         {...props}>
            {children}
        </StyledSelectBox>
    );
});

export default SelectBox;
