import React from "react";
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { ArticleDetail } from "./ArticleDetail";
import { ARTICLES_DATA } from "@/data/articles";
import { FIXED_LABELS } from "@/config/copy";

describe("ArticleDetail component", () => {
  const article = ARTICLES_DATA[0];

  it("renders article headline, sections, and Honest Science sources box", () => {
    const html = renderToStaticMarkup(<ArticleDetail article={article} />);
    expect(html).toContain(article.title);
    expect(html).toContain("Cơ thể con người tự làm sạch như thế nào?");
    expect(html).toContain("Nguồn tài liệu tham khảo &amp; Kiểm chứng khoa học");
    expect(html).toContain("Harvard Health Publishing");
    expect(html).toContain("Viện Dinh dưỡng Quốc gia Việt Nam");
    expect(html).not.toContain(FIXED_LABELS.UNDER_CONSTRUCTION_NOTICE);
  });

  it("provides back link and consultation CTA button", () => {
    const html = renderToStaticMarkup(<ArticleDetail article={article} />);
    expect(html).toContain('href="/articles"');
    expect(html).toContain('href="/consultation"');
    expect(html).toContain(FIXED_LABELS.CTA_CONSULTATION);
  });
});
