import React from "react";
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { DrinkDetail } from "./DrinkDetail";
import { INITIAL_DRINKS } from "@/data/drinks";
import { FIXED_LABELS } from "@/config/copy";

describe("DrinkDetail component", () => {
  const drink = INITIAL_DRINKS[0];

  it("renders drink name, ingredients, nutritional values without construction notice", () => {
    const html = renderToStaticMarkup(<DrinkDetail drink={drink} />);
    expect(html).toContain(drink.name);
    expect(html).toContain(drink.categoryName);
    expect(html).toContain("Cần tây");
    expect(html).toContain("Giá trị dinh dưỡng &amp; Cảm nhận cơ thể");
    expect(html).not.toContain(FIXED_LABELS.UNDER_CONSTRUCTION_NOTICE);
  });

  it("does not render price, rating or false health claims", () => {
    const html = renderToStaticMarkup(<DrinkDetail drink={drink} />);
    expect(html).not.toContain("đ");
    expect(html).not.toContain("VNĐ");
    expect(html).not.toContain("thải độc sâu");
    expect(html).not.toContain("chữa bệnh");
  });

  it("provides back link and consultation CTA button", () => {
    const html = renderToStaticMarkup(<DrinkDetail drink={drink} />);
    expect(html).toContain('href="/drinks"');
    expect(html).toContain('href="/consultation"');
  });
});
