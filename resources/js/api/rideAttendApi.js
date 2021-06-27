import request from "@/api/request";

const getAttendRidesUrl = '/api/account/attend';

const getAttendRides = async ({...options}) => {
    try {
        const response = await request({
            method: 'get',
            url: getAttendRidesUrl,
            ...options
        });
        const {isError} = response;

        if (!isError) {
            const {data} = response.rides;
            return {
                success: true,
                data: data
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

const rideAttendUrl = '/api/ride/attend';
const rideAttend = async ({...options}) => {
    try {
        const response = await request({
            method: 'post',
            url: rideAttendUrl,
            ...options,
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

const rideCancelUrl = '/api/ride/cancel';
const rideAttendCancel = async ({...options}) => {
    try {
        const response = await request({
            method: 'post',
            url: rideCancelUrl,
            ...options,
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

const getAttendStatusUrl = '/api/user/participation';
const getAttendStatus = async ({...options}) => {
    try {
        const response = await request({
            method: 'get',
            url: getAttendStatusUrl,
            ...options,
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
    getAttendRides,
    rideAttend,
    rideAttendCancel,
    getAttendStatus
};
