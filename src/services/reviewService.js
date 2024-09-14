import { BASE_URL } from "../Constants";
import axiosInstance from "../axiosInstance";

export const postReview = async (data, apiToken) => {
    return axiosInstance.post(`${BASE_URL}/api/reviews/create`, data, {
        headers: {
            "Authorization": `Bearer ${apiToken}`,
            "Content-Type": "application/json"
        }
    })
}

export const updateReview = async (data, apiToken) => {
    // not implemented on backend
    return axiosInstance.post(`${BASE_URL}/api/reviews/update`, data, {
        headers: {
            "Authorization": `Bearer ${apiToken}`,
            "Content-Type": "application/json"
        }
    })
}

export const getReviewByCyclePeriod = async (performanceCycle, cyclePeriod, apiToken) => {
    return axiosInstance.post(`${BASE_URL}/api/reviews/getreviewbycycleperiod`, {
        performanceCycle,
        cyclePeriod
    },
    {
        headers: {
            "Authorization": `Bearer ${apiToken}`,
            "Content-Type": "application/json"
        }
    })
}