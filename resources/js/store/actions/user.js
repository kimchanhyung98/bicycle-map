import storage from '@/utils/storage.js';

export const LOGIN_NON = 'LOGIN_NON';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const login = (email, password) => {
    return (dispatch) => {
        dispatch(loginRequest());

        return axios.post('/api/login', {
            email,
            password
        }).then(res => {
            if (res.data.status_code === 200) {
                storage.set('loggedToken', res.data);
                axios.defaults.headers.common.Authorization = `Bearer ${res.data.access_token}`;
                dispatch(saveLoggedInfo());
            } else {
                storage.set('loggedToken', '');
                alert('이메일 또는 비밀번호를 확인해주세요.')
            }
        }).catch(err => {
            if (err.response.status == 422) {
                const messages = err.response.data.errors;
                alert(messages[Object.keys(messages)[0]]);
            } else {
                alert('오류');
            }
            dispatch(loginFailure());
        });
    }
};

export const saveLoggedToken = (user) => {
    return (dispatch) => {
        axios.defaults.headers.common.Authorization = `Bearer ${user.access_token}`;
        dispatch(saveLoggedInfo());
    }
}

export const saveLoggedInfo = () => {
    return (dispatch) => {
        axios.get('/api/status/user').then(res => {
            storage.set('loggedInfo', res.data);
            dispatch(loginSuccess(res.data));
        });
    }
}

export const logout = () => {
    return (dispatch) => {
        storage.set('loggedToken', '');
        dispatch(loginNon());
    }
}

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

export function loginSuccess(user) {
    return {
        type: LOGIN_SUCCESS,
        user
    };
}

export function loginFailure() {
    return {
        type: LOGIN_FAILURE
    };
}
