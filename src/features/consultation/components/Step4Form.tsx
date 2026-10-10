import React from "react";
import { StepShell } from "./StepShell";
import { LinkButton } from "@/components/ui";
import { FIXED_LABELS } from "@/config/copy";
import { routes } from "@/config/routes";

export function Step4Form() {
  return (
    <StepShell
      step={4}
      title={FIXED_LABELS.PAGE_CONSULTATION_STEP4_TITLE}
      description={FIXED_LABELS.PAGE_CONSULTATION_STEP4_DESC}
    >
      <div className="flex items-center justify-between pt-4">
        <LinkButton href={routes.consultationGoals()} variant="ghost">
          {FIXED_LABELS.ACTION_BACK}
        </LinkButton>
        <LinkButton href={routes.consultationResult()} variant="primary">
          {FIXED_LABELS.ACTION_VIEW_MY_PLAN}
        </LinkButton>
      </div>
    </StepShell>
  );
}
