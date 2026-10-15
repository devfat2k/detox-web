"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, Check, X } from "lucide-react";
import {
  Container,
  Section,
  Heading,
  Card,
  Button,
  Input,
} from "@/components/ui";
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

const VEGETABLE_INGREDIENTS = [
  "Cần tây",
  "Củ dền",
  "Dứa (thơm)",
  "Gừng",
  "Bạc hà",
  "Khổ qua",
  "Ớt chuông",
];

const SENSITIVE_ALLERGENS = [
  "Các loại hạt (hạnh nhân, óc chó)",
  "Đậu nành",
  "Sữa bò",
  "Mật ong",
  "Gluten",
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
    safety ? !hasAnyMedicalIssue : true,
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
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item],
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
          "Rất tiếc, thể trạng của bạn hiện tại chưa thích hợp để áp dụng liệu trình detox thanh lọc.",
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
      <Container className="max-w-7xl space-y-6">
        <Card className="p-6 sm:p-10 space-y-8">
          <header className="space-y-2 border-b border-border/60 pb-5">
            <span className="text-md font-mono font-medium text-primary tracking-wider block">
              Bước 4/4 · Tiêu chuẩn an toàn
            </span>
            <Heading
              level={1}
              className="text-2xl sm:text-3xl font-semibold text-text"
            >
              Lưu ý an toàn & Dị ứng
            </Heading>
            <p className="font-body text-sm sm:text-base text-text-muted leading-relaxed">
              Đảm bảo liệu trình an toàn và phù hợp nhất với thể trạng, cơ địa
              của bạn.
            </p>
          </header>

          <form onSubmit={handleContinue} className="space-y-8">
            <div className="space-y-5">
              <div className="space-y-1">
                <span className="font-body text-base font-semibold text-text select-none block">
                  1. Dị ứng hoặc không quen dùng nguyên liệu nào?
                </span>
                <p className="font-body text-xs sm:text-sm text-text-muted leading-relaxed">
                  Quán sẽ điều chỉnh công thức, loại bỏ hoặc thay thế nguyên
                  liệu phù hợp trong thực đơn của bạn.
                </p>
              </div>

              <div className="space-y-2.5 p-4 sm:p-5 rounded-2xl bg-surface border border-border">
                <span className="text-xs font-medium text-text-muted block select-none">
                  Nguyên liệu rau củ thường gặp:
                </span>
                <div className="flex flex-wrap gap-2">
                  {VEGETABLE_INGREDIENTS.map((item) => {
                    const isSelected = allergies.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleAllergen(item)}
                        className={`px-3.5 py-1.5 rounded-full font-body text-xs font-medium transition-all duration-200 select-none flex items-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? "bg-primary text-bg shadow-2xs border border-primary font-semibold"
                            : "bg-bg text-text border border-border hover:border-primary/40 hover:bg-surface"
                        }`}
                      >
                        {isSelected && (
                          <Check
                            className="w-3.5 h-3.5 text-bg"
                            strokeWidth={1.75}
                          />
                        )}
                        <span>{item}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2.5 p-4 sm:p-5 rounded-2xl bg-surface border border-border">
                <span className="text-xs font-medium text-text-muted block select-none">
                  Nhóm dị ứng / cơ địa nhạy cảm:
                </span>
                <div className="flex flex-wrap gap-2">
                  {SENSITIVE_ALLERGENS.map((item) => {
                    const isSelected = allergies.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleAllergen(item)}
                        className={`px-3.5 py-1.5 rounded-full font-body text-xs font-medium transition-all duration-200 select-none flex items-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? "bg-primary text-bg shadow-2xs border border-primary font-semibold"
                            : "bg-bg text-text border border-border hover:border-primary/40 hover:bg-surface"
                        }`}
                      >
                        {isSelected && (
                          <Check
                            className="w-3.5 h-3.5 text-bg"
                            strokeWidth={1.75}
                          />
                        )}
                        <span>{item}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2.5 p-4 sm:p-5 rounded-2xl bg-surface border border-border">
                <label
                  htmlFor="custom-allergen"
                  className="font-body text-xs sm:text-sm font-medium text-text select-none block"
                >
                  Nguyên liệu khác ngoài danh sách trên (nếu có):
                </label>
                <div className="relative flex items-center">
                  <Input
                    id="custom-allergen"
                    placeholder="Nhập nguyên liệu (ví dụ: kiwi, dưa leo...) rồi nhấn Enter"
                    value={customAllergen}
                    onChange={(e) => setCustomAllergen(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addCustomAllergen();
                      }
                    }}
                    className="pr-20 text-sm"
                  />
                  {customAllergen.trim() && (
                    <button
                      type="button"
                      onClick={() => addCustomAllergen()}
                      className="absolute right-2 px-3 py-1 text-xs font-medium rounded-md bg-primary text-bg hover:opacity-90 transition-opacity"
                    >
                      Thêm
                    </button>
                  )}
                </div>

                {allergies.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t border-border/60">
                    <span className="text-xs text-text-muted block">
                      Đã ghi nhận ({allergies.length}):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {allergies.map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-soft text-primary border border-primary/25 text-xs font-medium"
                        >
                          <span>{item}</span>
                          <button
                            type="button"
                            onClick={() => removeAllergen(item)}
                            className="hover:text-error focus:outline-none p-0.5 rounded cursor-pointer"
                            aria-label={`Xóa ${item}`}
                          >
                            <X className="w-3 h-3" strokeWidth={1.75} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-border/60">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-body text-base font-semibold text-text select-none block">
                    2. Tình trạng sức khỏe đặc biệt
                  </span>
                </div>
                <p className="font-body text-xs sm:text-sm text-text-muted leading-relaxed">
                  Thông tin giúp đảm bảo an toàn tuyệt đối, không gây quá tải
                  cho cơ thể.
                </p>
              </div>

              <button
                type="button"
                onClick={selectHealthy}
                className={`w-full p-4.5 sm:p-5 rounded-2xl border text-left transition-all duration-200 select-none flex items-center gap-4 cursor-pointer ${
                  isHealthyPreset
                    ? "bg-accent-soft/80 border-primary shadow-2xs ring-1 ring-primary/20"
                    : "bg-surface border-border hover:border-primary/40 hover:bg-bg"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                    isHealthyPreset
                      ? "bg-primary border-primary text-bg"
                      : "border-border bg-bg"
                  }`}
                >
                  {isHealthyPreset && (
                    <Check className="w-3.5 h-3.5 text-bg" strokeWidth={2} />
                  )}
                </div>
                <div className="space-y-0.5">
                  <span
                    className={`font-heading font-medium text-base block ${isHealthyPreset ? "text-primary" : "text-text"}`}
                  >
                    Cơ thể bình thường / Sức khỏe ổn định
                  </span>
                  <span className="font-body text-xs sm:text-sm text-text-muted leading-relaxed block">
                    Không mang thai, không có bệnh lý nền nặng hay dùng thuốc
                    điều trị chuyên khoa
                  </span>
                </div>
              </button>

              <div className="space-y-2.5 pt-1">
                <span className="text-xs text-text-muted block select-none">
                  Hoặc chọn nếu bạn thuộc một trong các trường hợp sau:
                </span>
                {MEDICAL_CONDITIONS.map((cond) => {
                  const isChecked = medicalAnswers[cond.key];
                  return (
                    <button
                      key={cond.key}
                      type="button"
                      onClick={() => toggleMedical(cond.key)}
                      className={`w-full p-4 sm:p-4.5 rounded-2xl border text-left transition-all duration-200 select-none flex items-start gap-4 cursor-pointer ${
                        isChecked
                          ? "bg-error/10 border-error/50 shadow-2xs"
                          : "bg-surface border-border hover:border-border-hover hover:bg-bg"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                          isChecked
                            ? "bg-error border-error text-bg"
                            : "border-border bg-bg"
                        }`}
                      >
                        {isChecked && (
                          <Check className="w-3 h-3 text-bg" strokeWidth={2} />
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <span
                          className={`font-heading font-medium text-sm sm:text-base block ${isChecked ? "text-error" : "text-text"}`}
                        >
                          {cond.label}
                        </span>
                        <span className="font-body text-xs sm:text-sm text-text-muted leading-relaxed block">
                          {cond.desc}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

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
