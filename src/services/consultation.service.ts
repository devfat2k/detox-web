import { apiClient } from "@/lib/api-client";
import type {
  ConsultationPayload,
  ConsultationResult,
  HealthGoal,
  ActivityLevel,
  ExperienceLevel,
} from "@/types/api";
import type { FullBodyData } from "@/features/consultation/context";
import type { SafetyAnswers } from "@/domain/screening";
import type {
  ExperienceLevel as DomainExperienceLevel,
  DurationChoice,
} from "@/domain/recommend";

export interface ConsultationSubmissionInput {
  body: FullBodyData | null;
  safety: SafetyAnswers | null;
  goals: string[];
  experience: {
    level: DomainExperienceLevel;
    duration: DurationChoice;
  } | null;
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
    experience?.level === "never" ? "BEGINNER" : "EXPERIENCED";

  // Map DurationDays
  let durationDays: 1 | 3 | 6 = 3;
  if (experience?.duration === 1) {
    durationDays = 1;
  } else if (experience?.duration === 6) {
    durationDays = 6;
  }

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
      canDrinkBitterOrEarthy: experience?.level === "experienced_good",
      durationDays,
    },
    risks: {
      hasStomachPain: safety?.medicalConditions ?? false,
      isPregnantOrNursing: safety?.pregnantOrNursing ?? false,
      hasDiabetes: false,
      allergies: [],
    },
  };
}

export async function submitConsultation(
  input: ConsultationSubmissionInput
): Promise<ConsultationResult> {
  const payload = buildConsultationPayload(input);
  return apiClient.post<unknown, ConsultationResult>("/consultation", payload);
}
