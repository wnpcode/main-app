// utils/axiosInstance.js
import axios from "axios";
import { getSessionStorage } from "./asyncStorage";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Replace with your API URL
  timeout: 10000, // Optional timeout
});

// Axios interceptor to catch responses and errors
export const setUpAxiosInterceptors = (toastRef = null, opRef = null) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      opRef?.current?.toggle({ target: "" });
      if (sessionStorage.getItem("token")) {
        config.headers["Authorization"] = `${sessionStorage.getItem("token")}`;
      }
      return config;
    },
    (error) => {
      toastRef.current.show({
        severity: "error",
        summary: "Request Error",
        detail: error.message,
        life: 3000,
      });
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      opRef?.current?.hide();
      return response;
    },
    (error) => {
      toastRef.current.show({
        severity: "error",
        summary: "Error",
        detail: error.response?.data?.message || error.message,
        life: 4000,
      });
      opRef?.current?.hide();
      return Promise.reject(error);
    }
  );
};

export default axiosInstance;
