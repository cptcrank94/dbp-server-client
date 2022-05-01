import http from "../http-common";
import TokenService from "./token.service";
class AuthService {
    login(username, password) {
        return http.post("/auth/login", { username, password }).then(response => {
            if (response.data.accessToken) {
                TokenService.setUser(response.data);
            }
            return response.data;
        });
    }

    refreshToken(refreshToken, accessToken) {
        return http.post("/auth/refresh-token", {refreshToken}, {
                headers: {
                    "x-access-token": refreshToken
                }
            })
            .then(response => {
                console.log(response);
            })
    }

    logout() {
        TokenService.removeUser();
    }
}

export default new AuthService();