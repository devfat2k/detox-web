"use client";

import React, { createContext, useContext, useState } from "react";
import type { SafetyAnswers, BodyAnswers } from "@/domain/screening";
import type { ExperienceLevel, DurationChoice } from "@/domain/recommend";

export interface FullBodyData extends BodyAnswers {
  name?: string;
  gender: "female" | "male";
  activityLevel: "low" | "moderate" | "high";
}

export interface ConsultationContextValue {
  safety: SafetyAnswers | null;
  body: FullBodyData | null;
  goals: string[];
  experience: {
    level: ExperienceLevel;
    duration: DurationChoice;
  } | null;
  ineligibleReason: string | null;
  warningMessage: string | null;
  updateSafety: (data: SafetyAnswers) => void;
  updateBody: (data: FullBodyData, warning?: string) => void;
  updateGoals: (goals: string[]) => void;
  updateExperience: (exp: { level: ExperienceLevel; duration: DurationChoice }) => void;
  setIneligible: (reason: string) => void;
  reset: () => void;
}

const defaultContextValue: ConsultationContextValue = {
  safety: null,
  body: null,
  goals: [],
  experience: null,
  ineligibleReason: null,
  warningMessage: null,
  updateSafety: () => {},
  updateBody: () => {},
  updateGoals: () => {},
  updateExperience: () => {},
  setIneligible: () => {},
  reset: () => {},
};

const ConsultationContext = createContext<ConsultationContextValue>(defaultContextValue);

export function ConsultationProvider({ children }: { children: React.ReactNode }) {
  const [safety, setSafety] = useState<SafetyAnswers | null>(null);
  const [body, setBody] = useState<FullBodyData | null>(null);
  const [goals, setGoals] = useState<string[]>([]);
  const [experience, setExperience] = useState<{
    level: ExperienceLevel;
    duration: DurationChoice;
  } | null>(null);
  const [ineligibleReason, setIneligibleReason] = useState<string | null>(null);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);

  const updateSafety = (data: SafetyAnswers) => setSafety(data);
  const updateBody = (data: FullBodyData, warning?: string) => {
    setBody(data);
    setWarningMessage(warning ?? null);
  };
  const updateGoals = (g: string[]) => setGoals(g);
  const updateExperience = (exp: { level: ExperienceLevel; duration: DurationChoice }) =>
    setExperience(exp);
  const setIneligible = (reason: string) => setIneligibleReason(reason);

  const reset = () => {
    setSafety(null);
    setBody(null);
    setGoals([]);
    setExperience(null);
    setIneligibleReason(null);
    setWarningMessage(null);
  };

  return (
    <ConsultationContext.Provider
      value={{
        safety,
        body,
        goals,
        experience,
        ineligibleReason,
        warningMessage,
        updateSafety,
        updateBody,
        updateGoals,
        updateExperience,
        setIneligible,
        reset,
      }}
    >
      {children}
    </ConsultationContext.Provider>
  );
}

export function useConsultation() {
  return useContext(ConsultationContext);
}
