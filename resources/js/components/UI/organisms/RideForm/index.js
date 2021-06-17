import React, {memo, useCallback} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import LabelInput from "@components/UI/molecules/LabelInput";
import FormGroup from "@components/UI/molecules/FormGroup";
import DateTimePicker from "@components/UI/molecules/DateTimePicker";
import FileUpload from "@components/UI/molecules/FileUpload";
import Map from "@components/UI/atoms/Map";
import Input from "@components/UI/atoms/Input";
import SelectBox from "@components/UI/atoms/SelectBox";
import color from "@/constant/color";
import {timeOptions, difficultyOptions, altitudeOptions} from "@/utils/option";

const dateFormat = 'y-MM-dd';

const AddressInput = styled(Input)`
    margin-bottom: 12px;
`;

const StyledFullSelectBox = styled(SelectBox)`
    width: 100%;
    height: 45px;
    margin-top: 8px;
`;

const StyledAltitudeGroup = styled.div`
    overflow: hidden;
    margin-top: 8px;

    select {
        float: left;
        width: 135px;
        height: 45px;
        margin-right: 10px;
    }

    input {
        float: left;
        width: calc(100% - 145px);
        height: 45px;
        line-height: 20px;
    }
`;

const ButtonWrapper = styled.div`
    overflow: hidden;
    margin-top: 24px;
`;

const StyledSubmitInput = styled(Input)`
    display: block;
    margin: 0 auto;
    border: 0;
    background: ${color.pageColor};
    line-height: 40px;
    color: ${color.white};
    cursor: pointer;
`;

const RideForm = memo(({
    formType,
    rideData,
    setRideData,
    setFile,
    setLocation,
    onSubmit
}) => {
    const {
        name,
        description,
        start_date,
        start_time,
        end_date,
        end_time,
        address,
        address_detail,
        latitude,
        longitude,
        file,
        difficulty,
        capacity,
        distance,
        altitude,
        altitude_detail
    } = rideData;

    const handleSetRideData = useCallback((event) => {
        const {name, value} = event.target;

        setRideData((prevRideData) => {
            return {
                ...prevRideData,
                [name]: value
            };
        });
    }, [rideData]);

    const handleSetStartDate = useCallback((value) => {
        setRideData((prevRideData) => {
            return {
                ...prevRideData,
                start_date: value
            };
        });
    }, [rideData]);

    const handleSetEndDate = useCallback((value) => {
        setRideData((prevRideData) => {
            return {
                ...prevRideData,
                end_date: value
            };
        });
    }, [rideData]);

    return (
        <form onSubmit={onSubmit}>
            <LabelInput isRequired={true}
                        labelProps={{
                            children: '제목'
                        }}
                        inputProps={{
                            type: 'text',
                            name: 'name',
                            defaultValue: name,
                            placeholder: '내용을 입력해주세요',
                            onChange: handleSetRideData
                        }}/>

            <LabelInput isRequired={true}
                        labelProps={{
                            children: '설명'
                        }}
                        inputProps={{
                            type: 'textarea',
                            name: 'description',
                            defaultValue: description,
                            placeholder: '내용을 입력해주세요',
                            onChange: handleSetRideData
                        }}/>

            <FormGroup isRequired={true}
                       labelProps={{
                           children: '시작 시간'
                       }}>
                <DateTimePicker
                    datePickerProps={{
                        format: dateFormat,
                        value: start_date,
                        onChange: handleSetStartDate
                    }}
                    timePickerProps={{
                        name: 'start_time',
                        value: start_time,
                        onChange: handleSetRideData,
                        children: timeOptions
                    }}/>
            </FormGroup>

            <FormGroup isRequired={true}
                       labelProps={{
                           children: '종료 시간'
                       }}>
                <DateTimePicker
                    datePickerProps={{
                        format: dateFormat,
                        value: end_date,
                        onChange: handleSetEndDate
                    }}
                    timePickerProps={{
                        name: 'end_time',
                        value: end_time,
                        onChange: handleSetRideData,
                        children: timeOptions
                    }}/>
            </FormGroup>

            <FormGroup isRequired={true}
                       labelProps={{
                           children: '장소'
                       }}>
                <AddressInput type="text"
                              name="address"
                              defaultValue={address}
                              placeholder="장소를 지도에 표시해주세요"
                              readOnly
                              onChange={handleSetRideData}/>

                <Map
                    mapOptions={{
                        center: {
                            lat: latitude,
                            lng: longitude
                        },
                        zoom: 13,
                        onClick: setLocation
                    }}
                    markers={[{
                        lat: latitude,
                        lng: longitude
                    }]}/>

                <Input type="text"
                       name="address_detail"
                       defaultValue={address_detail}
                       placeholder="상세 장소를 입력해주세요"
                       onChange={handleSetRideData}/>
            </FormGroup>

            <FormGroup isRequired={true}
                       labelProps={{
                           children: '코스'
                       }}>
                <FileUpload url={'/api/upload/gpx'}
                            file={file}
                            placeholder={"GPX 파일을 업로드해주세요"}
                            setFile={setFile}/>
            </FormGroup>

            <FormGroup isRequired={true}
                       labelProps={{
                           children: '난이도'
                       }}>
                <StyledFullSelectBox name="difficulty"
                                     defaultValue={difficulty}
                                     onChange={handleSetRideData}
                                     children={difficultyOptions}/>
            </FormGroup>

            <LabelInput isRequired={true}
                        labelProps={{
                            children: '정원'
                        }}
                        inputProps={{
                            type: 'number',
                            name: 'capacity',
                            defaultValue: capacity,
                            placeholder: '3~30 사이 숫자만 입력해 주세요',
                            onChange: handleSetRideData
                        }}/>

            <LabelInput isRequired={true}
                        labelProps={{
                            children: '거리'
                        }}
                        inputProps={{
                            type: 'number',
                            name: 'distance',
                            defaultValue: distance,
                            placeholder: '숫자만 입력해 주세요',
                            onChange: handleSetRideData
                        }}/>

            <FormGroup isRequired={true}
                       labelProps={{
                           children: '고도'
                       }}>
                <StyledAltitudeGroup>
                    <SelectBox name="altitude"
                               defaultValue={altitude}
                               children={altitudeOptions}
                               onChange={handleSetRideData}/>

                    <Input type="number"
                           name="altitude_detail"
                           defaultValue={altitude_detail}
                           placeholder="숫자만 입력해 주세요"
                           onChange={handleSetRideData}/>
                </StyledAltitudeGroup>
            </FormGroup>

            <ButtonWrapper>
                <StyledSubmitInput type="submit"
                                   value={formType === 'create' ? '코스 만들기' : '코스 수정'}/>
            </ButtonWrapper>
        </form>
    );
});

RideForm.propTypes = {
    formType: PropTypes.string,
    rideData: PropTypes.object.isRequired,
    setRideData: PropTypes.func.isRequired,
    setFile: PropTypes.func.isRequired,
    setLocation: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default RideForm;
