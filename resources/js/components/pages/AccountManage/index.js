import React, {memo, useCallback, useEffect, useState} from "react";
import styled from "styled-components";
import PageTemplate from "@components/templates/PageTemplate";
import Header from "@components/UI/organisms/Header";
import RideButtonList from "@components/UI/organisms/RideButtonList";
import Heading from "@components/UI/atoms/Heading";
import font from "@/constant/font";

import {rideDelete} from "@/api/rideApi";
import {getCreateList} from "@/api/rideListApi";

const StyledHeading = styled(Heading)`
    margin-top: 10px;
    font-weight: bold;
    font-size: ${font.sizeLarge};
`;

const AccountManage = memo(() => {
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

    const handleRideDelete = useCallback(async (id) => {
        if (isLoading) return false;
        setIsEnd(true);

        try {
            const options = {
                data: {
                    ride_id: id
                }
            };
            const response = await rideDelete(options);

            if (response.success) {
                const newData = [...rides].filter(ride => {
                    return ride.id !== id;
                });
                const {message} = response.data;

                setRides(newData);
                alert(message);
            } else {
                throw response;
            }
        } catch (err) {
            alert('오류');
        }
    }, [isLoading, rides]);

    const getData = useCallback(async () => {
        setPage(prevPage => prevPage + 1);
        setIsEnd(false);

        try {
            const options = {
                params: {
                    page: page
                }
            };
            const response = await getCreateList(options);

            if (response.success) {
                const data = response.data.rides.data;
                const newData = rides.concat(data);

                if (data.length < 10) {
                    window.removeEventListener('scroll', handleScroll);
                }

                setRides(newData);
                setIsEnd(true);
            } else {
                throw response;
            }
        } catch (err) {
            alert('오류');
            setIsEnd(true);
        }
    }, [page, rides]);

    useEffect(() => {
        getData();
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <PageTemplate Header={Header}>
            <section>
                <StyledHeading level={2}>개설내역</StyledHeading>
                <RideButtonList type={'manage'}
                                rides={rides}
                                rideDelete={handleRideDelete}
                                emptyMessage="개설내역이 없습니다."/>
            </section>
        </PageTemplate>
    );
});

export default AccountManage;
