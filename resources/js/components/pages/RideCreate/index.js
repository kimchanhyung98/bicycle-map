import React, {memo, useCallback, useState} from "react";
import {connect} from "react-redux";
import PageTemplate from "@components/templates/PageTemplate";
import Header from "@components/UI/organisms/Header";
import Aside from "@components/UI/organisms/Aside";
import RideForm from "@components/UI/organisms/RideForm";
import {formatDate} from '@/utils/dateFormat';

import {getReverseGeocode} from "@/api/mapApi";
import {rideCreate} from "@/api/rideApi";

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
            };
        });
    }, [rideData]);

    const handleSetLocation = useCallback(async (latitude, longitude) => {
        try {
            const lnglat = `${longitude},${latitude}`;
            const options = {
                params: {
                    lnglat: lnglat
                }
            };
            const response = await getReverseGeocode(options);

            if (response.success) {
                const data = response.data.results[0].region;
                const {area1, area2, area3} = data;
                const newRideData = {
                    latitude: latitude,
                    longitude: longitude,
                    address: `${area1.name} ${area2.name} ${area3.name}`,
                    locality: area1.name,
                    sublocality1: area2.name,
                    sublocality2: area3.name
                };

                setRideData(prevRideData => {
                    return {
                        ...prevRideData,
                        ...newRideData
                    };
                });
            } else {
                throw response;
            }
        } catch (err) {
            alert('오류');
        }
    }, [rideData]);

    const handleSubmit = useCallback(async (event) => {
        event.preventDefault();

        if (isLoading) return false;
        setIsLoading(true);

        try {
            const {start_date, start_time, end_date, end_time} = rideData;
            const started_at = formatDate(start_date, start_time);
            const ended_at = formatDate(end_date, end_time);
            const options = {
                data: {
                    ...rideData,
                    started_at: started_at,
                    ended_at: ended_at
                }
            };
            const response = await rideCreate(options);

            if (response.success) {
                const {ride_id, message} = response.data;
                alert(message);
                props.history.push(`/ride/${ride_id}`);
            } else {
                throw response;
            }

        } catch (err) {
            alert('오류');
            setIsLoading(false);
        }
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
    );
});

export default connect(mapStateToProps)(RideCreate);
