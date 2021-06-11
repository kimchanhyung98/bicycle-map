import React from "react";
import styled, {css} from "styled-components";

const styles = css`
    margin: 0;
    font-weight: bold;
    box-sizing: border-box;
`;

const Heading = styled(({
    level, children, ...props
}) => React.createElement(`h${level}`, props || null, children))`${styles}`;

export default Heading;
