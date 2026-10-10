import React from "react";
import { StepShell } from "./StepShell";
import { LinkButton } from "@/components/ui";
import { FIXED_LABELS } from "@/config/copy";
import { routes } from "@/config/routes";

export function Step2Form() {
  return (
    <StepShell
      step={2}
      title={FIXED_LABELS.PAGE_CONSULTATION_STEP2_TITLE}
      description={FIXED_LABELS.PAGE_CONSULTATION_STEP2_DESC}
    >
      <div className="flex items-center justify-between pt-4">
        <LinkButton href={routes.consultation()} variant="ghost">
          {FIXED_LABELS.ACTION_BACK}
        </LinkButton>
        <LinkButton href={routes.consultationGoals()} variant="primary">
          {FIXED_LABELS.ACTION_CONTINUE}
        </LinkButton>
      </div>
    </StepShell>
  );
}
