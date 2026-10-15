"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useConsultation } from "../context";
import { routes } from "@/config/routes";

export type GuardTargetStep = "body" | "goals" | "experience" | "safety" | "result";

export function useStepGuard(target: GuardTargetStep) {
  const router = useRouter();
  const { body, goals, experience, safety, ineligibleReason } = useConsultation();

  const isAllowed = (() => {
    if (ineligibleReason && target !== "body") return false;
    if (target === "body") return true;
    if (target === "goals") return Boolean(body);
    if (target === "experience") return Boolean(body && goals.length > 0);
    if (target === "safety") return Boolean(body && goals.length > 0 && experience);
    if (target === "result") return Boolean(body && goals.length > 0 && experience && safety);
    return false;
  })();

  useEffect(() => {
    if (ineligibleReason && target !== "body") {
      router.replace(routes.consultationIneligible());
      return;
    }

    if (target === "goals" && !body) {
      router.replace(routes.consultation());
      return;
    }

    if (target === "experience" && (!body || goals.length === 0)) {
      router.replace(body ? routes.consultationGoals() : routes.consultation());
      return;
    }

    if (target === "safety" && (!body || goals.length === 0 || !experience)) {
      router.replace(
        !body
          ? routes.consultation()
          : goals.length === 0
            ? routes.consultationGoals()
            : routes.consultationExperience()
      );
      return;
    }

    // Lưu ý: Không tự ý redirect âm thầm khi vào /consultation/result mà thiếu dữ liệu.
    // ResultView sẽ tự hiển thị thông báo phiên làm mới (privacy-friendly) và cung cấp nút tư vấn lại.
  }, [target, body, goals, experience, safety, ineligibleReason, router]);

  return { isAllowed };
}
