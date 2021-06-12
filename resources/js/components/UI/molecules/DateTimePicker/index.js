import React, {memo} from "react";
import styled from "styled-components";
import DatePicker from "react-date-picker";
import SelectBox from "@components/UI/atoms/SelectBox";
import font from "@/constant/font";

const Wrapper = styled.div`
    .react-date-picker {
        margin: 8px 12px 0 0;
    }

    .react-date-picker__wrapper {
        padding: 0 10px;
        border: 1px solid ${font.borderColor};
        border-radius: 4px;
        font-size: ${font.sizeBase} !important;
        line-height: 40px;
        color: ${font.color} !important;

        input[type="number"] {
            width: auto;
            height: auto;
            margin: 0;
            padding: 0;
            border: 0;
        }
    }
`;

const StyledSelectBox = styled(SelectBox)`
    width: auto;
    height: 40px;
`;

const DateTimePicker = memo(({
    datePickerProps,
    timePickerProps
}) => {
    return (
        <Wrapper>
            <DatePicker {...datePickerProps} />
            <StyledSelectBox {...timePickerProps} />
        </Wrapper>
    );
});

export default DateTimePicker;
