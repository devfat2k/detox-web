import React from "react";
import { Container } from "@/components/ui";

export interface StepperHeaderProps {
  currentStep: number;
}

const STEPS = [
  { step: 1, label: "Lưu ý an toàn" },
  { step: 2, label: "Thông tin cơ thể" },
  { step: 3, label: "Mục tiêu" },
  { step: 4, label: "Kinh nghiệm" },
] as const;

export function StepperHeader({ currentStep }: StepperHeaderProps) {
  return (
    <div className="border-b border-border bg-surface py-4">
      <Container>
        <nav aria-label="Tiến trình khảo sát tư vấn">
          <ol className="flex items-center justify-between gap-2 sm:justify-center sm:gap-8">
            {STEPS.map(({ step, label }) => {
              const isCurrent = step === currentStep;
              const isCompleted = step < currentStep;

              return (
                <li
                  key={step}
                  className="flex items-center gap-2"
                  aria-current={isCurrent ? "step" : undefined}
                >
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                      isCurrent
                        ? "bg-primary text-primary-fg"
                        : isCompleted
                          ? "bg-accent-soft text-accent"
                          : "bg-surface-elevated text-text-muted"
                    }`}
                  >
                    {step}
                  </span>
                  <span
                    className={`hidden text-xs font-medium sm:inline ${
                      isCurrent
                        ? "text-text font-semibold"
                        : isCompleted
                          ? "text-text-muted"
                          : "text-text-muted/60"
                    }`}
                  >
                    {label}
                  </span>
                </li>
              );
            })}
          </ol>
        </nav>
      </Container>
    </div>
  );
}
