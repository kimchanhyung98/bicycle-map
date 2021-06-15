import {combineReducers} from "redux";
import {LOGIN_NON, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE} from "@/actions/user";

const defaultState = {
    isLoggedIn: false,
    fetchingUpdate: false,
    info: {}
};

const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case LOGIN_NON:
            return {
                ...state,
                fetchingUpdate: false,
                isLoggedIn: false,
                info: {},
            };
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
                info: action.user,
            };
        case LOGIN_FAILURE:
            return {
                ...state
            };
        default:
            return state;
    }
};

export default combineReducers({
    user: userReducer
});
