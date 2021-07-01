import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import color from "@/constant/color";

const styles = css`
    text-align: center;
    padding: 0.75em;
    border: 1px solid ${color.borderColor};
`;

const Th = styled.th`${styles}`;
const Td = styled.td`${styles}`;

const TableCell = ({ heading, children, ...props }) => {
    return React.createElement(heading ? Th : Td, props, children);
};

TableCell.propTypes = {
    heading: PropTypes.bool,
    children: PropTypes.any,
};

export default TableCell;
