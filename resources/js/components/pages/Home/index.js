import React, {memo, useCallback, useEffect, useState} from "react";
import axios from "axios";
import PageTemplate from "@components/templates/PageTemplate";
import Header from "@components/UI/organisms/Header";
import Aside from "@components/UI/organisms/Aside";
import RideLinkedList from "@components/UI/organisms/RideLinkedList";

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

    const getData = useCallback(() => {
        setIsEnd(false, () => {
            axios.get(`/api/ride?page=${page + 1}`).then(res => {
                const resData = res.data.rides.data;
                const data = rides.concat(resData);

                if (resData.length < 10) {
                    window.removeEventListener('scroll', this.handleScroll);
                }

                setRides(data);
                setPage((prevPage) => prevPage + 1);
                setIsEnd(true);
            }).catch(err => {
                console.log(err);
            });
        });
    }, []);

    useEffect(() => {
        getData();
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <PageTemplate Header={Header}
                      Aside={Aside}>
            <section>
                <RideLinkedList rides={rides} />
            </section>
        </PageTemplate>
    );
});

export default Home;
