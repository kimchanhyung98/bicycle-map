import React, {memo} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import RideContentHeader from "@components/UI/molecules/RideContentHeader";
import RideContentGroup from "@components/UI/molecules/RideContentGroup";
import RideContentGroupItem from "@components/UI/molecules/RideContentGroupItem";
import Map from "@components/UI/atoms/Map";
import Heading from "@components/UI/atoms/Heading";
import Button from "@components/UI/atoms/Button";

import color from "@/constant/color";
import font from "@/constant/font";
import {formatDifficulty} from '@/utils/ride';

const StyledContentWrapper = styled.div`
    padding: 0 20px;
`;

const StyledHeading = styled(Heading)`
    overflow: hidden;
    max-height: 72px;
    font-weight: bold;
    font-size: 24px;
    line-height: 36px;
    color: ${color.pageColor};
`;

const StyledRideDescription = styled.p`
    font-size: ${font.sizeSmall};
    line-height: 16px;
    color: ${color.gray600};
`;

const StyledRideCapacity = styled(RideContentGroup)`
    div {
        float: left;
        margin-right: 12px;
    }

    div::before {
        float: right;
        width: 1px;
        height: 12px;
        margin: 1px 0 0 12px;
        background: ${color.gray};
        content: '';
    }

    div:last-child::before {
        display: none;
    }
`;

const RideCapacityDiv = styled.div`
    float: left;
    margin-right: 12px;

    &::before {
        float: right;
        width: 1px;
        height: 12px;
        margin: 1px 0 0 12px;
        background: ${color.gray};
        content: '';
    }

    &:last-child::before {
        display: none;
    }
`;

const DownloadButton = styled.a`
    display: block;
    width: 100%;
    height: 40px;
    margin: 10px auto 0;
    padding: 0 20px;
    background: ${color.pageColor};
    font-size: ${font.sizeBase};
    line-height: 40px;
    color: ${color.white};
    text-align: center;
    text-decoration: none;
    box-sizing: border-box;
`;

const ButtonWrapper = styled.div`
    margin-top: 24px;
`;

const StyledAttendButton = styled(Button)`
    display: block;
    width: auto;
    height: 40px;
    margin: 0 auto;
    padding: 0 20px;
    background: ${color.pageColor};
    font-size: ${font.sizeBase};
    line-height: 40px;
    color: ${color.white};
`;

const RideContent = memo(({rideData, participantsCount, isAttend, rideAttend}) => {
    const {
        host,
        difficulty,
        name,
        distance,
        altitude_detail,
        started_at,
        ended_at,
        address,
        address_detail,
        file,
        description,
        capacity
    } = rideData;

    return (
        <>
            <RideContentHeader>
                {formatDifficulty(difficulty)}
            </RideContentHeader>

            <StyledContentWrapper>
                <RideContentGroup>
                    <StyledHeading level={2}>{name}</StyledHeading>
                </RideContentGroup>

                <RideContentGroup type={'list'}>
                    <RideContentGroupItem title="개설자">
                        <p>{host}</p>
                    </RideContentGroupItem>
                </RideContentGroup>

                <RideContentGroup type={'list'}>
                    <RideContentGroupItem isEmpty={true}
                                          check={distance}
                                          title="거리">
                        <p>
                            {distance ?
                                `${distance}km` :
                                '미정'
                            }
                        </p>
                    </RideContentGroupItem>
                    <RideContentGroupItem isEmpty={true}
                                          check={altitude_detail}
                                          title="고도">
                        <p>
                            {altitude_detail && <span>{altitude_detail}m</span>}
                        </p>
                    </RideContentGroupItem>
                    <RideContentGroupItem title="시작시간">
                        <p>{started_at}</p>
                    </RideContentGroupItem>
                    <RideContentGroupItem isEmpty={true}
                                          check={ended_at}
                                          title="종료시간">
                        <p>{ended_at}</p>
                    </RideContentGroupItem>
                    <RideContentGroupItem title="장소">
                        <p>{address}</p>
                    </RideContentGroupItem>
                    <RideContentGroupItem isEmpty={true}
                                          check={address_detail}
                                          title="장소상세">
                        <p>{address_detail}</p>
                    </RideContentGroupItem>
                </RideContentGroup>

                {file &&
                <RideContentGroup>
                    <Map mapOptions={{
                        id: 'gpx-map',
                        width: '100%',
                        height: '360px',
                        disabled: true,
                        zoom: 14,
                        gpx: file
                    }}/>

                    <DownloadButton href={file.path}
                                    download>
                        GPX파일 다운로드
                    </DownloadButton>
                </RideContentGroup>
                }

                <RideContentGroup>
                    <StyledRideDescription>
                        {description}
                    </StyledRideDescription>
                </RideContentGroup>

                <StyledRideCapacity>
                    <RideCapacityDiv>정원 {capacity}명</RideCapacityDiv>
                    <RideCapacityDiv>현재 {participantsCount}명 참석</RideCapacityDiv>
                </StyledRideCapacity>
            </StyledContentWrapper>

            <ButtonWrapper>
                <StyledAttendButton type="button"
                                    onClick={rideAttend}>

                    {isAttend ?
                        '신청한 라이드 입니다' :
                        '참가하기'
                    }
                </StyledAttendButton>
            </ButtonWrapper>
        </>
    );
});

RideContent.propTypes = {
    rideData: PropTypes.object.isRequired,
    participantsCount: PropTypes.number.isRequired,
    isAttend: PropTypes.bool,
    rideAttend: PropTypes.func.isRequired
};

export default RideContent;
