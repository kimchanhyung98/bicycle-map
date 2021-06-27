import React, {memo, useCallback, useState} from "react";
import PageTemplate from "@components/templates/PageTemplate";
import RideForm from "@components/UI/organisms/RideForm";
import {formatDate} from '@/utils/dateFormat';
import {getReverseGeocode} from "@/api/mapApi";
import {rideCreate} from "@/api/rideApi";

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
        start_time: '00:00',
        end_date: '',
        end_time: '00:00',
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

    const handleSetLocation = useCallback(async ({latlng}) => {
        const {x: lng, y: lat} = latlng;

        try {
            const lnglat = `${lng},${lat}`;
            const options = {
                params: {
                    lnglat: lnglat
                }
            };
            const response = await getReverseGeocode(options);
            const {success} = response;

            if (success) {
                const {area1, area2, area3} = response.data.results[0].region;
                const newRideData = {
                    latitude: lat,
                    longitude: lng,
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
            const {message} = err.data;
            alert(message);
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
            const {message} = err.data;
            alert(message);
            setIsLoading(false);
        }
    }, [isLoading, rideData]);

    return (
        <PageTemplate>
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

export default RideCreate;
