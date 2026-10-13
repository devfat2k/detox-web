import { describe, it, expect } from "vitest";
import { DRINKS_DATA, DRINK_CATEGORIES, INITIAL_DRINKS } from "./drinks";

describe("drinks data", () => {
  it("contains valid categories matching shop menu", () => {
    expect(DRINK_CATEGORIES).toHaveLength(4);
    const categoryIds = DRINK_CATEGORIES.map((c) => c.id);
    expect(categoryIds).toEqual(["all", "smoothie_green", "juice", "nut_milk_tea"]);
  });

  it("exports INITIAL_DRINKS matching DRINKS_DATA with active items", () => {
    expect(INITIAL_DRINKS.length).toBeGreaterThanOrEqual(6);
    expect(DRINKS_DATA).toEqual(INITIAL_DRINKS);
  });

  it("ensures each drink has valid attributes, unique slugs, and positive level", () => {
    const slugs = new Set<string>();

    for (const drink of DRINKS_DATA) {
      expect(drink.id).toBeTruthy();
      expect(drink.slug).toBeTruthy();
      expect(slugs.has(drink.slug)).toBe(false);
      slugs.add(drink.slug);

      expect(drink.name).toBeTruthy();
      expect(drink.categoryName).toBeTruthy();
      expect(["smoothie_green", "juice", "nut_milk_tea"]).toContain(drink.category);
      expect(drink.description).toBeTruthy();
      expect(drink.ingredients.length).toBeGreaterThan(1);
      expect(drink.benefit).toBeTruthy();
      expect(["green", "warm", "soft"]).toContain(drink.color);
      expect(drink.level).toBeGreaterThanOrEqual(40);
      expect(drink.level).toBeLessThanOrEqual(100);
    }
  });

  it("contains core detox items (smoothie green, juice, nut milk)", () => {
    const hasSmoothie = DRINKS_DATA.some((d) => d.category === "smoothie_green");
    const hasJuice = DRINKS_DATA.some((d) => d.category === "juice");
    const hasNutMilkOrTea = DRINKS_DATA.some((d) => d.category === "nut_milk_tea");

    expect(hasSmoothie).toBe(true);
    expect(hasJuice).toBe(true);
    expect(hasNutMilkOrTea).toBe(true);
  });
});
