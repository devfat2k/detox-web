// @vitest-environment jsdom
import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ResultView } from "./ResultView";
import { ConsultationProvider } from "../context";
import * as consultationService from "@/services/consultation.service";

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <ConsultationProvider>{children}</ConsultationProvider>
      </QueryClientProvider>
    );
  };
}

describe("ResultView component", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders analyzing loading state on initial mount", () => {
    vi.spyOn(consultationService, "submitConsultation").mockImplementation(
      () => new Promise(() => {})
    );

    render(<ResultView />, { wrapper: createWrapper() });

    expect(screen.getByText(/Đang phân tích thể trạng/i)).toBeDefined();
  });

  it("calls submitConsultation on mount and renders results", async () => {
    vi.spyOn(consultationService, "submitConsultation").mockResolvedValueOnce({
      bmi: 20.3,
      bmiCategory: "Thể trạng cân đối",
      dailyWaterMl: 2000,
      safetyAlerts: ["Lưu ý an toàn mẫu"],
      recommendedPlan: {
        id: "1-day",
        name: "Combo Detox 1 Ngày",
        duration_days: 1,
        total_bottles: 5,
        reason: "Phù hợp để làm quen thanh lọc.",
      },
      scheduleRatio: "3:1:1",
      drinks: [],
    });

    render(<ResultView />, { wrapper: createWrapper() });

    // Wait past analyzing state (2.2s timeout)
    await waitFor(
      () => {
        expect(
          screen.getByRole("heading", { name: /Lộ trình gợi ý dành cho/i })
        ).toBeDefined();
      },
      { timeout: 3500 }
    );

    expect(screen.getByText(/Phù hợp để làm quen thanh lọc/i)).toBeDefined();
  });
});
