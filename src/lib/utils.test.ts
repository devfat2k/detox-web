import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn utility", () => {
  it("joins multiple class strings with space", () => {
    expect(cn("bg-bg", "text-text", "p-4")).toBe("bg-bg text-text p-4");
  });

  it("filters out falsy values (false, null, undefined, empty string)", () => {
    expect(cn("base", false && "hidden", null, undefined, "", "active")).toBe(
      "base active"
    );
  });

  it("returns an empty string when no valid classes are provided", () => {
    expect(cn(false, null, undefined)).toBe("");
    expect(cn()).toBe("");
  });
});
