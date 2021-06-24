import request from "@/api/request";

const gerReverseGeocodeUrl = '/api/reverse-geocode';

const getReverseGeocode = async ({...options}) => {
    try {
        const response = await request({
            method: 'get',
            url: gerReverseGeocodeUrl,
            ...options
        });
        const {isError} = response;

        if (!isError) {
            return {
                success: true,
                data: response
            };
        } else {
            throw response.response.data;
        }
    } catch (err) {
        return {
            success: false,
            data: err
        };
    }
};

export {
    getReverseGeocode
};
