import type { Metadata } from "next";
import { getPlans } from "@/services/plans.service";
import { PlanList } from "@/features/plans";
import { FIXED_LABELS } from "@/config/copy";

export const metadata: Metadata = {
  title: FIXED_LABELS.PAGE_PLANS_TITLE,
  description: FIXED_LABELS.PAGE_PLANS_DESC,
};

export default async function PlansPage() {
  const plans = await getPlans();

  return (
    <main>
      <PlanList plans={plans} />
    </main>
  );
}
