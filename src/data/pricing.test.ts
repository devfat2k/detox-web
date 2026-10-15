import { describe, it, expect } from "vitest";
import { PRICING_COMBOS, formatVndPrice, PRICING_FOOTNOTE } from "./pricing";

describe("pricing data", () => {
  it("defines exactly 3 combos matching the shop menu", () => {
    expect(PRICING_COMBOS).toHaveLength(3);
    expect(PRICING_COMBOS.map((c) => c.durationDays)).toEqual([1, 3, 6]);
  });

  it("calculates 5 bottles per day for each combo", () => {
    for (const combo of PRICING_COMBOS) {
      expect(combo.totalBottles).toBe(combo.durationDays * 5);
      expect(combo.unit).toBe(`${combo.totalBottles} chai`);
    }
  });

  it("sets correct prices according to menu image", () => {
    const [oneDay, threeDay, sixDay] = PRICING_COMBOS;
    expect(oneDay.price).toBe(195000);
    expect(threeDay.price).toBe(570000);
    expect(sixDay.price).toBe(999000);
    expect(sixDay.originalPrice).toBe(1110000);
  });

  it("formats Vietnamese currency with suffix 'đ'", () => {
    expect(formatVndPrice(195000)).toBe("195.000đ");
    expect(formatVndPrice(570000)).toBe("570.000đ");
    expect(formatVndPrice(999000)).toBe("999.000đ");
    expect(formatVndPrice(1110000)).toBe("1.110.000đ");
  });

  it("includes the 3-6 day recommendation footnote", () => {
    expect(PRICING_FOOTNOTE).toContain("3 – 6 ngày liên tục");
  });
});
