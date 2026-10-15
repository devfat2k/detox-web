"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, Check, Plus, X } from "lucide-react";
import { Container, Section, Heading, Card, Button, Input, DisclaimerNote } from "@/components/ui";
import { useConsultation } from "../context";
import { useStepGuard } from "../hooks/use-step-guard";
import { evaluateSafety, type SafetyAnswers } from "@/domain/screening";
import { routes } from "@/config/routes";
import { FIXED_LABELS } from "@/config/copy";
import type { SafetyFormData } from "../schemas/consultation.schema";

interface MedicalConditionOption {
  key: keyof Omit<SafetyAnswers, "allergies">;
  label: string;
  desc: string;
}

const MEDICAL_CONDITIONS: MedicalConditionOption[] = [
  {
    key: "pregnantOrNursing",
    label: "Đang mang thai hoặc cho con bú",
    desc: "Giai đoạn này cơ thể cần nguồn dưỡng chất phong phú và ổn định",
  },
  {
    key: "medicalConditions",
    label: "Có bệnh nền hoặc đang điều trị chuyên khoa",
    desc: "Tiểu đường, bệnh thận hoặc sỏi thận, gan, tim mạch, huyết áp thấp nặng, viêm loét dạ dày cấp",
  },
  {
    key: "regularMedication",
    label: "Đang sử dụng thuốc điều trị thường xuyên",
    desc: "Việc thay đổi chế độ ăn có thể làm thay đổi hấp thu hoặc tương tác với dược chất",
  },
  {
    key: "eatingDisorder",
    label: "Từng hoặc đang có tiền sử rối loạn ăn uống",
    desc: "Không nên áp dụng các chế độ hạn chế calo đột ngột",
  },
];

const SUGGESTED_ALLERGENS = [
  "Cần tây",
  "Củ dền",
  "Dứa (thơm)",
  "Gừng",
  "Các loại hạt",
  "Đậu nành",
  "Sữa bò",
];

export function SafetyForm() {
  const router = useRouter();
  const { isAllowed } = useStepGuard("safety");
  const { safety, updateSafety, setIneligible } = useConsultation();

  const [medicalAnswers, setMedicalAnswers] = useState({
    pregnantOrNursing: safety?.pregnantOrNursing ?? false,
    medicalConditions: safety?.medicalConditions ?? false,
    regularMedication: safety?.regularMedication ?? false,
    eatingDisorder: safety?.eatingDisorder ?? false,
  });

  const hasAnyMedicalIssue = Object.values(medicalAnswers).some(Boolean);
  const [isHealthyPreset, setIsHealthyPreset] = useState<boolean>(
    safety ? !hasAnyMedicalIssue : true
  );

  const [allergies, setAllergies] = useState<string[]>(safety?.allergies ?? []);
  const [customAllergen, setCustomAllergen] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectHealthy = () => {
    setIsHealthyPreset(true);
    setMedicalAnswers({
      pregnantOrNursing: false,
      medicalConditions: false,
      regularMedication: false,
      eatingDisorder: false,
    });
  };

  const toggleMedical = (key: keyof typeof medicalAnswers) => {
    setIsHealthyPreset(false);
    setMedicalAnswers((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      const stillHasIssue = Object.values(next).some(Boolean);
      if (!stillHasIssue) {
        setIsHealthyPreset(true);
      }
      return next;
    });
  };

  const toggleAllergen = (item: string) => {
    setAllergies((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
    );
  };

  const addCustomAllergen = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = customAllergen.trim();
    if (trimmed && !allergies.includes(trimmed)) {
      setAllergies((prev) => [...prev, trimmed]);
      setCustomAllergen("");
    }
  };

  const removeAllergen = (item: string) => {
    setAllergies((prev) => prev.filter((a) => a !== item));
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const fullSafetyData: SafetyFormData = {
      ...medicalAnswers,
      allergies,
    };

    updateSafety(fullSafetyData);

    const evaluation = evaluateSafety({
      ...medicalAnswers,
      allergies: allergies.length > 0,
    });

    if (!evaluation.isEligible) {
      setIneligible(
        evaluation.reason ??
          "Rất tiếc, thể trạng của bạn hiện tại chưa thích hợp để áp dụng liệu trình detox thanh lọc."
      );
      router.push(routes.consultationIneligible());
      return;
    }

    router.replace(routes.consultationResult());
  };

  const handleBack = () => {
    updateSafety({
      ...medicalAnswers,
      allergies,
    });
    router.push(routes.consultationExperience());
  };

  if (!isAllowed) return null;

  return (
    <Section className="py-8 sm:py-12">
      <Container className="max-w-xl space-y-6">
        <Card className="p-6 sm:p-8 space-y-6">
          <header className="space-y-1.5 border-b border-border/60 pb-4">
            <span className="text-xs font-medium text-primary tracking-wide block uppercase">
              Bước 4/4 · Tiêu chuẩn an toàn
            </span>
            <Heading level={1} className="text-2xl sm:text-3xl font-semibold text-text">
              Lưu ý an toàn & Dị ứng
            </Heading>
            <p className="font-body text-sm text-text-muted leading-relaxed">
              Đảm bảo liệu trình an toàn tuyệt đối cho thể trạng và cơ địa của bạn.
            </p>
          </header>

          <form onSubmit={handleContinue} className="space-y-6">
            {/* Mục 1: Đánh giá y tế & an toàn */}
            <div className="space-y-3">
              <label className="font-body text-sm font-medium text-text select-none block">
                Tình trạng sức khỏe đặc biệt <span className="text-danger">*</span>
              </label>

              {/* Preset sức khỏe ổn định */}
              <button
                type="button"
                onClick={selectHealthy}
                className={`w-full p-4 rounded-xl border text-left transition-all duration-200 select-none flex items-center gap-3.5 ${
                  isHealthyPreset
                    ? "bg-accent-soft/70 border-primary shadow-2xs"
                    : "bg-surface border-border hover:border-primary/40 hover:bg-bg"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                    isHealthyPreset ? "bg-primary border-primary text-white" : "border-border bg-bg"
                  }`}
                >
                  {isHealthyPreset && <Check className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />}
                </div>
                <div className="space-y-0.5">
                  <span className={`font-body text-sm font-semibold block ${isHealthyPreset ? "text-primary" : "text-text"}`}>
                    Sức khỏe hoàn toàn ổn định
                  </span>
                  <span className="font-body text-xs text-text-muted leading-relaxed block">
                    Không mang thai, không có bệnh nền hoặc dùng thuốc điều trị kéo dài
                  </span>
                </div>
              </button>

              <div className="space-y-2.5 pt-1">
                {MEDICAL_CONDITIONS.map((cond) => {
                  const isChecked = medicalAnswers[cond.key];
                  return (
                    <button
                      key={cond.key}
                      type="button"
                      onClick={() => toggleMedical(cond.key)}
                      className={`w-full p-3.5 rounded-xl border text-left transition-all duration-200 select-none flex items-start gap-3 ${
                        isChecked
                          ? "bg-danger/10 border-danger/40"
                          : "bg-surface border-border hover:border-border-hover hover:bg-bg"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                          isChecked ? "bg-danger border-danger text-white" : "border-border bg-bg"
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                      </div>
                      <div className="space-y-0.5">
                        <span className={`font-body text-sm font-medium block ${isChecked ? "text-danger" : "text-text"}`}>
                          {cond.label}
                        </span>
                        <span className="font-body text-xs text-text-muted leading-relaxed block">
                          {cond.desc}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mục 2: Dị ứng nguyên liệu riêng biệt (không chặn) */}
            <div className="space-y-3 pt-3 border-t border-border/60">
              <div>
                <label className="font-body text-sm font-medium text-text select-none block">
                  Dị ứng hoặc không quen dùng nguyên liệu nào?
                </label>
                <p className="font-body text-xs text-text-muted mt-0.5">
                  Quán sẽ ghi chú loại bỏ hoặc đề xuất công thức thay thế trong lộ trình của bạn.
                </p>
              </div>

              {/* Danh sách đề xuất chọn nhanh */}
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_ALLERGENS.map((item) => {
                  const isSelected = allergies.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleAllergen(item)}
                      className={`px-3 py-1.5 rounded-full font-body text-xs font-medium transition-all duration-200 select-none flex items-center gap-1.5 ${
                        isSelected
                          ? "bg-primary text-white shadow-2xs border border-primary"
                          : "bg-surface text-text-muted border border-border hover:border-primary/40 hover:text-text hover:bg-bg"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 text-white" strokeWidth={2.5} />}
                      <span>{item}</span>
                    </button>
                  );
                })}
              </div>

              {/* Ô tự nhập nguyên liệu khác */}
              <div className="flex gap-2 pt-1">
                <Input
                  placeholder="Nhập nguyên liệu khác nếu có (ví dụ: bạc hà, kiwi...)"
                  value={customAllergen}
                  onChange={(e) => setCustomAllergen(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addCustomAllergen();
                    }
                  }}
                  className="flex-1 text-sm"
                />
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => addCustomAllergen()}
                  disabled={!customAllergen.trim()}
                  className="shrink-0 flex items-center gap-1.5 text-xs px-3"
                >
                  <Plus className="w-3.5 h-3.5" strokeWidth={2} />
                  <span>Thêm</span>
                </Button>
              </div>

              {/* Danh sách tags đã chọn/nhập */}
              {allergies.length > 0 && (
                <div className="space-y-1 pt-1">
                  <span className="text-[11px] font-medium text-text-muted uppercase tracking-wider block">
                    Đã ghi nhận ({allergies.length}):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {allergies.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-accent-soft/80 border border-primary/20 text-primary text-xs font-medium"
                      >
                        <span>{item}</span>
                        <button
                          type="button"
                          onClick={() => removeAllergen(item)}
                          className="hover:text-danger focus:outline-none p-0.5 rounded"
                          aria-label={`Xóa ${item}`}
                        >
                          <X className="w-3 h-3" strokeWidth={2.5} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <DisclaimerNote>
              Lộ trình mang tính tham khảo dinh dưỡng thực vật lành mạnh, không thay thế chẩn đoán hay điều trị y tế chuyên sâu.
            </DisclaimerNote>

            {/* Điều hướng */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
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
                disabled={isSubmitting}
                className="w-full flex-1 flex items-center justify-center gap-2 min-h-12 text-base shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{FIXED_LABELS.ACTION_VIEW_MY_PLAN}</span>
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </Button>
            </div>
          </form>
        </Card>
      </Container>
    </Section>
  );
}
