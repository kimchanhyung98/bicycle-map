import React, {memo, useCallback} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Input from "@components/UI/atoms/Input";
import Label from "@components/UI/atoms/Label";
import color from "@/constant/color";
import request from "@/api/request";

const FileWrapper = styled.div`
    overflow: hidden;
    margin-top: 8px;
`;

const StyledTextInput = styled(Input)`
    float: left;
    width: calc(100% - 110px) !important;
    height: 45px;
    margin: 0 10px 0 0 !important;
`;

const StyledLabel = styled(Label)`
    float: left;
    width: 100px;
    height: 45px;
    background: ${color.pageColor};
    border-radius: 4px;
    line-height: 45px;
    color: ${color.white};
    text-align: center;
    box-sizing: border-box;
`;

const StyledFileInput = styled(Input)`
     display: none;
`;

const FileUpload = memo(({
    url,
    file,
    placeholder,
    setFile
}) => {
    const {name} = file;

    const handleSubmit = useCallback(async (event) => {
        const formData = new FormData();
        formData.append('file', event.target.files[0]);

        try {
            const options = {
                method: 'post',
                url: url,
                data: formData
            };
            const response = await request(options);
            const {isError} = response;

            if (!isError) {
                const {file, message} = response;
                setFile(file);
                alert(message);
            } else {
                throw response.response;
            }
        } catch (err) {
            const {statusText} = err;
            alert(statusText);
        }
    }, [setFile]);

    return (
        <FileWrapper>
            <StyledTextInput type="text"
                             value={name || ''}
                             placeholder={placeholder}
                             readOnly/>
            <StyledLabel htmlFor="file">업로드</StyledLabel>
            <StyledFileInput type="file"
                             id="file"
                             readOnly
                             onChange={handleSubmit}/>
        </FileWrapper>
    );
});

FileUpload.defaultProps = {
    file: {
        name: ''
    },
    placeholder: ''
};

FileUpload.propTypes = {
    url: PropTypes.string.isRequired,
    setFile: PropTypes.func.isRequired
};

export default FileUpload;
