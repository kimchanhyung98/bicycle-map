import React, {memo} from "react";
import styled, {css} from "styled-components";
import color from "@/constant/color";
import font from "@/constant/font";

const Styles = css`
    overflow: hidden;
    margin-top: 16px;
    padding: 0 0 16px;
    border-bottom: 1px solid ${color.gray600};
`;

const StyledListGroup = styled.ul`
    ${Styles};

    li {
        overflow: hidden;
        margin-top: 12px;
        font-size: ${font.sizeBase};
        line-height: 16px;

        &:first-child {
            margin-top: 0;
        }

        > span {
            float: left;
            width: 72px;
            font-size: ${font.sizeSmall};
            color: ${color.gray600};
        }

        p {
            float: left;
            width: calc(100% - 72px);
        }
    }
`;
const StyledWrapGroup = styled.div`
    ${Styles};
`;

const RideContentGroup = memo(({type, children}) => {
    if (type === 'list') {
        return (
            <StyledListGroup>
                {children}
            </StyledListGroup>
        );
    } else {
        return (
            <StyledWrapGroup>
                {children}
            </StyledWrapGroup>
        );
    }
});

RideContentGroup.defaultProps = {
    children: ''
};

export default RideContentGroup;
