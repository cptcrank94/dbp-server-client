import {
    REFRESH_TOKEN,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from "./type.js";
import AuthService from "../services/auth.service";
export const login = (username, password) => (dispatch) => {
    return AuthService.login(username, password).then(
        (data) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: { user: data },
            });
            return Promise.resolve();
        }, (error) => {
            dispatch({
                type: LOGIN_FAIL
            })
            return Promise.reject();
        }
    )
}

export const logout = () => (dispatch) => {
    AuthService.logout();
    dispatch({
        type: LOGOUT,
    });
}

export const refreshToken = (accessToken) => (dispatch) => {
    dispatch({
        type: REFRESH_TOKEN,
        payload: accessToken,
    });
}