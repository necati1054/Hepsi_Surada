import axios from "axios";
import jwt_decode from "jwt-decode";
import jwt from "./token"
const API_URL = "http://localhost:8000/api/auth/";

const register = (item) => {
    return axios.post(API_URL+ "register",item)
    .then((response) => response.data)
    .then((response) => {console.log(response)})
}

const login = (item) => {
    console.log(item);
    return axios.post(API_URL+"login",item)
    .then((response) => response.data)
    .then((response) => {
        const decoded = jwt_decode(response.token.access_token);
        const user = {...response.token, user:decoded.user[0]};
        if(response.token.access_token){
            localStorage.setItem("token",JSON.stringify(user))
        }
        return response;
    })
}

const logout = () => {
    localStorage.removeItem("token");
    return axios.post(API_URL+"logout",{Headers:jwt})
};

const AuthServices = {
    register,
    login,
    logout
}

export default AuthServices;