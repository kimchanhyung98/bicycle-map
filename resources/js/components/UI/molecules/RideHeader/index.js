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
    color: ${color.red};
    text-align: left;
`;

const RideHeader = memo(({level, name, difficulty}) => {
    return (
        <StyledRideHeader>
            <StyledHeading level={level}>
                {name}
            </StyledHeading>

            <Span>{formatDifficulty(difficulty)}</Span>
        </StyledRideHeader>
    );
});

export default RideHeader;
