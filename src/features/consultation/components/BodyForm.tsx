"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { Container, Section, Heading, Card, Button, Input, DisclaimerNote } from "@/components/ui";
import { useConsultation } from "../context";
import { evaluateBody, calculateBmi } from "@/domain/screening";
import { FIXED_LABELS } from "@/config/copy";
import { routes } from "@/config/routes";
import type { BodyFormData } from "../schemas/consultation.schema";

const ACTIVITY_OPTIONS = [
  {
    id: "low" as const,
    label: "Ít vận động",
    desc: "Làm việc văn phòng, ít đi lại hoặc tập luyện nhẹ dưới 1 buổi/tuần",
  },
  {
    id: "moderate" as const,
    label: "Vận động vừa phải",
    desc: "Đi lại thường xuyên hoặc tập thể dục nhẹ nhàng 2–3 buổi/tuần",
  },
  {
    id: "high" as const,
    label: "Năng động",
    desc: "Chơi thể thao thường xuyên, lao động thể chất hoặc tập gym 4+ buổi/tuần",
  },
];

export function BodyForm() {
  const router = useRouter();
  const { body, updateBody, setIneligible } = useConsultation();

  const [name, setName] = useState(body?.name ?? "");
  const [gender, setGender] = useState<"female" | "male">(body?.gender ?? "female");
  const [age, setAge] = useState(body?.age ? String(body.age) : "");
  const [heightCm, setHeightCm] = useState(body?.heightCm ? String(body.heightCm) : "");
  const [weightKg, setWeightKg] = useState(body?.weightKg ? String(body.weightKg) : "");
  const [activityLevel, setActivityLevel] = useState<"low" | "moderate" | "high" | null>(
    body?.activityLevel ?? null
  );

  const [touched, setTouched] = useState({
    name: false,
    age: false,
    height: false,
    weight: false,
  });

  const parsedAge = Number(age);
  const parsedHeight = Number(heightCm);
  const parsedWeight = Number(weightKg);

  const errors = useMemo(() => {
    const errs: Record<string, string | undefined> = {};

    if (!name.trim()) {
      errs.name = "Vui lòng nhập tên của bạn";
    }

    if (!age) {
      errs.age = "Vui lòng nhập tuổi";
    } else if (parsedAge < 18 || parsedAge > 80) {
      errs.age = "Độ tuổi tham gia từ 18 đến 80 tuổi";
    }

    if (!heightCm) {
      errs.height = "Vui lòng nhập chiều cao";
    } else if (parsedHeight < 120 || parsedHeight > 220) {
      errs.height = "Chiều cao từ 120cm đến 220cm";
    }

    if (!weightKg) {
      errs.weight = "Vui lòng nhập cân nặng";
    } else if (parsedWeight < 35 || parsedWeight > 180) {
      errs.weight = "Cân nặng từ 35kg đến 180kg";
    }

    if (!activityLevel) {
      errs.activity = "Vui lòng chọn mức độ vận động";
    }

    return errs;
  }, [name, age, heightCm, weightKg, activityLevel, parsedAge, parsedHeight, parsedWeight]);

  const isValid = Object.keys(errors).length === 0;

  const currentBmi = useMemo(() => {
    if (parsedHeight >= 120 && parsedWeight >= 35) {
      return calculateBmi(parsedHeight, parsedWeight);
    }
    return 0;
  }, [parsedHeight, parsedWeight]);

  const bmiAssessment = useMemo(() => {
    if (currentBmi <= 0) return null;
    if (currentBmi < 18.5) {
      return {
        category: "Thiếu cân nhẹ (BMI < 18.5)",
        desc: "Cơ thể cần nạp đủ năng lượng và bổ sung dinh dưỡng đều đặn.",
        colorClass: "text-amber-700 bg-amber-50 border-amber-200",
      };
    }
    if (currentBmi < 23) {
      return {
        category: "Thể trạng chuẩn cân đối (BMI 18.5 – 22.9)",
        desc: "Chỉ số lý tưởng, rất thích hợp để duy trì lối sống xanh và thanh lọc.",
        colorClass: "text-primary bg-accent-soft/50 border-primary/20",
      };
    }
    if (currentBmi < 25) {
      return {
        category: "Hơi đầy đặn (BMI 23 – 24.9)",
        desc: "Liệu trình nước ép và sinh tố xanh sẽ giúp xoa dịu đường ruột và nhẹ bụng rõ rệt.",
        colorClass: "text-primary bg-accent-soft/60 border-primary/30",
      };
    }
    return {
      category: "Thừa cân nhẹ (BMI ≥ 25)",
      desc: "Nên bắt đầu với nhịp độ êm dịu để cơ thể làm quen mà không tạo áp lực đói mệt.",
      colorClass: "text-amber-800 bg-amber-50/80 border-amber-300",
    };
  }, [currentBmi]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || !activityLevel) return;

    const evaluation = evaluateBody({
      age: parsedAge,
      heightCm: parsedHeight,
      weightKg: parsedWeight,
    });

    if (!evaluation.isEligible) {
      setIneligible(evaluation.reason || "Thể trạng chưa phù hợp với liệu trình.");
      router.push(routes.consultationIneligible());
      return;
    }

    const bodyData: BodyFormData = {
      name: name.trim(),
      gender,
      age: parsedAge,
      heightCm: parsedHeight,
      weightKg: parsedWeight,
      activityLevel,
    };

    updateBody(bodyData, evaluation.warningMessage);
    router.push(routes.consultationGoals());
  };

  return (
    <Section className="py-8 sm:py-12">
      <Container className="max-w-xl space-y-6">
        <Card className="p-6 sm:p-8 space-y-6">
          <header className="space-y-1.5 border-b border-border/60 pb-4">
            <span className="text-xs font-medium text-primary tracking-wide block uppercase">
              Bước 1/4 · Khảo sát thể trạng
            </span>
            <Heading level={1} className="text-2xl sm:text-3xl font-semibold text-text">
              Thông tin cơ thể
            </Heading>
            <p className="font-body text-sm text-text-muted leading-relaxed">
              Ước tính chỉ số BMI và mức năng lượng phù hợp với bạn trong 30 giây.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tên bạn */}
            <div className="space-y-1.5">
              <label htmlFor="customer-name" className="font-body text-sm font-medium text-text select-none block">
                Tên bạn: <span className="text-danger">*</span>
              </label>
              <Input
                id="customer-name"
                placeholder="Ví dụ: Phương, Lan, Minh..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
                aria-invalid={touched.name && Boolean(errors.name)}
              />
              {touched.name && errors.name && (
                <p className="font-body text-xs text-danger">{errors.name}</p>
              )}
            </div>

            {/* Giới tính */}
            <div className="space-y-2">
              <label className="font-body text-sm font-medium text-text select-none block">
                Giới tính
              </label>
              <div className="inline-flex gap-2 p-1 rounded-lg bg-bg border border-border">
                <button
                  type="button"
                  onClick={() => setGender("female")}
                  className={`px-4 py-2 rounded-md font-body text-sm font-medium transition-all duration-200 select-none flex items-center gap-1.5 ${
                    gender === "female"
                      ? "bg-surface text-primary shadow-2xs border border-primary/20"
                      : "text-text-muted hover:text-text"
                  }`}
                >
                  {gender === "female" && <Check className="w-3.5 h-3.5 text-primary" strokeWidth={2} />}
                  <span>Nữ</span>
                </button>
                <button
                  type="button"
                  onClick={() => setGender("male")}
                  className={`px-4 py-2 rounded-md font-body text-sm font-medium transition-all duration-200 select-none flex items-center gap-1.5 ${
                    gender === "male"
                      ? "bg-surface text-primary shadow-2xs border border-primary/20"
                      : "text-text-muted hover:text-text"
                  }`}
                >
                  {gender === "male" && <Check className="w-3.5 h-3.5 text-primary" strokeWidth={2} />}
                  <span>Nam</span>
                </button>
              </div>
            </div>

            {/* Bộ 3 thông số: Tuổi, Chiều cao, Cân nặng */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="customer-age" className="font-body text-sm font-medium text-text select-none block">
                  Tuổi <span className="text-danger">*</span>
                </label>
                <Input
                  id="customer-age"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="28"
                  unit="tuổi"
                  value={age}
                  onChange={(e) => setAge(e.target.value.replace(/\D/g, "").slice(0, 2))}
                  onBlur={() => setTouched((prev) => ({ ...prev, age: true }))}
                />
                {touched.age && errors.age && (
                  <p className="font-body text-xs text-danger">{errors.age}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="customer-height" className="font-body text-sm font-medium text-text select-none block">
                  Chiều cao <span className="text-danger">*</span>
                </label>
                <Input
                  id="customer-height"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="160"
                  unit="cm"
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value.replace(/\D/g, "").slice(0, 3))}
                  onBlur={() => setTouched((prev) => ({ ...prev, height: true }))}
                />
                {touched.height && errors.height && (
                  <p className="font-body text-xs text-danger">{errors.height}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="customer-weight" className="font-body text-sm font-medium text-text select-none block">
                  Cân nặng <span className="text-danger">*</span>
                </label>
                <Input
                  id="customer-weight"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="52"
                  unit="kg"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value.replace(/\D/g, "").slice(0, 3))}
                  onBlur={() => setTouched((prev) => ({ ...prev, weight: true }))}
                />
                {touched.weight && errors.weight && (
                  <p className="font-body text-xs text-danger">{errors.weight}</p>
                )}
              </div>
            </div>

            {/* Mức độ vận động */}
            <div className="space-y-2 pt-1">
              <label className="font-body text-sm font-medium text-text select-none block">
                Mức độ vận động hàng ngày <span className="text-danger">*</span>
              </label>
              <div className="grid grid-cols-1 gap-2.5">
                {ACTIVITY_OPTIONS.map((opt) => {
                  const isSelected = activityLevel === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setActivityLevel(opt.id)}
                      className={`w-full p-3.5 rounded-xl border text-left transition-all duration-200 select-none flex items-start gap-3 ${
                        isSelected
                          ? "bg-accent-soft/70 border-primary shadow-2xs"
                          : "bg-surface border-border hover:border-primary/40 hover:bg-bg"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                          isSelected ? "border-primary bg-primary" : "border-border bg-bg"
                        }`}
                      >
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <div className="space-y-0.5">
                        <span className={`font-body text-sm font-medium block ${isSelected ? "text-primary" : "text-text"}`}>
                          {opt.label}
                        </span>
                        <span className="font-body text-xs text-text-muted leading-relaxed block">
                          {opt.desc}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
              {errors.activity && touched.name && (
                <p className="font-body text-xs text-danger pt-1">{errors.activity}</p>
              )}
            </div>

            {/* Khối Ước tính thể trạng (BMI) đặt ở cuối form */}
            {bmiAssessment && (
              <div className={`p-4 rounded-xl border transition-all duration-300 space-y-1 ${bmiAssessment.colorClass}`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    Ước tính thể trạng
                  </span>
                  <span className="font-heading font-semibold text-base">
                    BMI: {currentBmi}
                  </span>
                </div>
                <p className="font-body text-sm font-medium">
                  {bmiAssessment.category}
                </p>
                <p className="font-body text-xs leading-relaxed opacity-90">
                  {bmiAssessment.desc}
                </p>
              </div>
            )}

            {/* Dòng bảo mật thông tin */}
            <DisclaimerNote>
              Thông tin chỉ được tính ngay trên máy của bạn, không gửi đi và không lưu lại định danh.
            </DisclaimerNote>

            {/* Nút hành động */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                disabled={!isValid}
                className="w-full flex items-center justify-center gap-2 min-h-12 text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{FIXED_LABELS.ACTION_CONTINUE}</span>
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </Button>
              {!isValid && (
                <p className="font-body text-xs text-text-muted/70 text-center pt-2">
                  Vui lòng điền đủ tên, tuổi, chiều cao, cân nặng và chọn mức vận động để tiếp tục.
                </p>
              )}
            </div>
          </form>
        </Card>
      </Container>
    </Section>
  );
}
