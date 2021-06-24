import request from "@/api/request";

const getUserStatusUrl = '/api/user';
const getUserStatus = async () => {
    try {
        const response = await request({
            method: 'get',
            url: getUserStatusUrl
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

const registerApiUrl = '/api/register';
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

const userEditApiUrl = '/api/account';
const userEditApi = async ({...options}) => {
    try {
        const response = await request({
            method: 'put',
            url: userEditApiUrl,
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

const logoutApiUrl = '/api/user/logout';
const logoutApi = async () => {
    try {
        const response = await request({
            method: 'post',
            url: logoutApiUrl
        });

        if (!response.isAxiosError) {
            const {data} = response;

            return {
                success: true,
                data: data
            };
        } else {
            throw response;
        }
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
    registerApi,
    userEditApi,
    logoutApi
};
