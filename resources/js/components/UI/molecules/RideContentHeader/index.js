import React, {memo} from "react";
import styled from "styled-components";
import color from "@/constant/color";

const StyledHeader = styled.div`
    overflow: hidden;
    margin-top: 10px;
`;

const StyledSpan = styled.span`
    display: block;
    float: left;
    width: auto;
    height: 36px;
    margin-right: -1px;
    padding: 0 15px;
    border-radius: 0 4px 4px 0;
    background: ${color.blue};
    line-height: 36px;
    color: ${color.white};
    text-align: center;
    box-sizing: border-box;
`;

const RideContentHeader = memo(({children}) => {
    return (
        <StyledHeader>
            <StyledSpan>{children}</StyledSpan>
        </StyledHeader>
    )
});

export default RideContentHeader;
