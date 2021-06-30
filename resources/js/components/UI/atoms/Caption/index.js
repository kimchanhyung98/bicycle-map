import PropTypes from "prop-types";
import styled from "styled-components";
import font from "@/constant/font";

const Caption = styled.caption`
    font-weight: bold;
    line-height: 2rem;
    font-size: ${font.sizeLarge};
    text-transform: uppercase;
`;

Caption.propTypes = {
    reverse: PropTypes.bool,
};

export default Caption;
