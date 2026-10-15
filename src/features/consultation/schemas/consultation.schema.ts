import { z } from "zod";

/**
 * Zod Schema cho Thông tin cơ thể (Bước 1)
 */
export const bodySchema = z.object({
  name: z.string().trim().min(1, "Vui lòng nhập tên của bạn"),
  gender: z.enum(["female", "male"]),
  age: z.coerce.number().min(18, "Tối thiểu 18 tuổi").max(80, "Tối đa 80 tuổi"),
  heightCm: z.coerce.number().min(120, "Chiều cao từ 120cm").max(220, "Tối đa 220cm"),
  weightKg: z.coerce.number().min(35, "Cân nặng từ 35kg").max(180, "Tối đa 180kg"),
  activityLevel: z.enum(["low", "moderate", "high"], {
    error: "Vui lòng chọn mức độ vận động",
  }),
});

export type BodyFormData = z.infer<typeof bodySchema>;

/**
 * Zod Schema cho Vấn đề & Mục tiêu sức khỏe (Bước 2)
 */
export const goalsSchema = z.object({
  goals: z
    .array(z.string())
    .min(1, "Vui lòng chọn ít nhất 1 mục tiêu sức khỏe")
    .max(3, "Chỉ được chọn tối đa 3 mục tiêu"),
});

export type GoalsFormData = z.infer<typeof goalsSchema>;

/**
 * Zod Schema cho Kinh nghiệm & Số ngày (Bước 3)
 */
export const experienceSchema = z.object({
  experienceLevel: z.enum(["never", "experienced_good", "experienced_tired"]),
  durationDays: z.union([z.literal(1), z.literal(3), z.literal(6)]),
});

export type ExperienceFormData = z.infer<typeof experienceSchema>;

/**
 * Zod Schema cho Lưu ý an toàn & Dị ứng (Bước 4)
 */
export const safetySchema = z.object({
  pregnantOrNursing: z.boolean().default(false),
  medicalConditions: z.boolean().default(false),
  regularMedication: z.boolean().default(false),
  eatingDisorder: z.boolean().default(false),
  allergies: z.array(z.string()).default([]),
});

export type SafetyFormData = z.infer<typeof safetySchema>;
