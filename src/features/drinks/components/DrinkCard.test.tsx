import React from "react";
import { describe, it, expect, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { DrinkCard } from "./DrinkCard";
import { INITIAL_DRINKS } from "@/data/drinks";

describe("DrinkCard component", () => {
  const drink = INITIAL_DRINKS[0];

  it("renders drink name, category, ingredients, and benefit without badges or hashtags", () => {
    const html = renderToStaticMarkup(<DrinkCard drink={drink} />);
    expect(html).toContain(drink.name);
    expect(html).toContain(drink.categoryName);
    expect(html).toContain(drink.benefit);
    expect(html).toContain("Cần tây");

    // Tuyệt đối không hashtag, không badge
    expect(html).not.toContain("#");
    expect(html).not.toContain("badge");
    // Không giá tiền, không rating
    expect(html).not.toContain("đ");
    expect(html).not.toContain("VNĐ");
    expect(html).not.toContain("sao");
    expect(html).not.toContain("đánh giá");
  });

  it("contains link to detail page", () => {
    const html = renderToStaticMarkup(<DrinkCard drink={drink} />);
    expect(html).toContain(`/drinks/${drink.slug}`);
    expect(html).toContain("Xem chi tiết");
  });
});
