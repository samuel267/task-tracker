import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { TaskResponse } from './definitions';

const baseURL: string = 'https://66e415aed2405277ed13009f.mockapi.io/api/'


// Define the base URL for your API
const axiosInstance = axios.create({
    baseURL, // Change this to your API's base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Define a custom response type
interface ApiResponse<T> {
    data: T;
    message: string;
    status: number;
}

// Generic Axios utility function for API requests
export async function axiosPost<T>(url: string, payload: Omit<TaskResponse, 'id'>, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
        const response: AxiosResponse<ApiResponse<T>> = await axiosInstance.post(url, payload, config);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'An error occurred during the POST request.');
    }
}

export async function axiosPut<T>(url: string, payload: T, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
        const response: AxiosResponse<ApiResponse<T>> = await axiosInstance.put(url, payload, config);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'An error occurred during the PUT request.');
    }
}

export async function axiosPatch<T>(url: string, payload: Partial<T>, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
        const response: AxiosResponse<ApiResponse<T>> = await axiosInstance.patch(url, payload, config);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'An error occurred during the PATCH request.');
    }
}

export async function axiosDelete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
        const response: AxiosResponse<ApiResponse<T>> = await axiosInstance.delete(url, config);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'An error occurred during the DELETE request.');
    }
}

export async function axiosGet<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
        const response: AxiosResponse<ApiResponse<T>> = await axiosInstance.get(url, config);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'An error occurred during the GET request.');
    }
}
