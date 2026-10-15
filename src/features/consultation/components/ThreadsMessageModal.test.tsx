import React from "react";
import { describe, it, expect, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { ThreadsMessageModal } from "./ThreadsMessageModal";

describe("ThreadsMessageModal", () => {
  it("does not render when isOpen is false", () => {
    const html = renderToStaticMarkup(
      <ThreadsMessageModal
        isOpen={false}
        onClose={vi.fn()}
        planTitle="Combo detox 3 ngày"
        goalsSummary="nhẹ bụng"
      />,
    );
    expect(html).toBe("");
  });

  it("renders correctly with 5 variants when isOpen is true", () => {
    const html = renderToStaticMarkup(
      <ThreadsMessageModal
        isOpen={true}
        onClose={vi.fn()}
        name="Hà"
        heightCm={162}
        weightKg={51}
        planTitle="Combo detox 3 ngày"
        goalsSummary="nhẹ bụng, thanh lọc"
        allergies={["cần tây"]}
      />,
    );

    expect(html).toContain('role="dialog"');
    expect(html).toContain("Soạn tin nhắn gửi shop");
    expect(html).toContain("Khẩu vị &amp; Đổi món");
    expect(html).toContain("Khung giờ giao sáng");
    expect(html).toContain("Chế độ ăn kèm");
    expect(html).toContain("Người mới bắt đầu");
    expect(html).toContain("Đặt lịch &amp; Phí ship");
    expect(html).toContain("Sao chép tin nhắn");
    expect(html).toContain("Mở threads gửi ngay");
    expect(html).toContain("Kèm thông số thể trạng (162cm / 51kg)");
  });

  it("omits the metrics checkbox if height and weight are not provided", () => {
    const html = renderToStaticMarkup(
      <ThreadsMessageModal
        isOpen={true}
        onClose={vi.fn()}
        name="Hà"
        planTitle="Combo detox 3 ngày"
        goalsSummary="nhẹ bụng"
      />,
    );

    expect(html).not.toContain("Kèm thông số thể trạng");
  });
});
