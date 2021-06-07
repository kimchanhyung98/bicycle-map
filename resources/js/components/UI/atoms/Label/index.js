import {memo} from "react";
import styled from "styled-components";
import font from "@/constant/font";

const StyledLabel = styled.label`
    font-size: ${font.sizeBase};
`;

const Label = memo(({children, ...props}) => {
    return (
        <StyledLabel {...props}>
            {children}
        </StyledLabel>
    )
});

export default Label;
