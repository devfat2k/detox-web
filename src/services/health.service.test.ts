import { describe, it, expect, vi } from "vitest";
import { checkApiHealth } from "./health.service";
import { apiClient } from "@/lib/api-client";

describe("health.service", () => {
  it("calls /health and returns backend status", async () => {
    const mockHealth = {
      status: "ok",
      info: {
        supabase: { status: "up" },
      },
    };

    vi.spyOn(apiClient, "get").mockResolvedValueOnce(mockHealth);

    const result = await checkApiHealth();
    expect(result.status).toBe("ok");
    expect(result.info?.supabase.status).toBe("up");
    expect(apiClient.get).toHaveBeenCalledWith("/health");
  });
});
