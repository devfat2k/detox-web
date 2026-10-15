"use client";

import {
  Container,
  Section,
  Heading,
  DisclaimerNote,
  LinkButton,
} from "@/components/ui";
import { routes } from "@/config/routes";
import { FIXED_LABELS } from "@/config/copy";
import { PlanDayScheduleView } from "@/features/plans";
import { PricingModal } from "./PricingModal";
import { ResultSessionExpired } from "./ResultSessionExpired";
import { ResultLoading } from "./ResultLoading";
import { ResultError } from "./ResultError";
import { ResultAssessmentCard } from "./ResultAssessmentCard";
import { ResultPricingBanner } from "./ResultPricingBanner";
import { ResultSummaryReview } from "./ResultSummaryReview";
import { ResultActionBar } from "./ResultActionBar";
import { useResultViewController } from "../hooks/use-result-view-controller";

export function ResultView() {
  const { state, actions } = useResultViewController();

  if (!state.isAllowed) {
    return <ResultSessionExpired onReset={actions.reset} />;
  }

  if (state.isPending) {
    return (
      <ResultLoading
        honorific={state.honorific}
        weightKg={state.weightKg}
        bmi={state.bmi}
      />
    );
  }

  if (state.isError || !state.displayPlan) {
    return (
      <ResultError
        errorMessage={state.errorMessage}
        onRetry={actions.retrySubmit}
        onReset={actions.reset}
      />
    );
  }

  const { displayPlan } = state;

  return (
    <Section spacing="md">
      <Container className="max-w-3xl space-y-8">
        <div className="space-y-6 animate-fade-in-slow">
          <div className="space-y-3 text-center sm:text-left">
            <Heading
              level={1}
              size="3xl"
              className="font-semibold text-2xl sm:text-3xl lg:text-4xl text-text leading-snug"
            >
              Thực đơn gợi ý dành cho {state.capitalHonorific}
            </Heading>
            <p className="font-body text-base text-text-muted leading-relaxed max-w-2xl">
              {state.recommendationReason}
            </p>
          </div>

          <ResultAssessmentCard
            honorific={state.honorific}
            bmi={state.bmi}
            category={state.apiResult?.assessment?.category}
            goalsSummary={state.goalsSummary}
            allergies={state.safety?.allergies}
            warnings={state.allWarnings}
          />

          <ResultPricingBanner
            title={displayPlan.title}
            durationDays={displayPlan.durationDays}
            totalBottles={displayPlan.totalBottles}
            onOpenPricing={() => actions.setIsPricingModalOpen(true)}
          />
        </div>

        <ResultSummaryReview
          stepCards={state.stepCards}
          onReset={actions.reset}
        />

        {displayPlan.days && displayPlan.days.length > 0 && (
          <div className="animate-fade-in-slow">
            <PlanDayScheduleView plan={displayPlan} />
          </div>
        )}

        <ResultActionBar
          copied={state.copied}
          threadsUrl={state.threadsUrl}
          onOpenPricing={() => actions.setIsPricingModalOpen(true)}
          onCopySummary={actions.copySummary}
        />

        <div className="space-y-4 animate-fade-in-slow">
          <DisclaimerNote className="max-w-xl mx-auto pt-2">
            {state.apiResult?.disclaimer
              ? `*${state.apiResult.disclaimer}`
              : undefined}
          </DisclaimerNote>

          <div className="flex items-center justify-center gap-4 pt-2">
            <LinkButton
              href={routes.consultation()}
              variant="ghost"
              onClick={actions.reset}
              className="text-xs font-medium text-text-muted hover:text-text"
            >
              {FIXED_LABELS.ACTION_RETRY}
            </LinkButton>
            <span className="text-border" aria-hidden="true">
              ·
            </span>
            <LinkButton
              href={routes.home()}
              variant="ghost"
              className="text-xs font-medium text-text-muted hover:text-text"
            >
              {FIXED_LABELS.ACTION_BACK_TO_HOME}
            </LinkButton>
          </div>
        </div>
      </Container>

      <PricingModal
        isOpen={state.isPricingModalOpen}
        onClose={() => actions.setIsPricingModalOpen(false)}
        selectedDurationDays={displayPlan.durationDays}
      />
    </Section>
  );
}
