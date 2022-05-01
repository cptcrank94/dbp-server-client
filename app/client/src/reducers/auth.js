import {
    REFRESH_TOKEN,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
} from "../actions/type";
const user = JSON.parse(localStorage.getItem("user"));
const initialState = user 
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };

function authReducer(auth = initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case LOGIN_SUCCESS:
            return {
                ...auth,
                isLoggedIn: true,
                user: payload.user
            };
        case LOGIN_FAIL:
            return {
                ...auth,
                isLoggedIn: false,
                user: null,
            };
        case LOGOUT:
            return {
                ...auth,
                isLoggedIn: false,
                user: null,
            }
        case REFRESH_TOKEN:
            return {
                ...auth,
                user: { ...user, accessToken: payload },
            };
        default:
            return auth;
    }
}

export default authReducer;