import request from "@/api/request";

const rideCreateUrl = '/api/ride/store';

const getRideData = async ({id}) => {
    const url = `/api/ride/${id}`;

    try {
        const response = await request({
            method: 'get',
            url: url
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

const getRideEditData = async ({id}) => {
    const url = `/api/ride/edit/${id}`;

    try {
        const response = await request({
            method: 'get',
            url: url
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

const rideCreate = async ({...options}) => {
    try {
        const response = await request({
            method: 'post',
            url: rideCreateUrl,
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

const rideUpdate = async ({...options}) => {
    const id = options.data.id;
    const url = `/api/ride/${id}`;

    try {
        const response = await request({
            method: 'put',
            url: url,
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

const rideDelete = async ({...options}) => {
    const id = options.data.id;
    const url = `/api/ride/${id}`;

    try {
        const response = await request({
            method: 'delete',
            url: url,
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
    getRideData,
    getRideEditData,
    rideCreate,
    rideUpdate,
    rideDelete
};
