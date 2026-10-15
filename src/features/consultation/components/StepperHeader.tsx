import React from "react";
import { Check } from "lucide-react";
import { Container } from "@/components/ui";

export interface StepperHeaderProps {
  currentStep: number;
}

const STEPS = [
  { step: 1, number: "01", label: "Thể trạng" },
  { step: 2, number: "02", label: "Nhu cầu" },
  { step: 3, number: "03", label: "Lộ trình" },
  { step: 4, number: "04", label: "An toàn" },
] as const;

export function StepperHeader({ currentStep }: StepperHeaderProps) {
  const progressPercent = Math.min(100, Math.max(0, (currentStep / STEPS.length) * 100));

  return (
    <div className="relative border-b border-border bg-surface/80 backdrop-blur-xs select-none">
      <Container className="py-3.5 sm:py-5 max-w-3xl">
        <nav aria-label="Tiến trình khảo sát">
          <ol className="flex items-center justify-between gap-1 sm:gap-4">
            {STEPS.map(({ step, number, label }, idx) => {
              const isCurrent = step === currentStep;
              const isCompleted = step < currentStep;
              const isLast = idx === STEPS.length - 1;

              return (
                <React.Fragment key={step}>
                  <li
                    className="flex items-center gap-2 sm:gap-2.5 text-xs sm:text-sm font-body cursor-default"
                    aria-current={isCurrent ? "step" : undefined}
                  >
                    {/* Circle Milestone */}
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-semibold transition-all duration-300 ${
                        isCurrent
                          ? "bg-primary text-bg shadow-2xs ring-3 ring-accent-soft"
                          : isCompleted
                          ? "bg-accent-soft text-primary border border-primary/30"
                          : "bg-bg text-text-muted/60 border border-border"
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" strokeWidth={1.75} />
                      ) : (
                        <span>{step}</span>
                      )}
                    </div>

                    {/* Step Labels */}
                    <div className="flex flex-col">
                      <span
                        className={`text-[10px] sm:text-[11px] font-mono tracking-wider transition-colors duration-200 hidden xs:inline ${
                          isCurrent
                            ? "text-primary font-medium"
                            : isCompleted
                            ? "text-text-muted"
                            : "text-text-muted/50"
                        }`}
                      >
                        {number}
                      </span>
                      <span
                        className={`font-medium transition-colors duration-200 text-xs sm:text-sm ${
                          isCurrent
                            ? "text-text font-semibold"
                            : isCompleted
                            ? "text-text/80"
                            : "text-text-muted/60"
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                  </li>

                  {/* Connecting Trackline */}
                  {!isLast ? (
                    <li
                      aria-hidden="true"
                      className="flex-1 h-0.5 mx-1 sm:mx-2 rounded-full bg-border overflow-hidden"
                    >
                      <div
                        className={`h-full transition-all duration-500 rounded-full ${
                          isCompleted ? "bg-primary w-full" : isCurrent ? "bg-primary/40 w-1/2" : "w-0"
                        }`}
                      />
                    </li>
                  ) : null}
                </React.Fragment>
              );
            })}
          </ol>
        </nav>
      </Container>

      {/* Subtle Progress Bar Under Header */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-border/40 overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-500 ease-soft"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
