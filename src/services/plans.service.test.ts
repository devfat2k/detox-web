import { describe, it, expect, vi, beforeEach } from "vitest";
import { getPlans, getPlanById } from "./plans.service";
import { apiClient } from "@/lib/api-client";
import { PLANS_DATA } from "@/data/plans";

describe("plans.service", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("fetches plans from API and maps correctly with full schedules", async () => {
    const mockApiPlans = [
      {
        id: "1-day",
        title: "Combo Detox 1 Ngày",
        duration_days: 1,
        total_bottles: 5,
        description: "Thanh lọc nhẹ nhàng 1 ngày",
        tagline: "Khởi đầu nhẹ nhàng",
      },
      {
        id: "3-day",
        title: "Combo Detox 3 Ngày",
        duration_days: 3,
        total_bottles: 15,
        description: "Lộ trình cân bằng 3 ngày",
        tagline: "3 ngày làm mới",
      },
      {
        id: "6-day",
        title: "Combo Detox 6 Ngày",
        duration_days: 6,
        total_bottles: 30,
        description: "Chu kỳ chuyên sâu 6 ngày",
        tagline: "Thanh lọc toàn diện",
      },
    ];

    vi.spyOn(apiClient, "get").mockResolvedValueOnce(mockApiPlans);

    const plans = await getPlans();
    expect(plans.length).toBe(3);
    expect(plans[0].id).toBe("1-day");
    expect(plans[0].title).toBe("Combo Detox 1 Ngày");
    expect(plans[0].durationDays).toBe(1);
    expect(plans[0].days).toBeDefined();
    expect(plans[0].days?.length).toBe(1);
    expect(plans[0].days?.[0].bottles.length).toBe(5);

    expect(plans[1].durationDays).toBe(3);
    expect(plans[1].days?.length).toBe(3);
  });

  it("falls back to empty PLANS_DATA on API failure", async () => {
    vi.spyOn(apiClient, "get").mockRejectedValueOnce(new Error("API Timeout"));

    const plans = await getPlans();
    expect(plans).toHaveLength(0);
  });

  it("retrieves a single plan by id with full details", async () => {
    const mockApiPlans = [
      {
        id: "3-day",
        title: "Combo Detox 3 Ngày",
        duration_days: 3,
        total_bottles: 15,
        description: "Lộ trình cân bằng 3 ngày",
      },
    ];

    vi.spyOn(apiClient, "get").mockResolvedValueOnce(mockApiPlans);

    const plan = await getPlanById("3-day");
    expect(plan).not.toBeNull();
    expect(plan?.id).toBe("3-day");
    expect(plan?.durationDays).toBe(3);
    expect(plan?.days?.length).toBe(3);
  });

  it("falls back to default plan when id is invalid or not found", async () => {
    vi.spyOn(apiClient, "get").mockRejectedValueOnce(new Error("Network Error"));

    const plan = await getPlanById("non-existent-plan");
    expect(plan).toBeNull();
  });
});
