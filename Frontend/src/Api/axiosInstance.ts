import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { URL, USER_ENDPOINT } from "../Constants/Constants";

const BASE_URL = URL;

// Extend the InternalAxiosRequestConfig type
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

//creating instance of the axios to use globally

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// request interceptor to make chnages before sending request
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let refreshToken: string | null = null;

//response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as ExtendedAxiosRequestConfig;
    console.log("log axio", error);

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          const response = await axiosInstance.post(
            `${USER_ENDPOINT}/refresh-token`,
            { refreshToken }
          );
          localStorage.setItem("refreshToken", response.data.refreshToken);

          return axiosInstance(originalRequest);
        } else {
          return error.response;
        }
      } catch (refreshError) {
        // Redirect to login or handle authentication failure
        console.log(refreshError);
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }

    // If the error is due to invalid login credentials (401) and the request was not a retry
    if (error.response?.status === 401 && originalRequest._retry) {
      // Don't redirect, just reject the promise with the error
      return Promise.reject(error);
    }

    return error.response;
  }
);

export const setRefreshToken = (token: string) => {
  localStorage.setItem("refreshToken", token);
};

export default axiosInstance;
