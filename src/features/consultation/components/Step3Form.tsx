"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, Check, Sparkles } from "lucide-react";
import { Container, Section, Heading, Card, Button, DisclaimerNote } from "@/components/ui";
import { useConsultation } from "../context";
import { FIXED_LABELS } from "@/config/copy";

interface GoalItem {
  id: string;
  label: string;
  desc: string;
}

const AVAILABLE_GOALS: GoalItem[] = [
  {
    id: "digestion",
    label: "Khó tiêu, đầy bụng, ậm ạch",
    desc: "Cần xoa dịu đường ruột và nhẹ bụng sau những ngày ăn uống quá tải",
  },
  {
    id: "heat",
    label: "Nóng trong, háo nước, khô người",
    desc: "Bổ sung lượng nước tự nhiên và khoáng chất thực vật tươi mát",
  },
  {
    id: "weight",
    label: "Hỗ trợ cảm giác nhẹ nhõm vóc dáng",
    desc: "Giảm tích nước và hỗ trợ thói quen ăn uống thanh đạm",
  },
  {
    id: "acne",
    label: "Mụn ẩn, da kém tươi sáng",
    desc: "Bổ sung vitamin tự nhiên từ rau củ tươi giúp da sáng khỏe",
  },
  {
    id: "sleep",
    label: "Uể oải, ngủ chập chờn",
    desc: "Tạo nhịp nghỉ cho hệ tiêu hóa vào buổi tối giúp ngủ sâu giấc hơn",
  },
  {
    id: "other",
    label: "Mục tiêu khác hoặc duy trì lối sống xanh",
    desc: "Thưởng thức rau củ tự nhiên hàng ngày như một thói quen tích cực",
  },
];

const DEFAULT_PRESET_GOALS = ["digestion", "heat"];

export function Step3Form() {
  const router = useRouter();
  const { goals: savedGoals, updateGoals } = useConsultation();
  // If user has saved goals use them, otherwise default to digestion & heat for fast-track
  const [selected, setSelected] = useState<string[]>(
    savedGoals.length > 0 ? savedGoals : DEFAULT_PRESET_GOALS
  );
  const [error, setError] = useState<string | null>(null);

  const isDefaultPreset =
    selected.length === DEFAULT_PRESET_GOALS.length &&
    DEFAULT_PRESET_GOALS.every((id) => selected.includes(id));

  const applyDefaultPreset = () => {
    setError(null);
    setSelected(DEFAULT_PRESET_GOALS);
  };

  const toggleGoal = (id: string) => {
    setError(null);
    if (selected.includes(id)) {
      const next = selected.filter((item) => item !== id);
      if (next.length === 0) {
        setError("Vui lòng chọn ít nhất 1 mục tiêu sức khỏe.");
      }
      setSelected(next);
    } else {
      if (selected.length >= 3) {
        setError("Bạn có thể chọn tối đa 3 mục tiêu để thực đơn tập trung nhất.");
        return;
      }
      setSelected((prev) => [...prev, id]);
    }
  };

  const handleContinue = () => {
    if (selected.length === 0) {
      setError("Vui lòng chọn ít nhất 1 mục tiêu sức khỏe.");
      return;
    }
    updateGoals(selected);
    router.push("/consultation/experience");
  };

  return (
    <Section spacing="md">
      <Container className="max-w-xl space-y-6">
        <Card className="p-6 sm:p-8 space-y-6 shadow-2xs">
          <div className="space-y-2">
            <span className="text-xs font-medium text-primary tracking-wide block">
              Bước 3/4 · Vấn đề và mục tiêu
            </span>
            <Heading level={1} size="2xl" className="font-semibold text-2xl sm:text-3xl text-text">
              Mục tiêu bạn muốn cải thiện
            </Heading>
            <p className="font-body text-sm text-text-muted leading-relaxed">
              Chọn nhanh mục tiêu chính (tối đa 3 mục tiêu) để quán cân đối công thức rau củ phù hợp.
            </p>
          </div>

          {/* Lựa chọn nhanh mặc định (Fast-track) */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={applyDefaultPreset}
              className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 ease-soft flex items-start gap-3.5 select-none hover:-translate-y-0.5 active:scale-[0.99] ${
                isDefaultPreset
                  ? "bg-accent-soft/70 border-primary shadow-2xs"
                  : "bg-surface border-border hover:border-primary/40 hover:bg-bg"
              }`}
            >
              <div
                className={`mt-0.5 h-5 w-5 rounded-full flex items-center justify-center shrink-0 border transition-all duration-200 ${
                  isDefaultPreset
                    ? "bg-primary border-primary text-bg scale-105"
                    : "border-border bg-bg text-transparent scale-95"
                }`}
                aria-hidden="true"
              >
                <Check size={12} strokeWidth={3} />
              </div>
              <div className="space-y-1 flex-1">
                <span className="font-body text-base font-semibold text-text flex items-center gap-1.5">
                  <Sparkles size={14} className="text-primary" />
                  <span>Để quán phối hợp rau củ thanh mát (tiêu hóa & giải nhiệt)</span>
                </span>
                <p className="font-body text-xs sm:text-sm text-text-muted leading-relaxed">
                  Tập trung xoa dịu đường ruột và thanh nhiệt nhẹ nhàng từ rau củ tươi.
                </p>
              </div>
            </button>
          </div>

          {/* Danh sách mục tiêu chi tiết */}
          <div className="space-y-3 pt-1">
            <label className="font-body text-xs font-medium text-text-muted select-none block">
              Hoặc chọn tối đa 3 mục tiêu cụ thể dưới đây:
            </label>
            <div className="flex flex-col gap-2.5">
              {AVAILABLE_GOALS.map((goal) => {
                const isChecked = selected.includes(goal.id);
                return (
                  <button
                    key={goal.id}
                    type="button"
                    onClick={() => toggleGoal(goal.id)}
                    className={`w-full p-3.5 rounded-2xl border text-left transition-all duration-200 ease-soft flex items-start gap-3 select-none hover:-translate-y-0.5 active:scale-[0.99] ${
                      isChecked
                        ? "bg-accent-soft/70 border-primary shadow-2xs"
                        : "bg-surface border-border hover:border-primary/40 hover:bg-bg"
                    }`}
                  >
                    <div
                      className={`mt-0.5 h-4.5 w-4.5 rounded-full flex items-center justify-center shrink-0 border transition-all duration-200 ${
                        isChecked
                          ? "bg-primary border-primary text-bg scale-105"
                          : "border-border bg-bg text-transparent scale-95"
                      }`}
                      aria-hidden="true"
                    >
                      <Check size={11} strokeWidth={3} />
                    </div>
                    <div className="space-y-0.5 flex-1">
                      <span className="font-body text-sm font-semibold text-text block">
                        {goal.label}
                      </span>
                      <p className="font-body text-xs text-text-muted leading-relaxed">
                        {goal.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {error ? (
            <p className="font-body text-xs text-error font-medium">{error}</p>
          ) : null}

          {/* Nút hành động */}
          <div className="pt-4 flex items-center justify-between gap-3">
            <Button
              variant="ghost"
              rounded="full"
              type="button"
              onClick={() => router.push("/consultation/body")}
              className="px-6 min-h-12 text-base font-medium select-none transition-all duration-200 hover:-translate-y-0.5 active:scale-95 group"
            >
              <ArrowLeft size={16} strokeWidth={1.75} aria-hidden="true" className="transition-transform duration-200 group-hover:-translate-x-1" />
              <span>{FIXED_LABELS.ACTION_BACK}</span>
            </Button>
            <Button
              variant="primary"
              rounded="full"
              type="button"
              onClick={handleContinue}
              className="px-8 min-h-12 text-base font-medium select-none shadow-xs transition-all duration-200 hover:-translate-y-0.5 active:scale-95 group"
            >
              <span>{FIXED_LABELS.ACTION_CONTINUE}</span>
              <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
          </div>

          <DisclaimerNote className="pt-2" />
        </Card>
      </Container>
    </Section>
  );
}
