import React, {memo, useCallback, useEffect, useState} from "react";
import styled from "styled-components";
import axios from "axios";
import {connect} from "react-redux";
import PageTemplate from "@components/templates/PageTemplate";
import Header from "@components/UI/organisms/Header";
import Aside from "@components/UI/organisms/Aside";
import RideButtonList from "@components/UI/organisms/RideButtonList";
import Heading from "@components/UI/atoms/Heading";
import font from "@/constant/font";

const StyledHeading = styled(Heading)`
    margin-top: 10px;
    font-weight: bold;
    font-size: ${font.sizeLarge};
`;

const mapStateToProps = (state) => ({
    state
});

const AccountAttend = memo(() => {
    const [rides, setRides] = useState([]);
    const [page, setPage] = useState(0);
    const [isEnd, setIsEnd] = useState(false);
    const [isLoading] = useState(false);

    const handleScroll = useCallback((event) => {
        if (isEnd) {
            const scrollPosition = event.srcElement.scrollingElement.scrollTop + window.innerHeight;

            if (scrollPosition >= document.body.offsetHeight) {
                getData();
            }
        }
    }, [isEnd]);

    const handleRideCancel = useCallback((id) => {
        if (isLoading) return false;

        setIsEnd(true);

        axios.post('/api/ride/cancel', {
            ride_id: id
        }).then(res => {
            const newData = [...rides].filter(ride => {
                return ride.id !== id;
            });

            setRides(newData);
            alert(res.data.message);
        }).catch(() => {
            alert('오류');
        });
    }, [isLoading, rides]);

    const getData = useCallback(() => {
        setPage(prevPage => prevPage + 1);
        setIsEnd(false);

        axios.get(`/api/account/attend?page=${page}`).then(res => {
            const data = res.data.rides.data;
            const newData = rides.concat(data);

            if (data.length < 10) {
                window.removeEventListener('scroll', handleScroll);
            }

            setRides(newData);
            setIsEnd(true);
        }).catch(err => {
            console.log(err);
        });
    }, [page, rides]);

    useEffect(() => {
        getData();
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', this.handleScroll);
        };
    }, []);

    return (
        <PageTemplate Header={Header}
                      Aside={Aside}>
            <section>
                <StyledHeading level={2}>신청내역</StyledHeading>
                <RideButtonList type={'attend'}
                                rides={rides}
                                rideCancel={handleRideCancel}
                                emptyMessage="신청내역이 없습니다."/>
            </section>
        </PageTemplate>
    );
});

export default connect(mapStateToProps)(AccountAttend);
