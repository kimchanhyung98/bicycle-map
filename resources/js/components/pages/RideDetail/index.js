import React, {memo, useCallback, useEffect, useState} from "react";
import styled from "styled-components";
import {connect} from "react-redux";
import PageTemplate from "@components/templates/PageTemplate";
import Map from "@components/UI/atoms/Map";
import RideContent from "@components/UI/organisms/RideContent";

import {getRideData} from "@/api/rideApi";
import {rideAttend} from "@/api/rideAttendApi";

const StyledMainSection = styled.section`
    overflow: hidden;
    padding-bottom: 30px;
`;

const mapStateToProps = (state) => {
    return {
        ...state
    };
};

const RideDetail = memo(({...props}) => {
    const [rideData, setRideData] = useState({
        user: {}
    });
    const [participantsCount, setParticipantsCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const id = props.match.params.id;
    const user = props.user;

    const getData = useCallback(async () => {
        try {
            const options = {
                id: id
            };
            const response = await getRideData(options);

            if (response.success) {
                const {ride, participants_count} = response;
                setRideData({
                    ...ride
                });
                setParticipantsCount(participants_count);
            } else {
                throw response;
            }
        } catch (err) {
            alert('오류');
        }
    }, [id]);

    const handleSubmit = useCallback(async (event) => {
        event.preventDefault();
        if (isLoading) return false;

        setIsLoading(true);
        try {
            const user_id = user.user.id;
            const options = {
                data: {
                    user_id: user_id,
                    ride_id: id
                }
            };
            const response = await rideAttend(options);

            if (response.success) {
                const {message} = response.data;
                setParticipantsCount(prevCount => prevCount + 1);
                alert(message);
                setIsLoading(false);
            } else {
                throw response;
            }
        } catch (err) {
            alert('오류');
            setIsLoading(false);
        }
    }, [isLoading, participantsCount]);

    useEffect(() => {
        getData();
    }, []);

    return (
        <PageTemplate>
            <section>
                <Map mapOptions={{
                    height: '360px',
                    disabled: true,
                    zoom: 14,
                    center: {
                        lat: rideData.latitude,
                        lng: rideData.longitude
                    },
                    markers: {
                        lat: rideData.latitude,
                        lng: rideData.longitude
                    }
                }}/>
            </section>

            <StyledMainSection>
                <RideContent rideData={rideData}
                             participantsCount={participantsCount}
                             onSubmit={handleSubmit}/>
            </StyledMainSection>
        </PageTemplate>
    );
});

export default connect(mapStateToProps)(RideDetail);
