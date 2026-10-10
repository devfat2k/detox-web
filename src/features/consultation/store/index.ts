import { create } from "zustand";
import type {
  Step1SafetyData,
  Step2BodyData,
  Step3GoalsData,
  Step4ExperienceData,
} from "../schemas";

export interface ConsultationState {
  currentStep: number;
  completedStep: number;
  isEligible: boolean;
  step1: Step1SafetyData | null;
  step2: Step2BodyData | null;
  step3: Step3GoalsData | null;
  step4: Step4ExperienceData | null;

  setStep1: (data: Step1SafetyData, eligible: boolean) => void;
  setStep2: (data: Step2BodyData) => void;
  setStep3: (data: Step3GoalsData) => void;
  setStep4: (data: Step4ExperienceData) => void;
  resetConsultation: () => void;
}

export const useConsultationStore = create<ConsultationState>((set) => ({
  currentStep: 1,
  completedStep: 0,
  isEligible: true,
  step1: null,
  step2: null,
  step3: null,
  step4: null,

  setStep1: (data, eligible) =>
    set((state) => ({
      step1: data,
      isEligible: eligible,
      completedStep: Math.max(state.completedStep, 1),
    })),

  setStep2: (data) =>
    set((state) => ({
      step2: data,
      completedStep: Math.max(state.completedStep, 2),
    })),

  setStep3: (data) =>
    set((state) => ({
      step3: data,
      completedStep: Math.max(state.completedStep, 3),
    })),

  setStep4: (data) =>
    set((state) => ({
      step4: data,
      completedStep: Math.max(state.completedStep, 4),
    })),

  resetConsultation: () =>
    set({
      currentStep: 1,
      completedStep: 0,
      isEligible: true,
      step1: null,
      step2: null,
      step3: null,
      step4: null,
    }),
}));
