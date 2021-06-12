import request from "@/api/request";

const getListUrl = '/api/ride';
const getCreateListUrl = '/api/account/manage';

const getList = async ({...options}) => {
    try {
        const response = await request({
            method: 'get',
            url: getListUrl,
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

const getCreateList = async ({...options}) => {
    try {
        const response = await request({
            method: 'get',
            url: getCreateListUrl,
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
    getList,
    getCreateList
};
