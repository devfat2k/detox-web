import { Suspense } from "react";
import type { Metadata } from "next";
import { getPlans } from "@/services/plans.service";
import { PlanList } from "@/features/plans";
import { FIXED_LABELS } from "@/config/copy";
import { PLANS_DATA } from "@/data/plans";

export const metadata: Metadata = {
  title: FIXED_LABELS.PAGE_PLANS_TITLE,
  description: FIXED_LABELS.PAGE_PLANS_DESC,
};

async function PlansContent() {
  const plans = await getPlans();
  return <PlanList plans={plans} />;
}

export default function PlansPage() {
  return (
    <main>
      <Suspense fallback={<PlanList plans={PLANS_DATA} />}>
        <PlansContent />
      </Suspense>
    </main>
  );
}
