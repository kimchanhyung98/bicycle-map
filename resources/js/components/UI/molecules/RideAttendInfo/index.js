import React, {memo} from "react";
import styled from "styled-components";
import Span from "@components/UI/atoms/Span";
import color from "@/constant/color";

const StyledSpan = styled(Span)`
    display: block;
    position: absolute;
    top: -18px;
    left: -18px;
    width: 85px;
    height: 35px;
    border-radius: 6px;
    font-weight: bold;
    font-size: 12px;
    line-height: 35px;
    color: ${color.blue600};
    text-align: center;
    box-sizing: border-box;
`;

const RideAttendInfo = memo(({children, ...props}) => {
    return (
        <StyledSpan {...props}>
            {children}
        </StyledSpan>
    );
});

export default RideAttendInfo;
