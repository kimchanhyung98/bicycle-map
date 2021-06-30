import React, {memo, useState} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Input from "@components/UI/atoms/Input";
import Button from "@components/UI/atoms/Button";
import color from "@/constant/color";
import font from "@/constant/font";
import {commentCreate} from "@/api/commentApi";

const StyledForm = styled.form`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 60px;
`;

const StyledTextarea = styled(Input)`
    width: calc(100% - 60px);
    padding: 8px 12px;
    font-size: ${font.sizeSmall};
`;

const StyledButton = styled(Button)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 100%;
    padding: 0 8px;
    border-radius: 4px;
    background: ${color.pageColor};
    font-weight: normal;
    font-size: ${font.sizeSmall};
    color: ${color.white};
    text-decoration: none;
`;

const CommentForm = memo(({rideId, parentId, setComments}) => {
    const [text, setText] = useState('');

    const handleChangeText = (event) => {
        setText(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const target = event.target.querySelector('button[type="submit"]');
        if (target.disabled) return;
        target.disabled = true;

        try {
            const options = {
                data: {
                    ride_id: rideId,
                    parent_id: parentId,
                    content: text
                }
            };
            const response = await commentCreate(options);

            if (response.success) {
                const {comment, message} = response.data;

                setComments(prevComments => {
                    return [
                        ...prevComments,
                        comment
                    ];
                });
                setText('');

                alert(message);
            } else {
                throw response;
            }
        } catch (err) {
            const {message} = err.data;
            alert(message);
        }

        target.disabled = false;
    };

    return (
        <StyledForm onSubmit={handleSubmit}>
            <StyledTextarea type="textarea"
                            value={text}
                            onChange={handleChangeText}/>
            <StyledButton type="submit">작성</StyledButton>
        </StyledForm>
    );
});

CommentForm.defaultProps = {
    parentId: 0
};

CommentForm.propTypes = {
    rideId: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]).isRequired,
    parentId: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    setComments: PropTypes.func.isRequired
};

export default CommentForm;
