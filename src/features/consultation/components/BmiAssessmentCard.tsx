import { Activity } from "lucide-react";
import type { AsianBmiAssessment } from "@/domain/screening";

interface BmiAssessmentCardProps {
  assessment: AsianBmiAssessment;
  heightCm: number;
}

export function BmiAssessmentCard({
  assessment,
  heightCm,
}: BmiAssessmentCardProps) {
  return (
    <div
      aria-live="polite"
      className="p-5 sm:p-6 rounded-xl bg-surface border border-border space-y-4 transition-all duration-300"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <Activity
            className="w-5 h-5 text-primary shrink-0"
            strokeWidth={1.75}
          />
          <span className="font-heading font-medium text-md text-text">
            Ước tính thể trạng
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-heading font-semibold text-md text-text">
            BMI: {assessment.bmi}
          </span>
          <span className="text-md px-6 py-1 rounded-lg bg-accent-soft text-primary font-medium border border-primary/20">
            {assessment.statusLabel}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <p className="font-body text-sm text-text leading-relaxed">
          {assessment.explanation}
        </p>

        <div className="space-y-2.5 bg-bg/70 rounded-lg p-3.5 border border-border/60">
          <div className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
            <p className="font-body text-sm text-text-muted leading-relaxed">
              <span className="font-medium text-text">Cân nặng cân đối:</span>{" "}
              Khoảng{" "}
              <span className="font-medium text-text">
                {assessment.healthyWeightMin} – {assessment.healthyWeightMax} kg
              </span>{" "}
              phù hợp với chiều cao {heightCm} cm của bạn.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
            <p className="font-body text-sm text-text-muted leading-relaxed">
              <span className="font-medium text-text">Gợi ý lộ trình:</span>{" "}
              {assessment.recommendation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
