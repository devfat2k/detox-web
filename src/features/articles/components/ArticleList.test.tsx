import React from "react";
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { ArticleList } from "./ArticleList";
import { ARTICLES_DATA } from "@/data/articles";
import { FIXED_LABELS } from "@/config/copy";

describe("ArticleList component", () => {
  it("renders header with kicker and micro-trust bar without construction notice", () => {
    const html = renderToStaticMarkup(<ArticleList articles={ARTICLES_DATA} />);
    expect(html).toContain(FIXED_LABELS.PAGE_ARTICLES_TITLE);
    expect(html).toContain("NGUỒN Y KHOA KIỂM CHỨNG");
    expect(html).toContain("KHÔNG QUẢNG CÁO BÁN HÀNG");
    expect(html).not.toContain(FIXED_LABELS.UNDER_CONSTRUCTION_NOTICE);
  });

  it("renders category filters and article cards", () => {
    const html = renderToStaticMarkup(<ArticleList articles={ARTICLES_DATA} />);
    expect(html).toContain("Tất cả");
    expect(html).toContain("Kiến thức");
    expect(html).toContain("Mẹo vặt");
    expect(html).toContain("Hiểu đúng về cơ chế tự thải độc của gan và thận");
  });
});
