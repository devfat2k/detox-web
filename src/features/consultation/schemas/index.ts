import { z } from "zod";

/**
 * Zod Schema cho Bước 1: Sàng lọc an toàn
 */
export const step1SafetySchema = z.object({
  hasSevereDigestiveIssue: z.boolean().default(false),
  isPregnantOrNursing: z.boolean().default(false),
  hasChronicCondition: z.boolean().default(false),
  isUnder18: z.boolean().default(false),
});

export type Step1SafetyData = z.infer<typeof step1SafetySchema>;

/**
 * Zod Schema cho Bước 2: Thông tin cơ thể
 */
export const step2BodySchema = z.object({
  gender: z.enum(["male", "female", "other"], {
    error: "Vui lòng chọn giới tính",
  }),
  age: z.coerce.number().min(18, "Tối thiểu 18 tuổi").max(80, "Tối đa 80 tuổi"),
  heightCm: z.coerce.number().min(120, "Chiều cao từ 120cm").max(220, "Chiều cao tối đa 220cm"),
  weightKg: z.coerce.number().min(35, "Cân nặng từ 35kg").max(180, "Cân nặng tối đa 180kg"),
});

export type Step2BodyData = z.infer<typeof step2BodySchema>;

/**
 * Zod Schema cho Bước 3: Mục tiêu và vấn đề
 */
export const step3GoalsSchema = z.object({
  goals: z.array(z.string()).min(1, "Vui lòng chọn ít nhất 1 mục tiêu sức khỏe"),
});

export type Step3GoalsData = z.infer<typeof step3GoalsSchema>;

/**
 * Zod Schema cho Bước 4: Kinh nghiệm & số ngày
 */
export const step4ExperienceSchema = z.object({
  experienceLevel: z.enum(["first-time", "occasional", "experienced"]),
  durationDays: z.union([z.literal(1), z.literal(3), z.literal(6)]),
});

export type Step4ExperienceData = z.infer<typeof step4ExperienceSchema>;
