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
            dispatch(loginRequest(res));
        }).catch(err => {
            dispatch(loginFailure());
        });
    }
};

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
