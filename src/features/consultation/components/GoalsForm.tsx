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
  label: string;
  desc: string;
}

const AVAILABLE_GOALS: GoalItem[] = [
  {
    id: "digestion",
    label: "Nặng bụng, đầy hơi, khó tiêu",
    desc: "Cảm giác bụng ậm ạch, cần xoa dịu đường ruột với chất xơ hòa tan và enzyme tự nhiên",
  },
  {
    id: "weight",
    label: "Hỗ trợ giảm mỡ & nhẹ nhõm vòng eo",
    desc: "Giảm cảm giác tích nước nặng nề, hỗ trợ cơ thể thanh thoát và nhẹ bụng rõ rệt",
  },
  {
    id: "heat",
    label: "Nóng trong, ăn nhiều dầu mỡ đồ cay",
    desc: "Bổ sung nước ép giàu kali và khoáng chất thực vật thanh mát giúp hạ nhiệt cơ thể",
  },
  {
    id: "acne",
    label: "Da sạm, mệt mỏi, thiếu năng lượng",
    desc: "Bổ sung diệp lục tươi và vitamin A, C tự nhiên giúp tinh thần tươi tỉnh và sáng da",
  },
  {
    id: "sleep",
    label: "Uể oải, khó ngủ sâu giấc",
    desc: "Tạo khoảng nghỉ êm dịu cho dạ dày vào buổi tối với sữa hạt và trà thảo mộc",
  },
  {
    id: "other",
    label: "Thanh lọc định kỳ & duy trì lối sống xanh",
    desc: "Thưởng thức rau củ tự nhiên hàng ngày như một thói quen tích cực, lành mạnh",
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

  const isValid = selectedGoals.length >= 1 && selectedGoals.length <= MAX_GOALS;

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
      <Container className="max-w-xl space-y-6">
        <Card className="p-6 sm:p-8 space-y-6">
          <header className="space-y-1.5 border-b border-border/60 pb-4">
            <span className="text-xs font-medium text-primary tracking-wide block uppercase">
              Bước 2/4 · Nhu cầu sức khỏe
            </span>
            <Heading level={1} className="text-2xl sm:text-3xl font-semibold text-text">
              Vấn đề và mục tiêu
            </Heading>
            <p className="font-body text-sm text-text-muted leading-relaxed">
              Chọn tối đa 3 nhu cầu cơ thể bạn cần xoa dịu nhất lúc này.
            </p>
          </header>

          <form onSubmit={handleContinue} className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-body text-text-muted">
                <span>Chọn từ 1 đến 3 mục tiêu</span>
                <span className={selectedGoals.length === MAX_GOALS ? "text-primary font-semibold" : ""}>
                  Đã chọn: {selectedGoals.length}/{MAX_GOALS}
                </span>
              </div>

              <div className="space-y-2.5">
                {AVAILABLE_GOALS.map((item) => {
                  const isChecked = selectedGoals.includes(item.id);
                  const isMaxReached = selectedGoals.length >= MAX_GOALS && !isChecked;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      disabled={isMaxReached}
                      onClick={() => toggleGoal(item.id)}
                      className={`w-full p-4 rounded-xl border text-left transition-all duration-200 select-none flex items-start gap-3.5 ${
                        isChecked
                          ? "bg-accent-soft/70 border-primary shadow-2xs"
                          : isMaxReached
                            ? "bg-surface/50 border-border/50 opacity-40 cursor-not-allowed"
                            : "bg-surface border-border hover:border-primary/40 hover:bg-bg"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isChecked ? "bg-primary border-primary text-white" : "border-border bg-bg"
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />}
                      </div>
                      <div className="space-y-0.5 flex-1">
                        <span className={`font-body text-sm font-medium block ${isChecked ? "text-primary" : "text-text"}`}>
                          {item.label}
                        </span>
                        <span className="font-body text-xs text-text-muted leading-relaxed block">
                          {item.desc}
                        </span>
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
