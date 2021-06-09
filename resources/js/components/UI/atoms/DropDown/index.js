import React, {memo} from "react";
import styled from "styled-components";
import color from "@/constant/color";
import font from "@/constant/font";

const StyledDropDown = styled.select`
    background: ${color.white};
    font-size: ${font.sizeBase};
    color: ${font.color};
    text-align: center;
    outline: none;
`;

const DropDown = memo(({
   value,
   onChange,
   options
}) => {
    return (
        <StyledDropDown value={value}
                       onChange={onChange}>
            {options.map((option) => {
                return (
                    <option key={option.value}
                            value={option.value}>
                        {option.text}
                    </option>
                )
            })}
        </StyledDropDown>
    );
});

export default DropDown;
