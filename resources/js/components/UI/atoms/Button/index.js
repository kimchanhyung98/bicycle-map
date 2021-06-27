import React, {memo} from "react";
import styled from "styled-components";

const StyledButton = styled.button`
    padding: 0;
    border: 0;
    text-decoration: none;
    box-sizing: border-box;
`;

const Button = memo(({children, ...props}) => {
    return (
        <StyledButton {...props}>
            {children}
        </StyledButton>
    );
});

Button.defaultProps = {
    children: ''
};

export default Button;
