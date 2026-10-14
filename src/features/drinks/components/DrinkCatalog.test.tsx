import React from "react";
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DrinkCatalog } from "./DrinkCatalog";
import { FIXED_LABELS } from "@/config/copy";
import { DRINKS_DATA } from "@/data/drinks";

function renderWithClient(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  return renderToStaticMarkup(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}

describe("DrinkCatalog component", () => {
  it("renders catalog header with fixed label and category filters", () => {
    const html = renderWithClient(<DrinkCatalog />);
    expect(html).toContain(FIXED_LABELS.PAGE_DRINKS_TITLE);
    expect(html).toContain("Thực đơn nước ép tươi mỗi ngày");
    expect(html).toContain("Tất cả");
  });

  it("renders initial drinks in grid without price or ratings or CRUD buttons", () => {
    const html = renderWithClient(<DrinkCatalog />);
    expect(html).toContain(DRINKS_DATA[0].name);
    expect(html).not.toMatch(/\d+\s*(đ|VNĐ)/);
    expect(html).not.toContain("VNĐ");
    expect(html).not.toContain("Thêm món mẫu");
    expect(html).not.toContain("Xóa");
    expect(html).not.toContain("Sửa");
  });
});
