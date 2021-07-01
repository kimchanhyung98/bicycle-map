import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Caption from "@components/UI/atoms/Caption";
import font from "@/constant/font";
import color from "@/constant/color";

const StyledTable = styled.table`
    border-collapse: collapse;
    width: 100%;
    border: 1px solid ${color.pageColor};
    color: ${font.color};
`;

const Table = ({
    caption, head, foot, children, ...props
}) => {
    return (
        <StyledTable {...props}>
            {caption && <Caption>{caption}</Caption>}
            {head && <thead>{head}</thead>}
            {foot && <tfoot>{foot}</tfoot>}
            <tbody>{children}</tbody>
        </StyledTable>
    );
};

Table.propTypes = {
    caption: PropTypes.string,
    head: PropTypes.node,
    foot: PropTypes.node,
    children: PropTypes.any,
    reverse: PropTypes.bool,
};

export default Table;
