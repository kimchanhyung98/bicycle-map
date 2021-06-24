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
    } catch (err) {
        return {
            isError: true,
            ...err
        };
    }
};

export default request;
