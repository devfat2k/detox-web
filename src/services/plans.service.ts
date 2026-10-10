import { PLANS_DATA, type Plan, type PlanId, isValidPlanId } from "@/data/plans";

/**
 * Service truy xuất dữ liệu liệu trình.
 * Trả về Promise để tương thích với kiến trúc chuyển đổi sang NestJS API sau này.
 */
export async function getPlans(): Promise<readonly Plan[]> {
  return Promise.resolve(PLANS_DATA);
}

export async function getPlanById(id: string): Promise<Plan | null> {
  if (!isValidPlanId(id)) {
    return Promise.resolve(null);
  }
  const plan = PLANS_DATA.find((p) => p.id === (id as PlanId));
  return Promise.resolve(plan ?? null);
}
