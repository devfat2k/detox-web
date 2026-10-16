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

  it("renders correctly with consultation summary and variants when isOpen is true", () => {
    const html = renderToStaticMarkup(
      <ThreadsMessageModal
        isOpen={true}
        onClose={vi.fn()}
        name="Hà"
        heightCm={162}
        weightKg={51}
        bmi={19.4}
        planTitle="Combo detox 3 ngày"
        durationDays={3}
        totalBottles={15}
        goalsSummary="nhẹ bụng, thanh lọc"
        allergies={["cần tây"]}
      />,
    );

    expect(html).toContain('role="dialog"');
    expect(html).toContain("Soạn tin nhắn gửi shop");
    expect(html).toContain("Tóm tắt tư vấn của bạn");
    expect(html).toContain("Combo detox 3 ngày (3 ngày · 15 chai)");
    expect(html).toContain("162cm · 51kg (BMI: 19.4)");
    expect(html).toContain("nhẹ bụng, thanh lọc");
    expect(html).toContain("cần tây");
    expect(html).toContain("Giảm cân &amp; Vòng eo");
    expect(html).toContain("Có được ăn thêm không");
    expect(html).toContain("Khung giờ &amp; Phí ship");
    expect(html).toContain("Dạ dày &amp; Xót ruột");
    expect(html).toContain("Bảo quản tại công ty");
    expect(html).toContain("Sao chép tin nhắn");
    expect(html).toContain("Mở threads gửi ngay");
    expect(html).toContain("Kèm thông số thể trạng (162cm / 51kg) vào nội dung tin nhắn");
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
