import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPlanById, getPlans } from "@/services/plans.service";
import { PlanDetail } from "@/features/plans";
import { isValidPlanId, PLANS_DATA } from "@/data/plans";

export async function generateStaticParams() {
  const plans = await getPlans();
  return plans.map((plan) => ({ planId: plan.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ planId: string }>;
}): Promise<Metadata> {
  const { planId } = await params;
  if (!isValidPlanId(planId)) {
    return {};
  }
  const plan = await getPlanById(planId);
  if (!plan) {
    return {};
  }
  return {
    title: plan.title,
    description: plan.description,
  };
}

function getFallbackPlan(planId: string) {
  const normalizedId = planId.trim();
  const durationNumber = Number(normalizedId.replace("-day", ""));
  return (
    PLANS_DATA.find(
      (p) =>
        p.id === normalizedId ||
        p.durationDays === durationNumber ||
        p.id.includes(normalizedId)
    ) ?? null
  );
}

async function PlanDetailContent({ planId }: { planId: string }) {
  const plan = await getPlanById(planId);
  if (!plan) {
    notFound();
  }

  return <PlanDetail plan={plan} />;
}

export default async function PlanDetailPage({
  params,
}: {
  params: Promise<{ planId: string }>;
}) {
  const { planId } = await params;
  if (!isValidPlanId(planId)) {
    notFound();
  }

  const fallbackPlan = getFallbackPlan(planId);

  return (
    <main>
      <Suspense fallback={fallbackPlan ? <PlanDetail plan={fallbackPlan} /> : null}>
        <PlanDetailContent planId={planId} />
      </Suspense>
    </main>
  );
}
