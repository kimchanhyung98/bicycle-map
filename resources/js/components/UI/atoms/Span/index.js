import styled from "styled-components";
import font from "@/constant/font";
import {memo} from "react";

const StyledSpan = styled.span`
    color: ${font.color}
`;

const Span = memo(({children, ...props}) => {
    return (
        <StyledSpan {...props}>
            {children}
        </StyledSpan>
    )
});

export default Span;
