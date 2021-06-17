import React, {memo} from "react";
import styled from "styled-components";
import List from "@components/UI/atoms/List";
import font from "@/constant/font";
import color from "@/constant/color";

const StyledList = styled(List)`
    margin-top: 12px;
`;

const StyledItem = styled.li`
    overflow: hidden;
    margin-top: 8px;
    font-size: ${font.sizeSmall};
    line-height: 20px;

    &:first-child {
        margin-top: 0;
    }
`;

const StyledName = styled.span`
    width: 72px;
    float: left;
    color: ${color.gray600};
`;

const StyledDistance = styled.p`
    float: left;
    width: calc(100% - 72px);
    color: ${font.color};
    word-break: keep-all;
`;

const RideDetailList = memo(({detailItems}) => {
    const lists = detailItems.map(item => {
        const {name, value} = item;
        return (
            <StyledItem>
                <StyledName>{name}</StyledName>
                <StyledDistance>{value}</StyledDistance>
            </StyledItem>
        );
    });

    return (
        <StyledList>
            {lists}
        </StyledList>
    );
});

export default RideDetailList;
