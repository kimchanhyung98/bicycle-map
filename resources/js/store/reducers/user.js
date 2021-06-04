import { combineReducers } from 'redux';
import { login, LOGIN_NON, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '@/store/actions/user.js';

const defaultState = {
    isLoggedIn: false,
    fetchingUpdate: false,
    user: {}
};

const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case LOGIN_NON:
            return {
                ...state,
                fetchingUpdate: false,
                isLoggedIn: false,
                user: {},
            }
        case LOGIN_REQUEST:
            return {
                ...state,
                fetchingUpdate: true
            };
        case LOGIN_SUCCESS:
        return {
                ...state,
                fetchingUpdate: false,
                isLoggedIn: true,
                user: action.user,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                fetchingUpdate: false
            };
        default:
            return state;
    }
};

export default combineReducers({
    user: userReducer
});
