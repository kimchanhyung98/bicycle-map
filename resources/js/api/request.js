import axios from "axios";

const request = async (options) => {
    try {
        const response = await axios(options);

        console.log(response);

        return response;
    } catch (err) {
        return {
            ...err
        };
    }
};

export default request;
