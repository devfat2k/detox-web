import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPlanById, getPlans } from "@/services/plans.service";
import { PlanDetail } from "@/features/plans";
import { isValidPlanId } from "@/data/plans";

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

export default async function PlanDetailPage({
  params,
}: {
  params: Promise<{ planId: string }>;
}) {
  const { planId } = await params;
  if (!isValidPlanId(planId)) {
    notFound();
  }

  const plan = await getPlanById(planId);
  if (!plan) {
    notFound();
  }

  return (
    <main>
      <PlanDetail plan={plan} />
    </main>
  );
}
