"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { Container, Section, Heading, Card, Button } from "@/components/ui";
import { useConsultation } from "../context";
import { useStepGuard } from "../hooks/use-step-guard";
import { FIXED_LABELS } from "@/config/copy";
import { routes } from "@/config/routes";
import type { ExperienceFormData } from "../schemas/consultation.schema";

interface ExpOption {
  id: "never" | "experienced_good" | "experienced_tired";
  label: string;
  desc: string;
}

const EXP_OPTIONS: ExpOption[] = [
  {
    id: "never",
    label: "Chưa từng uống detox bao giờ",
    desc: "Đây là lần đầu tiên bạn tìm hiểu — quán sẽ ưu tiên các vị thanh mát, dịu lành dễ uống nhất",
  },
  {
    id: "experienced_good",
    label: "Đã từng và cơ thể thích ứng rất tốt",
    desc: "Bạn đã quen thuộc với vị rau củ nguyên chất và nhịp thanh lọc định kỳ",
  },
  {
    id: "experienced_tired",
    label: "Đã từng nhưng thấy hơi mệt hoặc bỏ dở",
    desc: "Quán sẽ điều chỉnh nhịp độ êm ái hơn để cơ thể nạp năng lượng tự nhiên mà không bị đuối sức",
  },
];

interface DurationOption {
  id: 1 | 3 | 6;
  tag: string;
  title: string;
  bottles: string;
  desc: string;
  isRecommended?: boolean;
}

const DURATION_OPTIONS: DurationOption[] = [
  {
    id: 1,
    tag: "Khởi đầu",
    title: "1 ngày",
    bottles: "5 chai",
    desc: "Làm quen với nhịp thanh lọc nhẹ nhàng trong 24 giờ",
  },
  {
    id: 3,
    tag: "Phổ biến",
    title: "3 ngày",
    bottles: "15 chai",
    desc: "Cân bằng & xoa dịu đường ruột, nhẹ bụng rõ rệt",
  },
  {
    id: 6,
    tag: "Khuyên dùng",
    title: "6 ngày",
    bottles: "30 chai",
    desc: "Chuyên sâu tái tạo năng lượng và phục hồi dưỡng chất",
    isRecommended: true,
  },
];

export function ExperienceForm() {
  const router = useRouter();
  const { isAllowed } = useStepGuard("experience");
  const { experience, updateExperience } = useConsultation();

  const [experienceLevel, setExperienceLevel] = useState<
    "never" | "experienced_good" | "experienced_tired" | null
  >(experience?.experienceLevel ?? null);

  const [durationDays, setDurationDays] = useState<1 | 3 | 6 | null>(
    experience?.durationDays ?? null,
  );

  const isValid = Boolean(experienceLevel && durationDays);

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!experienceLevel || !durationDays) return;

    const expData: ExperienceFormData = {
      experienceLevel,
      durationDays,
    };

    updateExperience(expData);
    router.push(routes.consultationSafety());
  };

  const handleBack = () => {
    if (experienceLevel && durationDays) {
      updateExperience({ experienceLevel, durationDays });
    }
    router.push(routes.consultationGoals());
  };

  if (!isAllowed) return null;

  return (
    <Section className="py-8 sm:py-12">
      <Container className="max-w-7xl space-y-6">
        <Card className="p-6 sm:p-10 space-y-8">
          <header className="space-y-2 border-b border-border/60 pb-5">
            <span className="text-md font-mono font-medium text-primary tracking-wider block">
              Bước 3/4 · Thói quen & thời gian
            </span>
            <Heading
              level={1}
              className="text-2xl sm:text-3xl font-semibold text-text"
            >
              Kinh nghiệm và số ngày
            </Heading>
            <p className="font-body text-sm sm:text-base text-text-muted leading-relaxed">
              Chọn nhịp độ làm quen và thời gian phù hợp với lịch sinh hoạt của
              bạn.
            </p>
          </header>

          <form onSubmit={handleContinue} className="space-y-8">
            {/* Kinh nghiệm detox */}
            <div className="space-y-3">
              <label className="font-body text-sm font-medium text-text select-none block">
                Bạn đã từng trải nghiệm uống nước ép thanh lọc chưa?{" "}
                <span className="text-error">*</span>
              </label>
              <div className="space-y-3">
                {EXP_OPTIONS.map((opt) => {
                  const isSelected = experienceLevel === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setExperienceLevel(opt.id)}
                      className={`w-full p-4.5 sm:p-5 rounded-2xl border text-left transition-all duration-200 select-none flex items-start gap-4 cursor-pointer ${
                        isSelected
                          ? "bg-accent-soft/80 border-primary shadow-2xs ring-1 ring-primary/20"
                          : "bg-surface border-border hover:border-primary/40 hover:bg-bg"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? "border-primary bg-primary text-bg"
                            : "border-border bg-bg"
                        }`}
                      >
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-surface" />
                        )}
                      </div>
                      <div className="space-y-1">
                        <span
                          className={`font-heading font-medium text-base block leading-snug ${isSelected ? "text-primary" : "text-text"}`}
                        >
                          {opt.label}
                        </span>
                        <span className="font-body text-xs sm:text-sm text-text-muted leading-relaxed block">
                          {opt.desc}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Số ngày dự kiến */}
            <div className="space-y-3 pt-2">
              <label className="font-body text-sm font-medium text-text select-none block">
                Số ngày bạn muốn trải nghiệm{" "}
                <span className="text-error">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
                {DURATION_OPTIONS.map((opt) => {
                  const isSelected = durationDays === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setDurationDays(opt.id)}
                      className={`p-5 sm:p-5.5 rounded-2xl border text-left transition-all duration-200 select-none flex flex-col justify-between gap-4 h-full cursor-pointer ${
                        isSelected
                          ? "bg-accent-soft/80 border-primary shadow-2xs ring-1 ring-primary/20"
                          : "bg-surface border-border hover:border-primary/40 hover:bg-bg"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 w-full">
                        <span
                          className={`text-xs font-normal px-2.5 py-0.5 rounded-full border transition-colors ${
                            opt.isRecommended
                              ? "bg-primary/10 text-primary border-primary/25 font-medium"
                              : isSelected
                                ? "bg-primary/10 text-primary border-primary/25"
                                : "bg-bg text-text-muted border-border"
                          }`}
                        >
                          {opt.tag}
                        </span>
                        <span className="text-xs font-normal text-text-muted bg-bg px-2.5 py-0.5 rounded-full border border-border">
                          {opt.bottles}
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span
                            className={`font-heading text-xl font-medium block ${isSelected ? "text-primary" : "text-text"}`}
                          >
                            {opt.title}
                          </span>
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                              isSelected
                                ? "border-primary bg-primary text-bg"
                                : "border-border bg-bg"
                            }`}
                          >
                            {isSelected && (
                              <Check
                                className="w-3.5 h-3.5 text-bg"
                                strokeWidth={2}
                              />
                            )}
                          </div>
                        </div>
                        <p className="font-body text-xs sm:text-sm text-text-muted leading-relaxed">
                          {opt.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Điều hướng */}
            <div className="space-y-2 pt-2">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleBack}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 min-h-12"
                >
                  <ArrowLeft className="w-4 h-4" strokeWidth={2} />
                  <span>{FIXED_LABELS.ACTION_BACK}</span>
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={!isValid}
                  className="w-full flex-1 flex items-center justify-center gap-2 min-h-12 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{FIXED_LABELS.ACTION_CONTINUE}</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </Button>
              </div>
              {!isValid && (
                <p className="font-body text-xs text-text-muted/70 text-center">
                  Vui lòng chọn mức độ kinh nghiệm và số ngày để tiếp tục.
                </p>
              )}
            </div>
          </form>
        </Card>
      </Container>
    </Section>
  );
}
