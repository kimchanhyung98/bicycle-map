import React, {memo} from "react";
import PropTypes from "prop-types";
import styled, {css} from "styled-components";
import List from "@components/UI/atoms/List";
import RideHeader from "@components/UI/molecules/RideHeader";
import RideDetailList from "@components/UI/molecules/RideDetailList";
import color from "@/constant/color";
import {Link} from "react-router-dom";
import font from "@/constant/font";

const StyledList = styled(List)`
    margin-top: 20px;
`;

const StyledRideItem = styled.li`
    position: relative;
    margin-top: 30px;
    padding: 20px 0 20px 24px;
    border: 1px solid ${color.blue600};
    border-radius: 15px;
    line-height: 19px;
    box-sizing: border-box;

    &:first-child {
        margin-top: 0;
    }
`;

const ButtonWrapper = styled.div`
    overflow: hidden;
    margin-top: 15px;
`;

const StyledEmptyList = styled(StyledRideItem)`
    padding: 10px 0;
    border: 0;
    font-size: 24px;
    text-align: center;
`;

const ButtonStyles = css`
    display: block;
    float: left;
    width: auto;
    height: 28px;
    margin-right: 8px;
    padding: 0 8px;
    border: 1px solid ${color.pageColor};
    background: ${color.white};
    font-size: ${font.sizeSmall};
    line-height: 28px;
    color: ${color.pageColor};
    text-decoration: none;
`;

const StyledLink = styled(Link)`${ButtonStyles}`;
const StyledButton = styled.button`${ButtonStyles}`;

const RideButtonList = memo(({type, rides, emptyMessage, rideDelete, rideCancel}) => {
    let lists = rides.map(ride => {
        const {
            id,
            name,
            difficulty,
            started_at,
            ended_at,
        } = ride;
        const detailItems = [
            {
                name: '출발시간',
                value: started_at
            },
            {
                name: '종료시간',
                value: ended_at
            }
        ];

        let buttons;
        if (type === 'manage') {
            buttons = <>
                <StyledLink to={`/ride/${id}`}>바로가기</StyledLink>
                <StyledLink to={`/ride/edit/${id}`}>수정하기</StyledLink>
                <StyledButton type="button"
                              onClick={() => rideDelete(id)}>
                    삭제하기
                </StyledButton>
            </>;
        } else if (type === 'attend') {
            buttons = <>
                <StyledLink to={`/ride/${id}`}>바로가기</StyledLink>
                <StyledButton type="button"
                              onClick={() => rideCancel(id)}>
                    취소하기
                </StyledButton>
            </>;
        }

        return (
            <StyledRideItem key={id}>
                {/* 리스트 해더 영역 */}
                <RideHeader level={2}
                            name={name}
                            difficulty={difficulty}/>

                {/* 리스트 디테일 영역 */}
                <RideDetailList detailItems={detailItems}/>

                <ButtonWrapper>
                    {buttons}
                </ButtonWrapper>
            </StyledRideItem>
        );
    });

    if (lists.length === 0) {
        lists = <StyledEmptyList>{emptyMessage}</StyledEmptyList>;
    }

    return (
        <StyledList ordered={false}>
            {lists}
        </StyledList>
    );
});

RideButtonList.defaultProps = {
    emptyMessage: '리스트가 없습니다.'
};

RideButtonList.propTypes = {
    type: PropTypes.string.isRequired,
    rides: PropTypes.array.isRequired,
    emptyMessage: PropTypes.string,
    rideDelete: PropTypes.func,
    rideCancel: PropTypes.func
};

export default RideButtonList;
