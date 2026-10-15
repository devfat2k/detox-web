"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { Container, Section, Heading, Card, Button } from "@/components/ui";
import { useConsultation } from "../context";
import { useStepGuard } from "../hooks/use-step-guard";
import { FIXED_LABELS } from "@/config/copy";
import { routes } from "@/config/routes";

interface GoalItem {
  id: string;
  tag: string;
  label: string;
  desc: string;
}

const AVAILABLE_GOALS: GoalItem[] = [
  {
    id: "digestion",
    tag: "Đường ruột",
    label: "Nặng bụng, đầy hơi, khó tiêu",
    desc: "Xoa dịu đường ruột với chất xơ hòa tan và enzyme tự nhiên",
  },
  {
    id: "weight",
    tag: "Vòng eo",
    label: "Hỗ trợ giảm mỡ & nhẹ nhõm vòng eo",
    desc: "Giảm tích nước, hỗ trợ cơ thể thanh thoát và nhẹ bụng rõ rệt",
  },
  {
    id: "heat",
    tag: "Thanh nhiệt",
    label: "Nóng trong, ăn nhiều dầu mỡ đồ cay",
    desc: "Nước ép giàu kali và khoáng thực vật giúp hạ nhiệt tự nhiên",
  },
  {
    id: "acne",
    tag: "Tươi sáng",
    label: "Da sạm, mệt mỏi, thiếu năng lượng",
    desc: "Bổ sung diệp lục tươi và vitamin A, C tự nhiên giúp sáng da",
  },
  {
    id: "sleep",
    tag: "Giấc ngủ",
    label: "Uể oải, khó ngủ sâu giấc",
    desc: "Tạo khoảng nghỉ êm dịu cho dạ dày với sữa hạt và trà thảo mộc",
  },
  {
    id: "other",
    tag: "Duy trì",
    label: "Thanh lọc định kỳ & lối sống xanh",
    desc: "Thưởng thức rau củ tự nhiên hàng ngày như một thói quen tích cực",
  },
];

const MAX_GOALS = 3;

export function GoalsForm() {
  const router = useRouter();
  const { isAllowed } = useStepGuard("goals");
  const { goals, updateGoals } = useConsultation();

  const [selectedGoals, setSelectedGoals] = useState<string[]>(goals ?? []);

  const toggleGoal = (id: string) => {
    setSelectedGoals((prev) => {
      if (prev.includes(id)) {
        return prev.filter((g) => g !== id);
      }
      if (prev.length >= MAX_GOALS) {
        return prev;
      }
      return [...prev, id];
    });
  };

  const isValid =
    selectedGoals.length >= 1 && selectedGoals.length <= MAX_GOALS;

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    updateGoals(selectedGoals);
    router.push(routes.consultationExperience());
  };

  const handleBack = () => {
    updateGoals(selectedGoals);
    router.push(routes.consultation());
  };

  if (!isAllowed) return null;

  return (
    <Section className="py-8 sm:py-12">
      <Container className="max-w-7xl space-y-6">
        <Card className="p-6 sm:p-10 space-y-8">
          <header className="space-y-2 border-b border-border/60 pb-5">
            <span className="text-md font-mono font-medium text-primary tracking-wider block">
              Bước 2/4 · Nhu cầu sức khỏe
            </span>
            <Heading
              level={1}
              className="text-2xl sm:text-3xl font-semibold text-text"
            >
              Vấn đề và mục tiêu
            </Heading>
            <p className="font-body text-sm sm:text-base text-text-muted leading-relaxed">
              Chọn mục tiêu cơ thể bạn cần xoa dịu nhất lúc này.
            </p>
          </header>

          <form onSubmit={handleContinue} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              {AVAILABLE_GOALS.map((item) => {
                const isChecked = selectedGoals.includes(item.id);
                const isMaxReached =
                  selectedGoals.length >= MAX_GOALS && !isChecked;

                return (
                  <button
                    key={item.id}
                    type="button"
                    disabled={isMaxReached}
                    onClick={() => toggleGoal(item.id)}
                    className={`p-5 sm:p-5.5 rounded-2xl border text-left transition-all duration-200 select-none flex flex-col justify-between gap-3.5 h-full ${
                      isChecked
                        ? "bg-accent-soft/80 border-primary shadow-2xs ring-1 ring-primary/20"
                        : isMaxReached
                          ? "bg-surface/50 border-border/40 opacity-40 cursor-not-allowed"
                          : "bg-surface border-border hover:border-primary/40 hover:bg-bg cursor-pointer"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={`text-xs font-normal px-2.5 py-0.5 rounded-full border transition-colors ${
                          isChecked
                            ? "bg-primary/10 text-primary border-primary/25"
                            : "bg-bg text-text-muted border-border"
                        }`}
                      >
                        {item.tag}
                      </span>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                          isChecked
                            ? "bg-primary border-primary text-bg"
                            : "border-border bg-bg"
                        }`}
                      >
                        {isChecked && (
                          <Check
                            className="w-3.5 h-3.5 text-bg"
                            strokeWidth={2}
                          />
                        )}
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <span
                        className={`font-heading font-medium text-base block leading-snug ${
                          isChecked ? "text-primary" : "text-text"
                        }`}
                      >
                        {item.label}
                      </span>
                      <span className="font-body text-xs sm:text-sm text-text-muted leading-relaxed block">
                        {item.desc}
                      </span>
                    </div>
                  </button>
                );
              })}
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
                  Vui lòng chọn ít nhất 1 mục tiêu sức khỏe để tiếp tục.
                </p>
              )}
            </div>
          </form>
        </Card>
      </Container>
    </Section>
  );
}
