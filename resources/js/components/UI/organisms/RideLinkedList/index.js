import React, {memo} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {Link} from "react-router-dom";
import List from "@components/UI/atoms/List";
import RideAttendInfo from "@components/UI/molecules/RideAttendInfo";
import RideHeader from "@components/UI/molecules/RideHeader";
import RideDetailList from "@components/UI/molecules/RideDetailList";
import color from "@/constant/color";

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

const StyledEmptyList = styled(StyledRideItem)`
    padding: 10px 0;
    border: 0;
    font-size: 24px;
    text-align: center;
`;

const RideLinkedList = memo(({rides}) => {
    let lists = rides.map(ride => {
        const {
            id,
            name,
            difficulty,
            participants_count,
            distance,
            started_at,
            ended_at,
            address,
            address_detail
        } = ride;
        const detailItems = [
            {
                name: '거리',
                value: distance ? `${distance}km` : '미정'
            },
            {
                name: '출발시간',
                value: started_at
            },
            {
                name: '종료시간',
                value: ended_at
            },
            {
                name: '장소',
                value: `${address} ${address_detail || ''}`
            }
        ];

        return (
            <StyledRideItem>
                <Link to={`/ride/${id}`} key={id}>
                    {/* 참여 인수 */}
                    <RideAttendInfo>
                        {participants_count}명 참석
                    </RideAttendInfo>

                    {/* 리스트 해더 영역 */}
                    <RideHeader level={2}
                                name={name}
                                difficulty={difficulty}/>

                    {/* 리스트 디테일 영역 */}
                    <RideDetailList detailItems={detailItems}/>
                </Link>
            </StyledRideItem>
        );
    });

    if (lists.length === 0) {
        lists = <StyledEmptyList>개설된 라이드가 없습니다.</StyledEmptyList>;
    }

    return (
        <List ordered={false}>
            {lists}
        </List>
    );
});

RideLinkedList.propTypes ={
    rides: PropTypes.array
};

export default RideLinkedList;
