import { describe, it, expect } from "vitest";
import { ARTICLES_DATA, ARTICLE_CATEGORIES } from "./articles";

describe("Articles data", () => {
  it("contains exactly 2 curated sample articles", () => {
    expect(ARTICLES_DATA.length).toBe(2);
  });

  it("each article has valid sections and at least one cited medical source", () => {
    for (const article of ARTICLES_DATA) {
      expect(article.slug).toBeTruthy();
      expect(article.title).toBeTruthy();
      expect(article.sections.length).toBeGreaterThan(0);
      expect(article.sources.length).toBeGreaterThan(0);
      for (const source of article.sources) {
        expect(source.organization).toBeTruthy();
        expect(source.title).toBeTruthy();
      }
    }
  });

  it("does not contain false medical or detox cure claims", () => {
    const raw = JSON.stringify(ARTICLES_DATA);
    expect(raw).not.toContain("thải độc sâu");
    expect(raw).not.toContain("chữa bệnh");
    expect(raw).not.toContain("đốt mỡ");
    expect(raw).not.toContain("cam kết giảm");
  });

  it("defines 4 category filter items starting with 'all'", () => {
    expect(ARTICLE_CATEGORIES).toHaveLength(4);
    expect(ARTICLE_CATEGORIES[0].id).toBe("all");
  });
});
