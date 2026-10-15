import { apiClient } from "@/lib/api-client";
import type {
  ConsultationPayload,
  ConsultationResult,
  HealthGoal,
  ActivityLevel,
  ExperienceLevel,
} from "@/types/api";
import type {
  BodyFormData,
  ExperienceFormData,
  SafetyFormData,
} from "@/features/consultation/schemas/consultation.schema";

export interface ConsultationSubmissionInput {
  body: BodyFormData | null;
  safety: SafetyFormData | null;
  goals: string[];
  experience: ExperienceFormData | null;
}

export function buildConsultationPayload(
  input: ConsultationSubmissionInput
): ConsultationPayload {
  const { body, safety, goals, experience } = input;

  // Map ActivityLevel
  let activityLevel: ActivityLevel = "LIGHT";
  if (body?.activityLevel === "low") {
    activityLevel = "SEDENTARY";
  } else if (body?.activityLevel === "moderate") {
    activityLevel = "LIGHT";
  } else if (body?.activityLevel === "high") {
    activityLevel = "MODERATE";
  }

  // Map Goal
  let goal: HealthGoal = "DETOX";
  if (goals.includes("weight")) {
    goal = "WEIGHT_LOSS";
  } else if (goals.includes("heat") || goals.includes("acne")) {
    goal = "BEAUTY_SKIN";
  } else if (goals.includes("digestion")) {
    goal = "DIGESTION";
  }

  // Map ExperienceLevel
  const experienceLevel: ExperienceLevel =
    experience?.experienceLevel === "never" ? "BEGINNER" : "EXPERIENCED";

  const durationDays = experience?.durationDays;

  return {
    baseline: {
      nickname: body?.name?.trim() || "Bạn",
      age: body?.age ?? 28,
      weightKg: Math.max(30, Math.min(200, Math.round(body?.weightKg ?? 52))),
      heightCm: Math.max(100, Math.min(250, Math.round(body?.heightCm ?? 160))),
      activityLevel,
    },
    goal,
    preferences: {
      experienceLevel,
      canDrinkBitterOrEarthy: experience?.experienceLevel === "experienced_good",
      ...(durationDays ? { durationDays } : {}),
    },
    risks: {
      hasStomachPain: safety?.medicalConditions ?? false,
      isPregnantOrNursing: safety?.pregnantOrNursing ?? false,
      hasDiabetes: false,
      allergies: safety?.allergies ?? [],
    },
  };
}

export async function submitConsultation(
  input: ConsultationSubmissionInput
): Promise<ConsultationResult> {
  const payload = buildConsultationPayload(input);
  return apiClient.post<unknown, ConsultationResult>("/consultation", payload);
}
