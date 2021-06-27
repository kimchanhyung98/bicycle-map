import axios from "axios";

const request = async (options) => {
    try {
        const response = await axios(options);
        const {statusText} = response;

        if (statusText === 'OK') {
            return {
                isError: false,
                ...response.data
            };
        } else {
            throw response;
        }
    } catch ({...err}) {
        const message = err.response.data.message;
        return {
            isError: true,
            message: message,
            ...err
        };
    }
};

export default request;
