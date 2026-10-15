import { describe, it, expect, vi, beforeEach } from "vitest";
import { getDrinks, getDrinkBySlug } from "./drinks.service";
import { apiClient } from "@/lib/api-client";

describe("drinks.service", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns mapped drinks when API responds successfully", async () => {
    const mockApiDrinks = [
      {
        id: "d1",
        name: "Nước Ép Cần Tây Táo",
        slug: "nuoc-ep-can-tay-tao",
        description: "Thanh lọc cơ thể",
        calories: 120,
        ingredients: ["Cần tây", "Táo xanh"],
        is_detox_core: true,
      },
    ];

    vi.spyOn(apiClient, "get").mockResolvedValueOnce(mockApiDrinks);

    const drinks = await getDrinks();
    expect(drinks.length).toBe(1);
    expect(drinks[0].slug).toBe("nuoc-ep-can-tay-tao");
    expect(drinks[0].color).toBe("green");
  });

  it("returns empty array without fallback when API fails or returns empty", async () => {
    vi.spyOn(apiClient, "get").mockRejectedValueOnce(new Error("Network Error"));

    const drinks = await getDrinks();
    expect(drinks).toEqual([]);
  });

  it("fetches single drink by slug from API", async () => {
    const mockApiDrink = {
      id: "d1",
      name: "Nước Ép Cần Tây Táo",
      slug: "nuoc-ep-can-tay-tao",
      description: "Thanh lọc cơ thể",
      calories: 120,
      ingredients: ["Cần tây", "Táo xanh"],
    };

    vi.spyOn(apiClient, "get").mockResolvedValueOnce(mockApiDrink);

    const drink = await getDrinkBySlug("nuoc-ep-can-tay-tao");
    expect(drink).not.toBeNull();
    expect(drink?.slug).toBe("nuoc-ep-can-tay-tao");
  });

  it("returns null when fetching single drink fails without fallback", async () => {
    vi.spyOn(apiClient, "get").mockRejectedValueOnce(new Error("Not Found"));

    const drink = await getDrinkBySlug("mon-khong-ton-tai");
    expect(drink).toBeNull();
  });
});
