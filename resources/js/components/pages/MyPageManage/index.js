import React, {memo, useCallback, useEffect, useState} from "react";
import RideButtonList from "@components/UI/organisms/RideButtonList";
import {rideDelete} from "@/api/rideApi";
import {getCreateList} from "@/api/rideListApi";

const MyPageManage = memo(() => {
    const [rides, setRides] = useState([]);
    const [page, setPage] = useState(1);
    const [isEnd, setIsEnd] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleScroll = useCallback(() => {
        if (!isLoading) {
            const scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
            const clientHeight = document.documentElement.clientHeight;
            const scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) - 50;

            if (scrollTop + clientHeight >= scrollHeight) {
                setPage(page + 1);
            }
        }
    }, [isLoading, page]);

    const handleRideDelete = useCallback(async (id) => {
        if (isEnd) return;
        setIsEnd(true);

        try {
            const response = await rideDelete({
                id: id
            });

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
        } finally {
            setIsEnd(false);
        }
    }, [isEnd, rides]);

    const getData = useCallback(async () => {
        setIsLoading(true);

        try {
            const options = {
                params: {
                    page: page
                }
            };
            const response = await getCreateList(options);

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
            alert('오류');
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
        if (page) {
            window.addEventListener('scroll', handleScroll);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [page, isLoading]);

    return (
        <RideButtonList type="manage"
                        rides={rides}
                        rideDelete={handleRideDelete}
                        emptyMessage="개설내역이 없습니다."/>
    );
});

export default MyPageManage;
