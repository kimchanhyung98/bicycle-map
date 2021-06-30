import request from "@/api/request";

const commentCreateUrl = '/api/comment';
const commentCreate = async ({...options}) => {
    try {
        const response = await request({
            method: 'post',
            url: commentCreateUrl,
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

const commentDelete = async ({id}) => {
    try {
        const url = `/api/comment/${id}`;
        const response = await request({
            method: 'delete',
            url: url
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
    commentCreate,
    commentDelete
};
