import React, {memo, useCallback, useEffect, useState} from "react";
import styled from "styled-components";
import RideAttendEntry from "@components/UI/organisms/RideAttendEntry";
import {getAttendEntry} from "@/api/rideAttendApi";

const StyledSection = styled.section`
    margin-top: 20px;
`;

const MyPageAttendEntry = memo(({...props}) => {
    const id = props.match.params.id;
    const [rideName, setRideName] = useState('');
    const [entry, setEntry] = useState([]);

    const getData = useCallback(async () => {
        try {
            const options = {
                id: id
            };
            const response = await getAttendEntry(options);
            const {success} = response;

            if (success) {
                const {ride_name, entry: entryData} = response.data;
                setRideName(ride_name);
                setEntry(entryData);
            } else {
                throw response;
            }
        } catch (err) {
            const {message} = err.data;
            alert(message);
        }
    }, [id]);

    useEffect(() => {
        getData();
    }, []);

    return (
        <StyledSection>
            <RideAttendEntry caption={`${rideName} 참여자 정보`}
                             entryData={entry}/>
        </StyledSection>
    );
});

export default MyPageAttendEntry;
