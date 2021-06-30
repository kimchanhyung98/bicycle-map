import PropTypes from "prop-types";
import styled from "styled-components";

const TableRow = styled.tr``;

TableRow.propTypes = {
    filled: PropTypes.bool,
    reverse: PropTypes.bool,
};

export default TableRow;
