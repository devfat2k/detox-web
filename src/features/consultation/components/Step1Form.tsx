import React from "react";
import { StepShell } from "./StepShell";
import { LinkButton } from "@/components/ui";
import { FIXED_LABELS } from "@/config/copy";
import { routes } from "@/config/routes";

export function Step1Form() {
  return (
    <StepShell
      step={1}
      title={FIXED_LABELS.PAGE_CONSULTATION_STEP1_TITLE}
      description={FIXED_LABELS.PAGE_CONSULTATION_STEP1_DESC}
    >
      <div className="flex justify-end pt-4">
        <LinkButton href={routes.consultationBody()} variant="primary">
          {FIXED_LABELS.ACTION_CONTINUE}
        </LinkButton>
      </div>
    </StepShell>
  );
}
