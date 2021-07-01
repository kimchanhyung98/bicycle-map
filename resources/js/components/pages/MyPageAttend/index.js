import React, {memo, useCallback, useEffect, useState} from "react";
import RideButtonList from "@components/UI/organisms/RideButtonList";
import {getAttendRides, rideAttendCancel} from "@/api/rideAttendApi";
import {scrollPaging} from "@/utils/scroll";

const MyPageAttend = memo(() => {
    const [rides, setRides] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const handleRideCancel = useCallback(async ({event, id}) => {
        const {target} = event;
        if (target.disabled) return;
        target.disabled = true;

        try {
            const options = {
                data: {
                    ride_id: id
                }
            };
            const response = await rideAttendCancel(options);

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
            const {message} = err.data;
            alert(message);
        } finally {
            target.disabled = false;
        }
    }, [rides]);

    const getData = useCallback(async () => {
        setIsLoading(true);

        try {
            const options = {
                params: {
                    page: page
                }
            };
            const response = await getAttendRides(options);

            if (response.success) {
                const {data} = response;
                const newData = rides.concat(data);

                setRides(newData);

                if (data.length < 10) {
                    setPage(0);
                }
            } else {
                throw response;
            }
        } catch (err) {
            const {message} = err.data;
            alert(message);
        } finally {
            setIsLoading(false);
        }
    }, [page, rides]);

    useEffect(() => {
        if (page) {
            getData();
        }
    }, [page]);

    useEffect(() => {
        function handleScroll() {
            scrollPaging(isLoading, () => {
                setPage(page + 1);
            });
        }

        if (page) {
            window.addEventListener('scroll', handleScroll);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [page, isLoading]);

    return (
        <RideButtonList type="attend"
                        rides={rides}
                        rideCancel={handleRideCancel}
                        emptyMessage="신청내역이 없습니다."/>
    );
});

export default MyPageAttend;
