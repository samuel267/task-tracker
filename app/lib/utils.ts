import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { TaskResponse } from './definitions';

const baseURL: string = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000/api/'


// Define the base URL for your API
const axiosInstance = axios.create({
    baseURL, // Change this to your API's base URL
    headers: {
        'Content-Type': 'application/json',
        'Authorization': ''
    },
});

// Define a custom response type
// interface ApiResponse {
//     data: TaskResponse[];
//     message: string;
//     status: number;
// }

// Generic Axios utility function for API requests
export async function axiosPost<T>(url: string, payload: Omit<TaskResponse, 'id'>, config?: AxiosRequestConfig) {
    try {
        const response: AxiosResponse = await axiosInstance.post(url, payload, config);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'An error occurred during the POST request.');
    }
}

export async function axiosPut<T>(url: string, payload: Omit<TaskResponse, 'id'>, config?: AxiosRequestConfig) {
    try {
        const response: AxiosResponse = await axiosInstance.put(url, payload, config);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'An error occurred during the PUT request.');
    }
}



export async function axiosDelete<T>(url: string, config?: AxiosRequestConfig) {
    try {
        const response: AxiosResponse = await axiosInstance.delete(url, config);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'An error occurred during the DELETE request.');
    }
}

export async function axiosGet<T>(url: string, config?: AxiosRequestConfig) {
    try {
        const response: AxiosResponse = await axiosInstance.get(url, config);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'An error occurred during the GET request.');
    }
}
