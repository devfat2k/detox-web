"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useConsultationStore } from "../store";
import { routes } from "@/config/routes";

export type GuardTargetStep = 1 | 2 | 3 | 4 | "result";

export function useStepGuard(target: GuardTargetStep) {
  const router = useRouter();
  const { completedStep, isEligible } = useConsultationStore();

  const isAllowed = (() => {
    if (!isEligible && target !== 1) return false;
    if (target === 1) return true;
    if (target === 2) return completedStep >= 1;
    if (target === 3) return completedStep >= 2;
    if (target === 4) return completedStep >= 3;
    if (target === "result") return completedStep >= 4;
    return false;
  })();

  useEffect(() => {
    if (!isEligible && target !== 1) {
      router.replace(routes.consultationIneligible());
      return;
    }

    if (target === 2 && completedStep < 1) {
      router.replace(routes.consultation());
      return;
    }

    if (target === 3 && completedStep < 2) {
      router.replace(routes.consultationGoals());
      return;
    }

    if (target === 4 && completedStep < 3) {
      router.replace(routes.consultationExperience());
      return;
    }

    if (target === "result" && completedStep < 4) {
      router.replace(routes.consultationSafety());
      return;
    }
  }, [target, completedStep, isEligible, router]);

  return { isAllowed };
}
