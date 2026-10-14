import { apiClient } from "@/lib/api-client";

export interface HealthCheckResponse {
  status: string;
  info?: Record<string, { status: string }>;
  details?: Record<string, { status: string }>;
}

export async function checkApiHealth(): Promise<HealthCheckResponse> {
  return apiClient.get<unknown, HealthCheckResponse>("/health");
}
