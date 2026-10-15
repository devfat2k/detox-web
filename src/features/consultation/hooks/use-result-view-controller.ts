"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { useConsultation } from "../context";
import { useStepGuard } from "./use-step-guard";
import { useConsultationMutation } from "./use-consultation-mutation";
import { useDrinksQuery } from "@/features/drinks/hooks/use-drinks-query";
import { DRINKS_DATA } from "@/data/drinks";
import { SITE_CONFIG } from "@/config/site";
import { routes } from "@/config/routes";
import {
  computeResultViewModel,
  buildConsultationSummaryText,
  type ResultViewModel,
} from "../utils/result-view.utils";
import type { ConsultationResult } from "@/types/api";
import type { SafetyFormData } from "../schemas/consultation.schema";
import type { LinkButtonProps } from "@/components/ui";

export interface ResultViewState extends ResultViewModel {
  readonly isAllowed: boolean;
  readonly isPending: boolean;
  readonly isError: boolean;
  readonly errorMessage?: string;
  readonly copied: boolean;
  readonly isPricingModalOpen: boolean;
  readonly weightKg: number;
  readonly apiResult: ConsultationResult | null | undefined;
  readonly safety: SafetyFormData | null;
  readonly threadsUrl: LinkButtonProps["href"];
}

export interface ResultViewActions {
  readonly reset: () => void;
  readonly retrySubmit: () => void;
  readonly copySummary: () => Promise<void>;
  readonly setIsPricingModalOpen: (open: boolean) => void;
}

export function useResultViewController(): {
  readonly state: ResultViewState;
  readonly actions: ResultViewActions;
} {
  const { isAllowed } = useStepGuard("result");
  const {
    body,
    safety,
    experience,
    goals,
    warningMessage,
    reset,
    result,
    setResult,
  } = useConsultation();

  const [copied, setCopied] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const { data: drinks = DRINKS_DATA } = useDrinksQuery();
  const {
    mutate,
    data: mutateData,
    isPending,
    isError,
    error,
  } = useConsultationMutation();
  const router = useRouter();
  const hasSubmittedRef = useRef(false);

  const apiResult = result ?? mutateData;

  useEffect(() => {
    if (!isAllowed || !apiResult) return;
    const handlePopState = () => router.replace(routes.home());
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [router, isAllowed, apiResult]);

  useEffect(() => {
    if (!result && !hasSubmittedRef.current && body && safety && experience) {
      hasSubmittedRef.current = true;
      mutate(
        { body, safety, goals, experience },
        { onSuccess: (data) => setResult(data) },
      );
    }
  }, [mutate, body, safety, goals, experience, result, setResult]);

  const viewModel = useMemo(
    () =>
      computeResultViewModel({
        body,
        safety,
        experience,
        goals,
        warningMessage,
        apiResult,
        drinks,
      }),
    [body, safety, experience, goals, warningMessage, apiResult, drinks],
  );

  const copySummary = async () => {
    if (!viewModel.displayPlan) return;
    const summaryText = buildConsultationSummaryText({
      displayPlan: viewModel.displayPlan,
      capitalHonorific: viewModel.capitalHonorific,
      body,
      bmi: viewModel.bmi,
      apiResult,
      goalsSummary: viewModel.goalsSummary,
      safety,
    });

    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const retrySubmit = () => {
    if (body && safety && experience) {
      mutate(
        { body, safety, goals, experience },
        { onSuccess: (data) => setResult(data) },
      );
    }
  };

  return {
    state: {
      ...viewModel,
      isAllowed,
      isPending,
      isError,
      errorMessage: error?.message,
      copied,
      isPricingModalOpen,
      weightKg: body?.weightKg ?? 52,
      apiResult,
      safety,
      threadsUrl: SITE_CONFIG.threadsUrl,
    },
    actions: {
      reset,
      retrySubmit,
      copySummary,
      setIsPricingModalOpen,
    },
  };
}
