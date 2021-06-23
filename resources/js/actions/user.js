import storage from "@/utils/storage";
import {loginApi, logoutApi, getUserStatus} from "@/api/userApi";

export const LOGIN_NON = 'LOGIN_NON';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const login = (email, password) => {
    return async (dispatch) => {
        dispatch(loginRequest());

        try {
            const options = {
                data: {
                    email,
                    password
                }
            };
            const response = await loginApi(options);

            if (response.success) {
                const {data} = response;

                if (data) {
                    const {token_type, access_token} = data;
                    storage.set('loggedToken', data);
                    axios.defaults.headers.common.Authorization = `${token_type} ${access_token}`;
                    dispatch(saveLoggedInfo());
                } else {
                    storage.set('loggedToken', '');
                    storage.set('loggedInfo', '');
                    alert('이메일 또는 비밀번호를 확인해주세요.');
                }
            } else {
                throw response;
            }

        } catch (err) {
            alert('오류');
        }
    };
};

export const saveLoggedToken = (user) => {
    return (dispatch) => {
        axios.defaults.headers.common.Authorization = `Bearer ${user.access_token}`;
        dispatch(saveLoggedInfo());
    };
};

export const saveLoggedInfo = () => {
    return async (dispatch) => {
        try {
            const response = await getUserStatus();
            const {success} = response;

            if (success) {
                const {data} = response;
                storage.set('loggedInfo', data);
                dispatch(loginSuccess(data));
            } else {
                throw response;
            }
        } catch (err) {
            console.log(err);
        }
    };
};

export const logout = () => {
    return async (dispatch) => {
        try {
            const response = await logoutApi();

            if (response.success) {
                storage.set('loggedToken', '');
                storage.set('loggedInfo', '');
                dispatch(loginNon());
            } else {
                throw response;
            }

        } catch (err) {
            alert('오류');
        }
    };
};

export function loginNon() {
    return {
        type: LOGIN_NON
    };
}

export function loginRequest() {
    return {
        type: LOGIN_REQUEST
    };
}

export function loginSuccess(info) {
    return {
        type: LOGIN_SUCCESS,
        info
    };
}

export function loginFailure() {
    return {
        type: LOGIN_FAILURE
    };
}
