import React, {memo, useState} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import CommentForm from "@components/UI/molecules/CommentForm";
import CommentContent from "@components/UI/molecules/CommentContent";
import color from "@/constant/color";

const StyledCommentItem = styled.li`
    display: flex;
    flex-direction: column;
    padding: 15px 0 0;
    border-bottom: 1px solid ${color.borderColor};

    &:last-child {
        padding-bottom: 0;
        border-bottom: 0;
    }
`;

const ReplySection = styled.section`
    margin-top: 15px;
    padding: ${({isShow}) => isShow ? '10px 10px 15px' : '0 10px'};
    background: ${color.lightGray};

    form {
        display: ${({isShow}) => isShow ? 'flex' : 'none'};
    }

    ul li {
        padding-bottom: 15px;

        &:last-child {
            padding-bottom: ${({isShow}) => isShow ? '0' : '15px'};
        }
    }
`;

const CommentItem = memo(({commentData, setComments}) => {
    const [isShow, setIsShow] = useState(false);
    const [reply, setReply] = useState(commentData.reply || []);
    const {id, ride_id} = commentData;

    return (
        <StyledCommentItem>
            <CommentContent commentData={commentData}
                            setIsShow={setIsShow}
                            setComments={setComments}/>

            <ReplySection isShow={isShow}>
                <CommentForm rideId={ride_id}
                             parentId={id}
                             setComments={setReply}/>

                {reply.length ?
                    <ul>
                        {reply.map(item => {
                            const {id} = item;
                            return (
                                <StyledCommentItem key={id}>
                                    <CommentContent commentData={item}
                                                    setComments={setReply}/>
                                </StyledCommentItem>
                            );
                        })}
                    </ul> : ''
                }
            </ReplySection>
        </StyledCommentItem>
    );
});

CommentItem.propTypes = {
    commentData: PropTypes.object.isRequired,
    setComments: PropTypes.func.isRequired
};

export default CommentItem;
