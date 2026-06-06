import axios from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: (process.env.NEXT_API_BASE_URL || "https://api.sanakisan.magnus.com.np") + "/api",
  timeout: 60000,
  timeoutErrorMessage: "Server timed out...",
  headers: {
    "Content-Type": "application/json"
  }
});

// Request Interceptor
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("_at");
  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response Interceptor
axiosInstance.interceptors.response.use((response) => {
  return response.data;
}, (exception) => {
  if (exception.response) {
    const { status, data } = exception.response;
    if (status === 400 || status === 422) {
      throw { ...data, message: data.message || "Validation error", code: status };
    } else if (status === 401) {
      Cookies.remove("_at");
      throw { ...data, message: data.message || "Unauthorized", code: status };
    } else if (status === 403) {
      toast.error("You don't have permission to access this request");
      throw { ...data, message: data.message || "Forbidden", code: status };
    }
  }
  throw exception;
});

export default axiosInstance;
