import React, {memo, useCallback, useEffect, useState} from "react";
import PageTemplate from "@components/templates/PageTemplate";
import RideLinkedList from "@components/UI/organisms/RideLinkedList";

import {getList} from "@/api/rideListApi";

const Home = memo(() => {
    const [rides, setRides] = useState([]);
    const [page, setPage] = useState(0);
    const [isEnd, setIsEnd] = useState(false);

    const handleScroll = useCallback((event) => {
        if (isEnd) {
            let scrollPosition = event.srcElement.scrollingElement.scrollTop + window.innerHeight;

            if (scrollPosition >= document.body.offsetHeight) {
                this.getData();
            }
        }
    }, []);

    const getData = useCallback(async () => {
        setIsEnd(false);

        try {
            const options = {
                params: {
                    page: page + 1
                }
            };
            const response = await getList(options);

            if (response.success) {
                const data = response.data.rides.data;
                const newData = rides.concat(data);

                if (data.length < 10) {
                    window.removeEventListener('scroll', handleScroll);
                }

                setRides(newData);
                setPage((prevPage) => prevPage + 1);
                setIsEnd(true);
            } else {
                throw response;
            }
        } catch (err) {
            alert('오류');
            setIsEnd(true);
        }
    }, []);

    useEffect(() => {
        getData();
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <PageTemplate>
            <section>
                <RideLinkedList rides={rides} />
            </section>
        </PageTemplate>
    );
});

export default Home;
