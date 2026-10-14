import axios, { type AxiosError } from "axios";
import type { ApiResponse, ApiErrorResponse } from "@/types/api";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://detox-api-black.vercel.app/api";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (response) => {
    const body = response.data;
    if (body && typeof body === "object" && body.success === true && "data" in body) {
      return (body as ApiResponse<unknown>).data;
    }
    return body;
  },
  (error: AxiosError<ApiErrorResponse>) => {
    const errorData = error.response?.data;
    const message =
      errorData?.errors && errorData.errors.length > 0
        ? errorData.errors.join(", ")
        : errorData?.message || error.message || "Có lỗi kết nối, vui lòng thử lại";

    return Promise.reject(new Error(message));
  }
);
