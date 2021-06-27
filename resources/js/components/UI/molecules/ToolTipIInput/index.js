import React, {memo} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Input from "@components/UI/atoms/Input";
import font from "@/constant/font";

const StyledWrapper = styled.div`
    overflow: hidden;
    position: relative;
    margin: ${({margin}) => margin};
`;

const StyledInput = styled(Input)`
    width: 100%;
    height: 45px;
`;

const StyledText = styled.span`
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    right: 5px;
    height: 100%;
    font-size: ${font.sizeSmall};
`;

const ToolTipIInput = memo(({margin, inputProps, text}) => {
    return (
        <StyledWrapper margin={margin}>
            <StyledInput {...inputProps} />
            <StyledText>
                {text}
            </StyledText>
        </StyledWrapper>
    );
});

ToolTipIInput.defaultProps = {
    margin: '0',
    text: ''
};

ToolTipIInput.propTypes = {
    margin: PropTypes.string,
    inputProps: PropTypes.object,
    text: PropTypes.string
};

export default ToolTipIInput;
