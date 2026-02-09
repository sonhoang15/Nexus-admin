import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError<any>) => {
    const status = error.response?.status || 500;

    switch (status) {
      case 401: {
        toast.error("401 Unauthorized, please login.");
        return Promise.reject(error.response?.data);
      }

      case 403: {
        toast.error("403 Forbidden - Không đủ quyền.");
        return Promise.reject(error.response?.data);
      }

      case 404: {
        toast.error("404 Not Found - Không tìm thấy API.");
        return Promise.reject(error.response?.data);
      }

      case 400:
      case 409:
      case 422: {
        return Promise.reject(error.response?.data);
      }

      default: {
        toast.error("Something went wrong!");
        return Promise.reject(error.response?.data || error);
      }
    }
  },
);

export default instance;
