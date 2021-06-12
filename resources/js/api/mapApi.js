import request from "@/api/request";

const gerReverseGeocodeUrl = '/api/reverse-geocode';

const getReverseGeocode = async ({...options}) => {
    try {
        const response = await request({
            method: 'get',
            url: gerReverseGeocodeUrl,
            ...options
        });
        const data = response.data;

        return {
            success: true,
            data: data
        };
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
