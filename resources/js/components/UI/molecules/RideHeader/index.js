import React, {memo} from "react";
import styled from "styled-components";
import Heading from "@components/UI/atoms/Heading";
import Span from "@components/UI/atoms/Span";
import font from "@/constant/font";
import color from "@/constant/color";
import {formatDifficulty} from '@/utils/ride';

const StyledRideHeader = styled.div`
    overflow: hidden;
    margin-top: 5px;
`;

const StyledHeading = styled(Heading)`
    float: left;
    width: calc(100% - 100px);
    padding: 0 20px 0 0;
    font-weight: bold;
    font-size: ${font.sizeLarge};
    line-height: 30px;
    color: ${color.pageColor};
    text-align: left;
`;

const StyledDifficulty = styled(Span)`
    display: block;
    float: right;
    width: auto;
    height: 30px;
    margin-right: -1px;
    padding: 0 10px;
    border-radius: 5px 0 0 5px;
    background: ${color.blue};
    font-size: ${font.sizeSmall};
    line-height: 30px;
    color: ${color.white};
    text-align: center;
    text-decoration: none;
    box-sizing: border-box;
`;

const RideHeader = memo(({level, name, difficulty}) => {
    return (
        <StyledRideHeader>
            <StyledHeading level={level}>
                {name}
            </StyledHeading>

            <StyledDifficulty>{formatDifficulty(difficulty)}</StyledDifficulty>
        </StyledRideHeader>
    );
});

export default RideHeader;
