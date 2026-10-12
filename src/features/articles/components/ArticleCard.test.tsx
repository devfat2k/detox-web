import React from "react";
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { ArticleCard } from "./ArticleCard";
import { ARTICLES_DATA } from "@/data/articles";

describe("ArticleCard component", () => {
  const article = ARTICLES_DATA[0];

  it("renders article title, category, reading time, excerpt, and sources count", () => {
    const html = renderToStaticMarkup(<ArticleCard article={article} />);
    expect(html).toContain(article.title);
    expect(html).toContain(article.categoryName);
    expect(html).toContain(article.readingTime);
    expect(html).toContain(article.excerpt);
    expect(html).toContain("2 nguồn kiểm chứng");
  });

  it("does not render badges or hashtags", () => {
    const html = renderToStaticMarkup(<ArticleCard article={article} />);
    expect(html).not.toContain("badge");
    expect(html).not.toContain("#");
  });

  it("contains clean link to detail route with ArrowRight icon", () => {
    const html = renderToStaticMarkup(<ArticleCard article={article} />);
    expect(html).toContain(`/articles/${article.slug}`);
    expect(html).toContain("Đọc tiếp");
  });
});
