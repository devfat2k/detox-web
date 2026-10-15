import { describe, it, expect } from "vitest";
import {
  buildAllergyClause,
  buildIdentityClause,
  buildThreadsMessage,
} from "./threads-message.utils";

describe("threads-message.utils", () => {
  describe("buildAllergyClause", () => {
    it("returns correct text when allergies are provided", () => {
      const result = buildAllergyClause(["cần tây", "gừng"]);
      expect(result).toBe("mình có dị ứng: cần tây, gừng");
    });

    it("returns default text when no allergies", () => {
      expect(buildAllergyClause([])).toBe("mình không có tiền sử dị ứng");
      expect(buildAllergyClause(null)).toBe("mình không có tiền sử dị ứng");
    });
  });

  describe("buildIdentityClause", () => {
    it("includes name and metrics when both are available and requested", () => {
      const result = buildIdentityClause("Lan", true, 160, 50);
      expect(result).toBe("mình là Lan (160cm / 50kg)");
    });

    it("omits metrics when includeMetrics is false", () => {
      const result = buildIdentityClause("Lan", false, 160, 50);
      expect(result).toBe("mình là Lan");
    });

    it("handles missing name with metrics", () => {
      const result = buildIdentityClause("", true, 160, 50);
      expect(result).toBe("mình (160cm / 50kg)");
    });

    it("handles missing name and metrics", () => {
      const result = buildIdentityClause("", false, 160, 50);
      expect(result).toBe("mình");
    });
  });

  describe("buildThreadsMessage", () => {
    const baseParams = {
      name: "Minh",
      heightCm: 165,
      weightKg: 58,
      planTitle: "Combo Detox 3 ngày",
      goalsSummary: "nhẹ bụng, giảm đầy hơi",
      allergies: ["cần tây"],
    };

    it("formats taste_adjustment variant with metrics", () => {
      const message = buildThreadsMessage({
        ...baseParams,
        variantId: "taste_adjustment",
        includeMetrics: true,
      });

      expect(message).toContain("mình là Minh (165cm / 58kg)");
      expect(message).toContain("Combo Detox 3 ngày");
      expect(message).toContain("nhẹ bụng, giảm đầy hơi");
      expect(message).toContain("mình có dị ứng: cần tây");
      expect(message).toContain(
        "Nếu có vị rau củ nào hơi khó uống thì quán có hỗ trợ đổi món nhẹ nhàng hơn không shop?",
      );
    });

    it("formats morning_delivery variant without metrics", () => {
      const message = buildThreadsMessage({
        ...baseParams,
        variantId: "morning_delivery",
        includeMetrics: false,
      });

      expect(message).toContain("mình là Minh");
      expect(message).not.toContain("165cm");
      expect(message).toContain(
        "Quán thường giao nước ép tươi vào khung giờ nào buổi sáng để mình sắp xếp nhận vậy ạ?",
      );
    });

    it("formats light_diet variant", () => {
      const message = buildThreadsMessage({
        ...baseParams,
        variantId: "light_diet",
        includeMetrics: true,
      });

      expect(message).toContain(
        "Trong những ngày theo lộ trình, mình có cần ăn nhẹ thêm gì để không bị mệt không shop?",
      );
    });

    it("formats beginner_guidance with metrics adapting question tail", () => {
      const withMetrics = buildThreadsMessage({
        ...baseParams,
        variantId: "beginner_guidance",
        includeMetrics: true,
      });
      expect(withMetrics).toContain(
        "Nhờ shop xem thể trạng mình như vậy có cần lưu ý gì trong ngày đầu tiên không nhé!",
      );

      const withoutMetrics = buildThreadsMessage({
        ...baseParams,
        variantId: "beginner_guidance",
        includeMetrics: false,
      });
      expect(withoutMetrics).toContain(
        "Vì mới bắt đầu nên nhờ shop tư vấn xem mình có cần lưu ý gì trong ngày đầu tiên không nhé!",
      );
    });

    it("formats schedule_shipping variant", () => {
      const message = buildThreadsMessage({
        ...baseParams,
        variantId: "schedule_shipping",
        includeMetrics: true,
      });

      expect(message).toContain(
        "Shop kiểm tra giúp mình có thể bắt đầu giao từ ngày gần nhất nào và phí ship khu vực mình nhé!",
      );
    });
  });
});
