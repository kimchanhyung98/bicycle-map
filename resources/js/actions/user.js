import storage from '@/lib/storage.js';

export const LOGIN = 'LOGIN';
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
            }
        }).catch(err => {
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
