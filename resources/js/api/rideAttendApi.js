import request from "@/api/request";

const getAttendRidesUrl = '/api/account/attend';
const rideAttendUrl = '/api/ride/attend';
const rideCancelUrl = '/api/ride/cancel';

const getAttendRides = async ({...options}) => {
    try {
        const response = await request({
            method: 'get',
            url: getAttendRidesUrl,
            ...options
        });
        const data = response.data.rides.data;

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

const rideAttend = async ({...options}) => {
    try {
        const response = await request({
            method: 'post',
            url: rideAttendUrl,
            ...options,
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

const rideAttendCancel = async ({...options}) => {
    try {
        const response = await request({
            method: 'post',
            url: rideCancelUrl,
            ...options,
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
    getAttendRides,
    rideAttend,
    rideAttendCancel
};
