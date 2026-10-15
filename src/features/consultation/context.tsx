"use client";

import React, { createContext, useContext, useState, useMemo } from "react";
import type {
  BodyFormData,
  ExperienceFormData,
  SafetyFormData,
} from "./schemas/consultation.schema";
import type { ConsultationResult } from "@/types/api";

export interface ConsultationContextValue {
  body: BodyFormData | null;
  goals: string[];
  experience: ExperienceFormData | null;
  safety: SafetyFormData | null;
  ineligibleReason: string | null;
  warningMessage: string | null;
  result: ConsultationResult | null;

  updateBody: (data: BodyFormData, warning?: string) => void;
  updateGoals: (goals: string[]) => void;
  updateExperience: (exp: ExperienceFormData) => void;
  updateSafety: (data: SafetyFormData) => void;
  setIneligible: (reason: string) => void;
  setResult: (res: ConsultationResult | null) => void;
  reset: () => void;
}

const defaultContextValue: ConsultationContextValue = {
  body: null,
  goals: [],
  experience: null,
  safety: null,
  ineligibleReason: null,
  warningMessage: null,
  result: null,
  updateBody: () => {},
  updateGoals: () => {},
  updateExperience: () => {},
  updateSafety: () => {},
  setIneligible: () => {},
  setResult: () => {},
  reset: () => {},
};

const ConsultationContext =
  createContext<ConsultationContextValue>(defaultContextValue);

export function ConsultationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [body, setBody] = useState<BodyFormData | null>(null);
  const [goals, setGoals] = useState<string[]>([]);
  const [experience, setExperience] = useState<ExperienceFormData | null>(null);
  const [safety, setSafety] = useState<SafetyFormData | null>(null);
  const [ineligibleReason, setIneligibleReason] = useState<string | null>(null);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  const [result, setResult] = useState<ConsultationResult | null>(null);

  const updateBody = (data: BodyFormData, warning?: string) => {
    setBody(data);
    setWarningMessage(warning ?? null);
    setResult(null);
  };

  const updateGoals = (g: string[]) => {
    setGoals(g);
    setResult(null);
  };

  const updateExperience = (exp: ExperienceFormData) => {
    setExperience(exp);
    setResult(null);
  };

  const updateSafety = (data: SafetyFormData) => {
    setSafety(data);
    setResult(null);
  };

  const setIneligible = (reason: string) => {
    setIneligibleReason(reason);
  };

  const reset = () => {
    setBody(null);
    setGoals([]);
    setExperience(null);
    setSafety(null);
    setIneligibleReason(null);
    setWarningMessage(null);
    setResult(null);
  };

  const value = useMemo(
    () => ({
      body,
      goals,
      experience,
      safety,
      ineligibleReason,
      warningMessage,
      result,
      updateBody,
      updateGoals,
      updateExperience,
      updateSafety,
      setIneligible,
      setResult,
      reset,
    }),
    [body, goals, experience, safety, ineligibleReason, warningMessage, result],
  );

  return (
    <ConsultationContext.Provider value={value}>
      {children}
    </ConsultationContext.Provider>
  );
}

export function useConsultation() {
  return useContext(ConsultationContext);
}
