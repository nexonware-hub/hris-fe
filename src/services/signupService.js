import { BASE_URL } from "../Constants";
import axiosInstance from "../axiosInstance";

const authEndpoint = "/api/auth";

export const signUp = async (email, password, companyId) => {
    return axiosInstance.post(`${BASE_URL}${authEndpoint}/signup`, {
        email,
        password,
        companyId
    })
};