export interface ApiResponse<T> {
  success: true;
  statusCode: number;
  message: string;
  data: T;
  timestamp: string;
  path: string;
}

export interface ApiErrorResponse {
  success: false;
  statusCode: number;
  message: string;
  errors?: string[];
  timestamp: string;
  path: string;
}

export type ActivityLevel = "SEDENTARY" | "LIGHT" | "MODERATE" | "VERY_ACTIVE";
export type HealthGoal = "DETOX" | "WEIGHT_LOSS" | "BEAUTY_SKIN" | "DIGESTION";
export type ExperienceLevel = "BEGINNER" | "EXPERIENCED";

// Chỉ thu thập thông tin sinh hoạt và thể trạng cơ bản, không có dữ liệu định danh nhạy cảm
export interface Baseline {
  nickname?: string;
  age: number;
  weightKg: number;
  heightCm: number;
  activityLevel: ActivityLevel;
}

export interface Preferences {
  experienceLevel?: ExperienceLevel;
  canDrinkBitterOrEarthy?: boolean;
  durationDays?: 1 | 3 | 6;
}

export interface HealthRisks {
  hasStomachPain?: boolean;
  isPregnantOrNursing?: boolean;
  hasDiabetes?: boolean;
  allergies?: string[];
}

export interface ConsultationPayload {
  baseline: Baseline;
  goal: HealthGoal;
  preferences?: Preferences;
  risks?: HealthRisks;
}

export interface Drink {
  id: string;
  name: string;
  slug: string;
  description?: string;
  calories?: number;
  target_goal?: HealthGoal;
  is_detox_core?: boolean;
  image_url?: string;
  ingredients?: string[];
  category_id?: string;
  category_name?: string;
  time_slot?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Plan {
  id: string;
  name: string;
  slug: string;
  duration_days: number;
  description?: string;
}

export interface ConsultationResult {
  bmi: number;
  bmiCategory: string;
  dailyWaterMl: number;
  safetyAlerts: string[];
  recommendedPlan?: Plan;
  scheduleRatio: string;
  drinks: Drink[];
}
