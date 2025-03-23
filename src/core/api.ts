"use server";

import axios, { AxiosRequestConfig } from "axios";
import { EndPointEnum } from "./endpoint.enum";

const API_BASE_URL = process.env.API_URL ?? "http://localhost:8080";

/**
 * Axios instance with default config
 */
const apiInstance = axios.create({
  baseURL: API_BASE_URL,
});

/**
 * Interceptor for requests (e.g., adding headers)
 */
apiInstance.interceptors.request.use(async (config) => {
  try {
    /**
     * Add authentication token or any other request modification here
     */
  } catch (error) {
    console.error(`Request interceptor error: ${error}`);
  }
  return config;
});

/**
 * Interceptor for handling API response errors
 */
apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error); // ✅ Forward the error for handling in catch blocks
  }
);

/**
 * Function to check if data is FormData
 */
function isFormData(data: any): boolean {
  return data instanceof FormData;
}

/**
 * Generic GET request
 */
export async function apiGet(
  url: string | EndPointEnum,
  {
    params,
    config,
  }: { params?: Record<string, any>; config?: AxiosRequestConfig } = {}
) {
  try {
    const response = await apiInstance.get(url, { ...config, params });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Unexpected GET request error" }; // ✅ Prevents undefined error
  }
}

/**
 * Generic POST request
 */
export async function apiPost(
  url: string | EndPointEnum,
  {
    data,
    params,
    config,
  }: {
    data?: any;
    params?: Record<string, any>;
    config?: AxiosRequestConfig;
  } = {}
) {
  try {
    const headers = isFormData(data)
      ? { "Content-Type": "multipart/form-data" }
      : {};
    const response = await apiInstance.post(url, data, {
      ...config,
      params,
      headers,
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Unexpected POST request error" };
  }
}

/**
 * Generic PUT request
 */
export async function apiPut(
  url: string | EndPointEnum,
  {
    data,
    params,
    config,
  }: {
    data?: any;
    params?: Record<string, any>;
    config?: AxiosRequestConfig;
  } = {}
) {
  try {
    const headers = isFormData(data)
      ? { "Content-Type": "multipart/form-data" }
      : {};

    const response = await apiInstance.put(url, data, {
      ...config,
      params,
      headers,
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Unexpected PUT request error" };
  }
}

/**
 * Generic DELETE request
 */
export async function apiDelete(
  url: string | EndPointEnum,
  {
    data,
    params,
    config,
  }: {
    data?: any;
    params?: Record<string, any>;
    config?: AxiosRequestConfig;
  } = {}
) {
  try {
    const headers = isFormData(data)
      ? { "Content-Type": "multipart/form-data" }
      : {};
    const response = await apiInstance.delete(url, {
      ...config,
      params,
      data,
      headers,
    });
    return response.data;
  } catch (error: any) {
    throw (
      error.response?.data || { message: "Unexpected DELETE request error" }
    );
  }
}
