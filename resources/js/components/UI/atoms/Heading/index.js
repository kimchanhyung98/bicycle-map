import React from "react";
import styled, {css} from "styled-components";
import PropTypes from "prop-types";

const styles = css`
    margin: 0;
    font-weight: bold;
    box-sizing: border-box;
`;

const Heading = styled(({
    level, children, ...props
}) => React.createElement(`h${level}`, props || null, children))`${styles}`;

Heading.defaultProps = {
    level: 4,
    children: ''
};

Heading.propTypes = {
    level: PropTypes.oneOfType([
        PropTypes.number.isRequired,
        PropTypes.oneOf([1, 2, 3, 4, 5, 6])
    ])
};

export default Heading;
