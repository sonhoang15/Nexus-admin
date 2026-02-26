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
    const authStr = localStorage.getItem("auth");

    if (authStr) {
      try {
        const auth = JSON.parse(authStr);
        if (auth?.accessToken) {
          config.headers.Authorization = `Bearer ${auth.accessToken}`;
        }
      } catch {
        localStorage.removeItem("auth");
      }
    }

    if (config.headers["Content-Type"] === "multipart/form-data") {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;
    if (res && typeof res === "object" && "success" in res && "data" in res) {
      return res.data;
    }
    return res;
  },
  (error: AxiosError<any>) => {
    const status = error.response?.status || 500;
    const message = error.response?.data?.message;

    switch (status) {
      case 401:
        toast.error("401 Unauthorized, please login.");
        break;
      case 403:
        toast.error("403 Forbidden - Không đủ quyền.");
        break;
      case 404:
        toast.error("404 Not Found - Không tìm thấy API.");
        break;
      case 400:
      case 409:
      case 422:
        break;
      default:
        toast.error(message || "Something went wrong!");
        break;
    }

    return Promise.reject(error.response?.data || error);
  },
);

export default instance;
