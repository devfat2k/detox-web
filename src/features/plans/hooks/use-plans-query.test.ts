// @vitest-environment jsdom
import { describe, it, expect, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePlansQuery, usePlanDetailQuery, planQueryKeys } from "./use-plans-query";
import * as plansService from "@/services/plans.service";
import { PLANS_DATA } from "@/data/plans";

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return function QueryWrapper({ children }: { children: React.ReactNode }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
  };
}

describe("use-plans-query", () => {
  it("defines standard query keys", () => {
    expect(planQueryKeys.all).toEqual(["plans"]);
    expect(planQueryKeys.lists()).toEqual(["plans", "list"]);
    expect(planQueryKeys.detail("1-day")).toEqual(["plans", "detail", "1-day"]);
  });

  const mockPlan = {
    id: "1-day" as const,
    title: "Combo Detox 1 Ngày",
    durationDays: 1,
    totalBottles: 5,
    kcalRange: "850 – 950 kcal/ngày",
    description: "Mô tả 1 ngày",
    tagline: "Tagline 1 ngày",
    suitableFor: [],
    notSuitableFor: [],
    preparationGuide: "",
    recoveryGuide: "",
    days: [],
  };
  const mockPlans = [mockPlan];

  it("fetches plans with usePlansQuery and returns initial data", async () => {
    vi.spyOn(plansService, "getPlans").mockResolvedValueOnce(mockPlans);

    const { result } = renderHook(() => usePlansQuery(), {
      wrapper: createWrapper(),
    });

    // Initial data matches PLANS_DATA
    expect(result.current.data).toEqual(PLANS_DATA);

    await waitFor(() => {
      expect(result.current.data).toEqual(mockPlans);
    });
  });

  it("fetches single plan with usePlanDetailQuery", async () => {
    const mockPlan = mockPlans[0];
    vi.spyOn(plansService, "getPlanById").mockResolvedValueOnce(mockPlan);

    const { result } = renderHook(() => usePlanDetailQuery("1-day"), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data?.id).toBe("1-day");
  });
});
