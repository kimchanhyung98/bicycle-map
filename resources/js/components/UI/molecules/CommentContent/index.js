import React, {memo, useCallback} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {connect} from "react-redux";
import Button from "@components/UI/atoms/Button";
import font from "@/constant/font";
import {convertDate} from "@/utils/dateFormat";
import {commentDelete} from "@/api/commentApi";

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

const ThumbnailWrapper = styled.div`
    width: 60px;

    img {
        width: 100%;
        height: 60px;
    }
`;

const CommentDetailWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: calc(100% - 60px);
    padding: 8px 10px 0;
    font-size: ${font.sizeBase};
    box-sizing: border-box;
`;

const CommentDetailHeader = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;

    span {
        font-size: ${font.sizeSmall};
    }
`;

const CommentText = styled.div`
    margin-top: 12px;
    font-size: ${font.sizeSmall};
    line-height: 16px;
    white-space: pre-line;
`;

const CommentButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin-top: 8px;

    button {
        background: none;
        font-size: ${font.sizeSmall};
        text-decoration: underline;
    }
`;

const mapStateToProps = (state) => {
    return {
        ...state
    };
};

const CommentContent = memo(({commentData, setIsShow, setComments, ...props}) => {
    const {id, user, content, parent_id, created_at} = commentData;
    const userId = props.user.info.id;

    const handleSetIsShow = () => {
        setIsShow(prevIsShow => !prevIsShow);
    };

    const handleCommentDelete = useCallback(async (event) => {
        event.preventDefault();
        const {target} = event;
        if (target.disabled) return;
        target.disabled = true;

        try {
            const options = {
                id: id
            };
            const response = await commentDelete(options);

            if (response.success) {
                const {message} = response.data;
                alert(message);
                setComments(prevComments => {
                    const newComments = [...prevComments];
                    const idx = newComments.indexOf(commentData);
                    newComments.splice(idx, 1);

                    return [
                        ...newComments
                    ];
                });
            } else {
                throw response;
            }
        } catch (err) {
            const {message} = err.data;
            alert(message);
            target.disabled = true;
        }
    }, []);

    return (
        <StyledWrapper>
            <ThumbnailWrapper>
                <img src="/images/global/default_profile.png" alt=""/>
            </ThumbnailWrapper>

            <CommentDetailWrapper>
                <CommentDetailHeader>
                    <div>{user.name}</div>
                    <span>{convertDate(created_at)}</span>
                </CommentDetailHeader>

                <CommentText>{content}</CommentText>

                    <CommentButtonWrapper>
                        {!parent_id ?
                            <Button onClick={handleSetIsShow}>답글쓰기</Button> : <div></div>
                        }
                        { user.id === userId ?
                            <Button onClick={handleCommentDelete}>삭제</Button> : ''
                        }
                    </CommentButtonWrapper>
            </CommentDetailWrapper>
        </StyledWrapper>
    );
});

CommentContent.propTypes = {
    commentData: PropTypes.object.isRequired,
    setIsShow: PropTypes.func,
    setComments: PropTypes.func
};

export default connect(mapStateToProps)(CommentContent);
