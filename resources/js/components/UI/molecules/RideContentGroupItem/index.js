import React, {memo} from "react";
import styled from "styled-components";
import Span from "@components/UI/atoms/Span";
import color from "@/constant/color";
import font from "@/constant/font";

const StyledListItem = styled.li`
    overflow: hidden;
    margin-top: 12px;
    font-size: ${font.sizeBase};
    line-height: 16px;

    &:first-child {
        margin-top: 0;
    }

    p {
        float: left;
        width: calc(100% - 72px);
    }
`;

const StyledSpan = styled(Span)`
    float: left;
    width: 72px;
    font-size: ${font.sizeSmall};
    color: ${color.gray600};
`;

const RideContentGroupItem = memo(({title, children}) => {
    return (
        <StyledListItem>
            <StyledSpan>{title}</StyledSpan>

            {children}
        </StyledListItem>
    )
});

export default RideContentGroupItem;
