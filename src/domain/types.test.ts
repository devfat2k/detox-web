import { describe, it, expect } from "vitest";
import type { SurveyStatus } from "./types";

describe("Domain types", () => {
  it("defines SurveyStatus union types correctly", () => {
    const status: SurveyStatus = "idle";
    expect(["idle", "in_progress", "completed"]).toContain(status);
  });
});
