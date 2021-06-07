import React, {memo} from "react";
import styled, {css} from "styled-components";
import color from "@/constant/color";

const styles = css`
    margin-top: 30px;
`;

const Ol = styled.ol`${styles}`;
const Ul = styled.ul`${styles}`;

const List = memo(({ordered, children, ...props}) => {
    return React.createElement(ordered ? Ol : Ul, props || null, children);
});

export default List;
