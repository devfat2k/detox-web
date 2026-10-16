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

    it("formats weight_loss variant with metrics", () => {
      const message = buildThreadsMessage({
        ...baseParams,
        variantId: "weight_loss",
        includeMetrics: true,
      });

      expect(message).toContain("mình là Minh (165cm / 58kg)");
      expect(message).toContain("Combo Detox 3 ngày");
      expect(message).toContain("nhẹ bụng, giảm đầy hơi");
      expect(message).toContain("mình có dị ứng: cần tây");
      expect(message).toContain(
        "Shop cho mình hỏi theo lộ trình này thì thông thường giảm được khoảng bao nhiêu cân và giảm bụng có rõ không ạ?",
      );
    });

    it("formats diet_and_hunger variant", () => {
      const message = buildThreadsMessage({
        ...baseParams,
        variantId: "diet_and_hunger",
        includeMetrics: true,
      });

      expect(message).toContain(
        "Trong những ngày detox mình có được ăn thêm gì không shop?",
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
        "Shop cho mình hỏi lộ trình này quán sẽ giao vào mấy giờ mỗi ngày và giao như thế nào để đảm bảo giữ lạnh vậy ạ? Chi phí ship đến khu vực của mình tính như thế nào shop nhỉ?",
      );
    });

    it("formats sensitive_stomach variant", () => {
      const message = buildThreadsMessage({
        ...baseParams,
        variantId: "sensitive_stomach",
        includeMetrics: true,
      });

      expect(message).toContain(
        "Dạ dày mình hơi nhạy cảm, dễ bị xót nếu uống đồ chua thì theo lộ trình này có an toàn và êm bụng không shop?",
      );
    });
  });
});
