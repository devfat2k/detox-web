"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, Sparkles, Check } from "lucide-react";
import { Container, Section, Heading, Card, Button, Input, DisclaimerNote } from "@/components/ui";
import { useConsultation, type FullBodyData } from "../context";
import { evaluateBody, calculateBmi } from "@/domain/screening";
import { FIXED_LABELS } from "@/config/copy";

export function Step2Form() {
  const router = useRouter();
  const { body, updateBody, setIneligible } = useConsultation();

  const [name, setName] = useState(body?.name ?? "");
  const [gender, setGender] = useState<"female" | "male">(body?.gender ?? "female");
  // Default values pre-filled so users don't have to type if they want a quick pass
  const [age, setAge] = useState(body?.age ? String(body.age) : "25");
  const [heightCm, setHeightCm] = useState(body?.heightCm ? String(body.heightCm) : "160");
  const [weightKg, setWeightKg] = useState(body?.weightKg ? String(body.weightKg) : "52");
  const [activityLevel, setActivityLevel] = useState<"low" | "moderate" | "high">(
    body?.activityLevel ?? "moderate"
  );
  const [errors, setErrors] = useState<{ age?: string; height?: string; weight?: string }>({});

  // Quick preset switch
  const applyPreset = (g: "female" | "male") => {
    setGender(g);
    if (g === "female") {
      setAge("25");
      setHeightCm("160");
      setWeightKg("52");
    } else {
      setAge("26");
      setHeightCm("170");
      setWeightKg("65");
    }
    setErrors({});
  };

  const currentBmi = useMemo(() => {
    const h = Number(heightCm);
    const w = Number(weightKg);
    if (h > 0 && w > 0) {
      return calculateBmi(h, w);
    }
    return 0;
  }, [heightCm, weightKg]);

  const bmiStatusText = useMemo(() => {
    if (currentBmi <= 0) return null;
    if (currentBmi < 18.5) return "Thiếu cân nhẹ";
    if (currentBmi < 23) return "Thể trạng chuẩn cân đối";
    if (currentBmi < 25) return "Hơi đầy đặn";
    return "Thừa cân nhẹ";
  }, [currentBmi]);

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { age?: string; height?: string; weight?: string } = {};

    const parsedAge = Number(age);
    const parsedHeight = Number(heightCm);
    const parsedWeight = Number(weightKg);

    if (!age || isNaN(parsedAge) || parsedAge < 10) {
      newErrors.age = "Vui lòng nhập độ tuổi hợp lệ";
    }
    if (!heightCm || isNaN(parsedHeight) || parsedHeight < 100 || parsedHeight > 220) {
      newErrors.height = "Chiều cao từ 100cm đến 220cm";
    }
    if (!weightKg || isNaN(parsedWeight) || parsedWeight < 30 || parsedWeight > 180) {
      newErrors.weight = "Cân nặng từ 30kg đến 180kg";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const evaluation = evaluateBody({
      age: parsedAge,
      heightCm: parsedHeight,
      weightKg: parsedWeight,
    });

    if (!evaluation.isEligible && evaluation.reason) {
      setIneligible(evaluation.reason);
      router.push("/consultation/ineligible");
      return;
    }

    const fullData: FullBodyData = {
      name: name.trim() || undefined,
      gender,
      age: parsedAge,
      heightCm: parsedHeight,
      weightKg: parsedWeight,
      activityLevel,
    };

    updateBody(fullData, evaluation.warningMessage);
    router.push("/consultation/goals");
  };

  return (
    <Section spacing="md">
      <Container className="max-w-xl space-y-6">
        <Card className="p-6 sm:p-8 space-y-6 shadow-2xs">
          <div className="space-y-2">
            <span className="text-xs font-medium text-primary tracking-wide block">
              Bước 2/4 · Thông tin cơ thể
            </span>
            <Heading level={1} size="2xl" className="font-semibold text-2xl sm:text-3xl text-text">
              Chỉ số thể trạng cá nhân
            </Heading>
            <p className="font-body text-sm text-text-muted leading-relaxed">
              Các chỉ số này giúp tính BMI và gợi ý mức năng lượng phù hợp cho thể trạng của bạn.
            </p>
          </div>

          <form onSubmit={handleContinue} className="space-y-6">
            {/* Tên xưng hô */}
            <Input
              label="Tên gọi của bạn (không bắt buộc)"
              placeholder="Ví dụ: Lan, Phương, Tuấn..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/* Giới tính - 2 thẻ chọn trực quan */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-body text-sm font-medium text-text select-none">
                  Giới tính sinh học
                </label>
                <button
                  type="button"
                  onClick={() => applyPreset(gender)}
                  className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-medium select-none"
                >
                  <Sparkles size={12} strokeWidth={2} />
                  <span>Dùng chỉ số mẫu ({gender === "female" ? "160cm · 52kg" : "170cm · 65kg"})</span>
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => applyPreset("female")}
                  className={`p-3.5 rounded-full border text-center font-body text-base transition-all duration-200 ease-soft select-none flex items-center justify-center gap-2 hover:-translate-y-0.5 active:scale-95 ${
                    gender === "female"
                      ? "bg-accent-soft/70 border-primary font-semibold text-text shadow-2xs"
                      : "bg-surface border-border text-text-muted hover:border-primary/40 hover:bg-bg"
                  }`}
                >
                  {gender === "female" ? <Check size={16} className="text-primary animate-fade-in-scale" /> : null}
                  <span>Nữ</span>
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset("male")}
                  className={`p-3.5 rounded-full border text-center font-body text-base transition-all duration-200 ease-soft select-none flex items-center justify-center gap-2 hover:-translate-y-0.5 active:scale-95 ${
                    gender === "male"
                      ? "bg-accent-soft/70 border-primary font-semibold text-text shadow-2xs"
                      : "bg-surface border-border text-text-muted hover:border-primary/40 hover:bg-bg"
                  }`}
                >
                  {gender === "male" ? <Check size={16} className="text-primary animate-fade-in-scale" /> : null}
                  <span>Nam</span>
                </button>
              </div>
            </div>

            {/* 3 ô chỉ số với Quick-select chips bên dưới */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {/* Tuổi */}
              <div className="space-y-2">
                <Input
                  label="Tuổi"
                  type="number"
                  unit="tuổi"
                  value={age}
                  error={errors.age}
                  onChange={(e) => {
                    setAge(e.target.value);
                    setErrors((prev) => ({ ...prev, age: undefined }));
                  }}
                />
                <div className="flex flex-wrap gap-1">
                  {["20", "25", "30", "35"].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setAge(val)}
                      className={`text-xs px-2.5 py-0.5 rounded-full border transition-colors ${
                        age === val
                          ? "bg-primary text-bg border-primary font-medium"
                          : "bg-bg text-text-muted border-border hover:border-primary/50"
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chiều cao */}
              <div className="space-y-2">
                <Input
                  label="Chiều cao"
                  type="number"
                  unit="cm"
                  value={heightCm}
                  error={errors.height}
                  onChange={(e) => {
                    setHeightCm(e.target.value);
                    setErrors((prev) => ({ ...prev, height: undefined }));
                  }}
                />
                <div className="flex flex-wrap gap-1">
                  {["155", "160", "165", "170"].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setHeightCm(val)}
                      className={`text-xs px-2.5 py-0.5 rounded-full border transition-colors ${
                        heightCm === val
                          ? "bg-primary text-bg border-primary font-medium"
                          : "bg-bg text-text-muted border-border hover:border-primary/50"
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cân nặng */}
              <div className="space-y-2">
                <Input
                  label="Cân nặng"
                  type="number"
                  unit="kg"
                  value={weightKg}
                  error={errors.weight}
                  onChange={(e) => {
                    setWeightKg(e.target.value);
                    setErrors((prev) => ({ ...prev, weight: undefined }));
                  }}
                />
                <div className="flex flex-wrap gap-1">
                  {["48", "52", "58", "65"].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setWeightKg(val)}
                      className={`text-xs px-2.5 py-0.5 rounded-full border transition-colors ${
                        weightKg === val
                          ? "bg-primary text-bg border-primary font-medium"
                          : "bg-bg text-text-muted border-border hover:border-primary/50"
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live BMI indicator */}
            {currentBmi > 0 ? (
              <div className="p-3.5 rounded-2xl bg-accent-soft/40 border border-border flex items-center justify-between text-xs animate-fade-in transition-all duration-300">
                <span className="text-text-muted">Ước tính thể trạng:</span>
                <span className="font-medium text-text">
                  BMI ~<span className="font-semibold text-primary">{currentBmi}</span>{" "}
                  {bmiStatusText ? `(${bmiStatusText})` : ""}
                </span>
              </div>
            ) : null}

            {/* Mức độ vận động - 3 card trực quan */}
            <div className="space-y-2 pt-1">
              <label className="font-body text-sm font-medium text-text select-none block">
                Mức độ vận động hàng ngày
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: "low", label: "Ít vận động", desc: "Ngồi nhiều, văn phòng" },
                  { id: "moderate", label: "Vừa phải", desc: "Đi lại thường xuyên (Phổ biến)" },
                  { id: "high", label: "Năng động", desc: "Tập luyện thể thao đều đặn" },
                ].map((act) => {
                  const isChecked = activityLevel === act.id;
                  return (
                    <button
                      key={act.id}
                      type="button"
                      onClick={() => setActivityLevel(act.id as "low" | "moderate" | "high")}
                      className={`p-3.5 rounded-2xl border text-left transition-all duration-200 ease-soft select-none flex flex-col justify-between hover:-translate-y-0.5 active:scale-[0.99] ${
                        isChecked
                          ? "bg-accent-soft/70 border-primary shadow-2xs font-medium"
                          : "bg-surface border-border hover:border-primary/40 hover:bg-bg"
                      }`}
                    >
                      <span className="font-body text-sm font-semibold text-text">
                        {act.label}
                      </span>
                      <span className="font-body text-xs text-text-muted pt-1">
                        {act.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex items-center justify-between gap-3">
              <Button
                variant="ghost"
                rounded="full"
                type="button"
                onClick={() => router.push("/consultation")}
                className="px-6 min-h-12 text-base font-medium select-none transition-all duration-200 hover:-translate-y-0.5 active:scale-95 group"
              >
                <ArrowLeft size={16} strokeWidth={1.75} aria-hidden="true" className="transition-transform duration-200 group-hover:-translate-x-1" />
                <span>{FIXED_LABELS.ACTION_BACK}</span>
              </Button>
              <Button
                variant="primary"
                rounded="full"
                type="submit"
                className="px-8 min-h-12 text-base font-medium select-none shadow-xs transition-all duration-200 hover:-translate-y-0.5 active:scale-95 group"
              >
                <span>{FIXED_LABELS.ACTION_CONTINUE}</span>
                <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            </div>
          </form>

          <DisclaimerNote className="pt-2" />
        </Card>
      </Container>
    </Section>
  );
}
