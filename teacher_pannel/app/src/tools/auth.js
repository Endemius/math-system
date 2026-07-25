import axios from "axios";
import {API_URL} from "../configuration";
import cookie from "./cookie";

export const authenticate = (email, password) => {
    axios({
        method: 'POST',
        url: `${API_URL}/login`,
        headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin":"*"
        },
        data: {
            login: email,
            password:password
        }
    }).then(response => {
        const jwt = response.headers.jwt;
        cookie.set("jwt", jwt, {path: "/"});
        window.location.reload();
    }).catch(error => {
        console.log(error);
        return false;
    });
}

export const register = (email, password) => {
    return axios({
        method: 'POST',
        url: `${API_URL}/register`,
        data: {
            'email': email,
            'password': password
        }
    }).then(response => {
        return true;
    }).catch(error => {
        return false;
    });
};

export const logout = () => {
    cookie.delete("jwt");
    window.location.reload();
};