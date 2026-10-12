import React from "react";
import { Container } from "@/components/ui";

export interface StepperHeaderProps {
  currentStep: number;
}

const STEPS = [
  { step: 1, label: "01 Lưu ý" },
  { step: 2, label: "02 Cơ thể" },
  { step: 3, label: "03 Mục tiêu" },
  { step: 4, label: "04 Kinh nghiệm" },
] as const;

export function StepperHeader({ currentStep }: StepperHeaderProps) {
  return (
    <div className="border-b border-border bg-surface/50 py-3 sm:py-4 select-none">
      <Container className="flex justify-center">
        <nav aria-label="Tiến trình khảo sát">
          <ol className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 rounded-full bg-surface border border-border shadow-2xs">
            {STEPS.map(({ step, label }, idx) => {
              const isCurrent = step === currentStep;
              const isCompleted = step < currentStep;
              const isLast = idx === STEPS.length - 1;

              return (
                <React.Fragment key={step}>
                  <li
                    className="flex items-center gap-1.5 text-xs font-body"
                    aria-current={isCurrent ? "step" : undefined}
                  >
                    <span
                      className={`h-2 w-2 rounded-full transition-colors ${
                        isCurrent
                          ? "bg-primary"
                          : isCompleted
                          ? "bg-primary/50"
                          : "bg-border"
                      }`}
                      aria-hidden="true"
                    />
                    <span
                      className={`font-medium tracking-wide ${
                        isCurrent
                          ? "text-primary font-semibold"
                          : isCompleted
                          ? "text-text"
                          : "text-text-muted/60"
                      }`}
                    >
                      {label}
                    </span>
                  </li>
                  {!isLast ? (
                    <span aria-hidden="true" className="text-border px-0.5 text-xs">
                      ───
                    </span>
                  ) : null}
                </React.Fragment>
              );
            })}
          </ol>
        </nav>
      </Container>
    </div>
  );
}
