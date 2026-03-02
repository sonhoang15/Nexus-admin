import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { API_BASE } from "@/utils/productHelpers";
import { toast } from "react-toastify";

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const instance = axios.create({
  baseURL: API_BASE,
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
  (response: AxiosResponse) => response,

  async (error: AxiosError<any>) => {
    const originalRequest: any = error.config;
    const status = error.response?.status;

    if (status === 401 && !originalRequest._retry) {
      const authStr = localStorage.getItem("auth");
      if (!authStr) {
        window.location.href = "/login";
        return Promise.reject(error);
      }

      const auth = JSON.parse(authStr);

      if (!auth?.refreshToken) {
        window.location.href = "/login";
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return instance(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await axios.post(`${API_BASE}/api/auth/refresh`, {
          refreshToken: auth.refreshToken,
        });

        const newAccessToken = res.data.data.accessToken;

        const newAuth = {
          ...auth,
          accessToken: newAccessToken,
        };

        localStorage.setItem("auth", JSON.stringify(newAuth));

        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return instance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem("auth");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    const backendMessage = error.response?.data?.message;
    if (backendMessage) {
      toast.error(backendMessage);
    }

    return Promise.reject(error);
  },
);
export default instance;
