import React from "react";
import styled, {css} from "styled-components";
import color from "@/constant/color";

const styles = css`
    margin: 0;
    font-weight: bold;
    color: ${color.red};
    box-sizing: border-box;
`;

const Heading = styled(({
    level, children, ...props
}) => {
    return React.createElement(`h${level}`, props, children)`${styles}`;
});

export default Heading;
