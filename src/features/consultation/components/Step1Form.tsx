"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { Container, Section, Heading, Card, Button, Chip } from "@/components/ui";
import { useConsultation } from "../context";
import { evaluateSafety, type SafetyAnswers } from "@/domain/screening";
import { FIXED_LABELS } from "@/config/copy";

export function Step1Form() {
  const router = useRouter();
  const { safety, updateSafety, setIneligible } = useConsultation();

  const [answers, setAnswers] = useState<SafetyAnswers>(
    safety ?? {
      pregnantOrNursing: false,
      medicalConditions: false,
      regularMedication: false,
      eatingDisorder: false,
      allergies: false,
    }
  );

  const hasAnyIssue =
    answers.pregnantOrNursing ||
    answers.medicalConditions ||
    answers.regularMedication ||
    answers.eatingDisorder ||
    answers.allergies;

  const [isHealthyPreset, setIsHealthyPreset] = useState<boolean>(!hasAnyIssue);

  const selectHealthy = () => {
    setIsHealthyPreset(true);
    setAnswers({
      pregnantOrNursing: false,
      medicalConditions: false,
      regularMedication: false,
      eatingDisorder: false,
      allergies: false,
    });
  };

  const toggle = (key: keyof SafetyAnswers) => {
    setIsHealthyPreset(false);
    setAnswers((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      const stillHasIssue = Object.values(next).some(Boolean);
      if (!stillHasIssue) {
        setIsHealthyPreset(true);
      }
      return next;
    });
  };

  const handleContinue = () => {
    updateSafety(answers);
    const result = evaluateSafety(answers);
    if (!result.isEligible && result.reason) {
      setIneligible(result.reason);
      router.push("/consultation/ineligible");
    } else {
      router.push("/consultation/body");
    }
  };

  return (
    <Section spacing="md">
      <Container className="max-w-xl space-y-6">
        <Card className="p-6 sm:p-8 space-y-6 shadow-2xs">
          <div className="space-y-2">
            <span className="text-xs font-medium text-primary tracking-wide block">
              Bước 1/4 · Lưu ý an toàn
            </span>
            <Heading level={1} size="2xl" className="font-semibold text-2xl sm:text-3xl text-text">
              Lưu ý an toàn sức khỏe
            </Heading>
            <p className="font-body text-sm text-text-muted leading-relaxed">
              Khảo sát nhanh để đảm bảo trải nghiệm nước ép rau củ hoàn toàn nhẹ nhàng và phù hợp thể trạng của bạn.
            </p>
          </div>

          {/* Lựa chọn mặc định nhanh (Fast-track) */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={selectHealthy}
              className={`w-full p-4 rounded-2xl border text-left transition-all duration-fast flex items-start gap-3.5 select-none ${
                isHealthyPreset
                  ? "bg-accent-soft/70 border-primary shadow-2xs"
                  : "bg-surface border-border hover:border-primary/40 hover:bg-bg"
              }`}
            >
              <div
                className={`mt-0.5 h-5 w-5 rounded-full flex items-center justify-center shrink-0 border transition-colors ${
                  isHealthyPreset
                    ? "bg-primary border-primary text-bg"
                    : "border-border bg-bg text-transparent"
                }`}
                aria-hidden="true"
              >
                <Check size={12} strokeWidth={3} />
              </div>
              <div className="space-y-1 flex-1">
                <span className="font-body text-base font-semibold text-text block">
                  Sức khỏe mình hoàn toàn bình thường
                </span>
                <p className="font-body text-xs sm:text-sm text-text-muted leading-relaxed">
                  Không mang thai/cho con bú, không bệnh nền mãn tính và không dùng thuốc điều trị dài ngày.
                </p>
              </div>
            </button>
          </div>

          {/* Nhóm tùy chọn chi tiết nếu có */}
          <div className="space-y-3 pt-1">
            <label className="font-body text-xs font-medium text-text-muted select-none block">
              Hoặc đánh dấu các trường hợp bạn cần lưu ý:
            </label>
            <div className="flex flex-col gap-2.5">
              {[
                { key: "pregnantOrNursing" as const, label: "Đang mang thai hoặc cho con bú" },
                { key: "medicalConditions" as const, label: "Có bệnh nền (tiểu đường, gan, thận, tim mạch, dạ dày nặng)" },
                { key: "regularMedication" as const, label: "Đang dùng thuốc điều trị thường xuyên" },
                { key: "eatingDisorder" as const, label: "Từng hoặc đang có rối loạn ăn uống" },
                { key: "allergies" as const, label: "Dị ứng nguyên liệu (cần tây, hạt, dứa...) — Quán sẽ thay thế món" },
              ].map((item) => {
                const isChecked = answers[item.key];
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => toggle(item.key)}
                    className={`w-full p-3.5 rounded-2xl border text-left transition-all duration-fast flex items-center gap-3 select-none ${
                      isChecked
                        ? "bg-accent-soft/70 border-primary shadow-2xs font-medium"
                        : "bg-surface border-border hover:border-primary/40 hover:bg-bg"
                    }`}
                  >
                    <div
                      className={`h-4.5 w-4.5 rounded-full flex items-center justify-center shrink-0 border transition-colors ${
                        isChecked
                          ? "bg-primary border-primary text-bg"
                          : "border-border bg-bg text-transparent"
                      }`}
                      aria-hidden="true"
                    >
                      <Check size={11} strokeWidth={3} />
                    </div>
                    <span className="font-body text-sm text-text flex-1">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-3 flex justify-end">
            <Button
              variant="primary"
              rounded="full"
              onClick={handleContinue}
              className="w-full sm:w-auto px-8 min-h-12 text-base font-medium select-none shadow-xs"
            >
              <span>{FIXED_LABELS.ACTION_CONTINUE}</span>
              <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
            </Button>
          </div>
        </Card>
      </Container>
    </Section>
  );
}
