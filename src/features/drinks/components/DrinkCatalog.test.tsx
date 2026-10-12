import React from "react";
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { DrinkCatalog } from "./DrinkCatalog";
import { FIXED_LABELS } from "@/config/copy";

describe("DrinkCatalog component", () => {
  it("renders catalog header with fixed label and category filters", () => {
    const html = renderToStaticMarkup(<DrinkCatalog />);
    expect(html).toContain(FIXED_LABELS.PAGE_DRINKS_TITLE);
    expect(html).toContain("Thực đơn nước ép tươi mỗi ngày");
    expect(html).toContain("Tất cả");
    expect(html).toContain("Nước ép xanh");
    expect(html).toContain("Củ quả tươi");
  });

  it("renders initial drinks in grid without price or ratings or CRUD buttons", () => {
    const html = renderToStaticMarkup(<DrinkCatalog />);
    expect(html).toContain("Xanh Tươi Cần Tây Táo");
    expect(html).toContain("Cam Cà Rốt Ấm Nồng");
    expect(html).not.toContain("đ");
    expect(html).not.toContain("VNĐ");
    expect(html).not.toContain("Thêm món mẫu");
    expect(html).not.toContain("Xóa");
    expect(html).not.toContain("Sửa");
  });

  it("renders pagination controls cleanly", () => {
    const html = renderToStaticMarkup(<DrinkCatalog />);
    expect(html).toContain("Trang 1 / 2");
    expect(html).toContain("Tổng cộng 4 món");
  });
});
