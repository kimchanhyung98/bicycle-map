import React, {memo, useCallback, useEffect, useState} from "react";
import axios from "axios";
import {connect} from "react-redux";
import PageTemplate from "@components/templates/PageTemplate";
import Header from "@components/UI/organisms/Header";
import Aside from "@components/UI/organisms/Aside";
import RideForm from "@components/UI/organisms/RideForm";
import {formatDate} from '@/utils/dateFormat';

const mapStateToProps = (state) => ({
    state
});

const formType = 'create';

const RideCreate = memo(({...props}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [rideData, setRideData] = useState({
        file: {
            name: ''
        },
        file_id: '',
        name: '',
        description: '',
        started_at: '',
        ended_at: '',
        start_date: '',
        start_time: '',
        end_date: '',
        end_time: '',
        address: '',
        address_detail: '',
        locality: '',
        sublocality1: '',
        sublocality2: '',
        latitude: '37.554722',
        longitude: '126.970833',
        difficulty: 'beginner',
        capacity: '',
        distance: '',
        altitude: 'flat',
        altitude_detail: ''
    });

    const handleSetFile = useCallback(({...file}) => {
        const newRideData = {
            file: file,
            file_id: file.id
        };

        setRideData(prevRideData => {
            return {
                ...prevRideData,
                ...newRideData
            }
        });
    }, [rideData]);

    const handleSetLocation = useCallback((latitude, longitude) => {
        const lnglat = `${longitude},${latitude}`;

        axios.get(`/api/reverse-geocode?lnglat=${lnglat}`).then(res => {
            const data = res.data.results[0].region;
            const {area1, area2, area3} = data;
            const newRideData = {
                latitude: latitude,
                longitude: longitude,
                address: `${area1.name} ${area2.name} ${area3.name}`,
                locality: area1.name,
                sublocality1: area2.name,
                sublocality2: area3.name
            }

            setRideData(prevRideData => {
                return {
                    ...prevRideData,
                    ...newRideData
                }
            });
        }).catch(err => {
            console.log(err);
        });
    }, [rideData]);

    const handleSubmit = useCallback((event) => {
        event.preventDefault();

        if (isLoading) return false;
        const {start_date, start_time, end_date, end_time} = rideData;

        const started_at = formatDate(start_date, start_time);
        const ended_at = formatDate(end_date, end_time);

        const data = {
            ...rideData,
            started_at: started_at,
            ended_at: ended_at
        }

        setIsLoading(true);

        axios.post('/api/ride/store', data).then(res => {
            alert(res.data.message);
            props.history.push(`/ride/${res.data.ride_id}`);
        }).catch(err => {
            if (err.response.status == 422) {
                const messages = err.response.data.errors;
                alert(messages[Object.keys(messages)[0]]);
            } else {
                alert('오류');
            }

            setIsLoading(false);
        });
    }, [isLoading, rideData]);

    return (
        <PageTemplate Header={Header}
                      Aside={Aside}>
            <section>
                <RideForm formType={formType}
                          rideData={rideData}
                          onSubmit={handleSubmit}
                          setRideData={setRideData}
                          setFile={handleSetFile}
                          setLocation={handleSetLocation}/>
            </section>
        </PageTemplate>
    )
});

export default connect(mapStateToProps)(RideCreate);
