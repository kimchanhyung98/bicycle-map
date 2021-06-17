import React, {memo} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import DatePicker from "react-date-picker";
import SelectBox from "@components/UI/atoms/SelectBox";
import font from "@/constant/font";
import color from "@/constant/color";

const Wrapper = styled.div`
    .react-date-picker {
        width: 180px;
        margin: 8px 12px 0 0;
    }

    .react-date-picker__wrapper {
        padding: 0 10px;
        border: 1px solid ${color.borderColor};
        border-radius: 4px;
        font-size: ${font.sizeBase};
        line-height: 40px;
        color: ${font.color};

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
    width: calc(100% - 192px);
    height: 40px;
    border: 1px solid ${color.borderColor};
    border-radius: 4px;
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

DateTimePicker.propTypes = {
    datePickerProps: PropTypes.object.isRequired,
    timePickerProps: PropTypes.object.isRequired
};

export default DateTimePicker;
