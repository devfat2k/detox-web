import { describe, it, expect } from "vitest";
import { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import { apiClient } from "./api-client";

describe("apiClient", () => {
  it("unwraps standard ApiResponse envelope automatically", async () => {
    const mockData = { id: "123", name: "Sinh tố Cần Tây" };
    apiClient.defaults.adapter = async (config): Promise<AxiosResponse> => ({
      data: {
        success: true,
        statusCode: 200,
        message: "OK",
        data: mockData,
        timestamp: "2026-10-15T00:00:00Z",
        path: "/api/drinks",
      },
      status: 200,
      statusText: "OK",
      headers: {},
      config,
    });

    const result = await apiClient.get("/drinks");
    expect(result).toEqual(mockData);
  });

  it("extracts validation errors on 400", async () => {
    apiClient.defaults.adapter = async (config): Promise<AxiosResponse> => {
      const error = new AxiosError(
        "Request failed with status code 400",
        "ERR_BAD_REQUEST",
        config as InternalAxiosRequestConfig,
        {},
        {
          status: 400,
          statusText: "Bad Request",
          headers: {},
          config: config as InternalAxiosRequestConfig,
          data: {
            success: false,
            statusCode: 400,
            message: "Dữ liệu không hợp lệ",
            errors: ["Độ tuổi tối thiểu là 15"],
            timestamp: "2026-10-15T00:00:00Z",
            path: "/api/consultation",
          },
        }
      );
      throw error;
    };

    await expect(apiClient.post("/consultation", {})).rejects.toThrow("Độ tuổi tối thiểu là 15");
  });
});
