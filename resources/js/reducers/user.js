import { combineReducers } from 'redux';
import { AUTH_LOGIN, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE } from '@/actions/ActionTypes.js';

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case AUTH_LOGIN:
            return {
                ...state,
                login: {
                    status: 'WAITING'
                },
                status: {
                    isLoggedIn: false
                }
            };
        case AUTH_LOGIN_SUCCESS:
            return {
                ...state,
                login: {
                    status: 'SUCCESS'
                },
                status: {
                    ...state.status,
                    isLoggedIn: true,
                    currentUser: action.username
                }
            };
        case AUTH_LOGIN_FAILURE:
            return {
                ...state,
                login: {
                    status: 'FAILURE'
                },
                status: {
                    isLoggedIn: false
                }
            };
        default:
            return {
                login: {
                    status: 'default'
                },
                status: {
                    isLoggedIn: false
                }
            };
    }
};

export default combineReducers({
    user: userReducer
});
