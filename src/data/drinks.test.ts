import { describe, it, expect } from "vitest";
import { DRINKS_DATA, DRINK_CATEGORIES, INITIAL_DRINKS } from "./drinks";

describe("drinks data fallback", () => {
  it("contains valid categories matching shop menu", () => {
    expect(DRINK_CATEGORIES).toHaveLength(4);
    const categoryIds = DRINK_CATEGORIES.map((c) => c.id);
    expect(categoryIds).toEqual(["all", "smoothie_green", "juice", "nut_milk_tea"]);
  });

  it("exports single fallback mock item in INITIAL_DRINKS matching DRINKS_DATA", () => {
    expect(INITIAL_DRINKS).toHaveLength(1);
    expect(DRINKS_DATA).toEqual(INITIAL_DRINKS);
  });

  it("ensures fallback drink has valid attributes and positive level", () => {
    const drink = DRINKS_DATA[0];
    expect(drink.id).toBeTruthy();
    expect(drink.slug).toBe("sinh-to-xanh-healthy");
    expect(drink.name).toBeTruthy();
    expect(drink.category).toBe("smoothie_green");
    expect(drink.ingredients?.length).toBeGreaterThan(1);
    expect(drink.benefit).toBeTruthy();
    expect(drink.color).toBe("green");
    expect(drink.level).toBeGreaterThanOrEqual(40);
  });
});
