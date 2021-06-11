import React, {memo, useCallback, useEffect, useState} from "react";
import styled from "styled-components";
import axios from "axios";
import {connect} from "react-redux";
import PageTemplate from "@components/templates/PageTemplate";
import Header from "@components/UI/organisms/Header";
import Aside from "@components/UI/organisms/Aside";
import Map from "@components/UI/atoms/Map";
import RideContent from "@components/UI/organisms/RideContent";

const StyledMainSection = styled.section`
    overflow: hidden;
    padding-bottom: 30px;
`;

const mapStateToProps = (state) => ({
    state
});

const RideDetail = memo(({...props}) => {
    const [rideData, setRideData] = useState({
        user: {}
    });
    const [participantsCount, setParticipantsCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const id = props.match.params.id;
    const user = props.state.user;

    const getRideData = useCallback(() => {
        axios.get(`/api/ride/${id}`).then(({data}) => {
            const {ride, participants_count} = data;
            setRideData({
                ...ride
            });
            setParticipantsCount(participants_count);
        }).catch(err => {
            console.log(err);
        });
    }, [id]);

    const handleSubmit = useCallback((event) => {
        event.preventDefault();

        if (isLoading) return false;

        const user_id = user.user.id;
        const data = {
            user_id: user_id,
            ride_id: id
        };
        setIsLoading(true);
        axios.post('/api/ride/attend', data).then(res => {
            setParticipantsCount(prevCount => prevCount + 1);
            alert(res.data.message);
        }).catch(err => {
            alert('오류');
        });
    }, [isLoading, participantsCount]);

    useEffect(() => {
        getRideData();
    }, []);

    return (
        <PageTemplate Header={Header}
                      Aside={Aside}>
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

    )
});

export default connect(mapStateToProps)(RideDetail);
