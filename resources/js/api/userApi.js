import request from "@/api/request";

const getUserStatusUrl = '/api/status/user';
const getUserStatus = async () => {
    try {
        const response = await request({
            method: 'get',
            url: getUserStatusUrl
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

const loginApiUrl = '/api/login';
const loginApi = async ({...options}) => {
    try {
        const response = await request({
            method: 'post',
            url: loginApiUrl,
            ...options
        });
        const {data} = response;

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

const registerApiUrl = '/login';
const registerApi = async ({...options}) => {
    try {
        const response = await request({
            method: 'post',
            url: registerApiUrl,
            ...options
        });

        return {
            success: true,
            data: response
        };
    } catch (err) {
        return {
            success: false,
            data: err
        };
    }
};

export {
    getUserStatus,
    loginApi,
    registerApi
};
