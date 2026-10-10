import React from "react";
import { StepShell } from "./StepShell";
import { LinkButton } from "@/components/ui";
import { FIXED_LABELS } from "@/config/copy";
import { routes } from "@/config/routes";

export function Step3Form() {
  return (
    <StepShell
      step={3}
      title={FIXED_LABELS.PAGE_CONSULTATION_STEP3_TITLE}
      description={FIXED_LABELS.PAGE_CONSULTATION_STEP3_DESC}
    >
      <div className="flex items-center justify-between pt-4">
        <LinkButton href={routes.consultationBody()} variant="ghost">
          {FIXED_LABELS.ACTION_BACK}
        </LinkButton>
        <LinkButton href={routes.consultationExperience()} variant="primary">
          {FIXED_LABELS.ACTION_CONTINUE}
        </LinkButton>
      </div>
    </StepShell>
  );
}
