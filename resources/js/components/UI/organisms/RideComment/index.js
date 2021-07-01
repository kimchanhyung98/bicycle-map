import React, {memo} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import CommentForm from "@components/UI/molecules/CommentForm";
import CommentItem from "@components/UI/molecules/CommentItem";

const StyledSection = styled.section`
    display: flex;
    flex-direction: column;
    padding: 0 20px;
`;

const RideComment = memo(({rideId, comments, setComments}) => {
    return (
        <StyledSection>
            <CommentForm rideId={rideId}
                         setComments={setComments}/>

            <ul>
                {comments.map(comment => {
                    return <CommentItem key={comment.id}
                                        commentData={comment}
                                        setComments={setComments}/>;
                })}
            </ul>
        </StyledSection>
    );
});

RideComment.propTypes = {
    rideId: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]).isRequired,
    comments: PropTypes.array.isRequired,
    setComments: PropTypes.func.isRequired
};

export default RideComment;
