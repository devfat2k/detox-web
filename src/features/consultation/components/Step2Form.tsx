"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Section, Heading, Card, Button, Chip, Input } from "@/components/ui";
import { useConsultation, type FullBodyData } from "../context";
import { evaluateBody } from "@/domain/screening";

export function Step2Form() {
  const router = useRouter();
  const { body, updateBody, setIneligible } = useConsultation();

  const [name, setName] = useState(body?.name ?? "");
  const [gender, setGender] = useState<"female" | "male">(body?.gender ?? "female");
  const [age, setAge] = useState(body?.age ? String(body.age) : "");
  const [heightCm, setHeightCm] = useState(body?.heightCm ? String(body.heightCm) : "");
  const [weightKg, setWeightKg] = useState(body?.weightKg ? String(body.weightKg) : "");
  const [activityLevel, setActivityLevel] = useState<"low" | "moderate" | "high">(
    body?.activityLevel ?? "moderate"
  );
  const [errors, setErrors] = useState<{ age?: string; height?: string; weight?: string }>({});

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
        <Card className="p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-semibold tracking-widest text-primary uppercase block">
              BƯỚC 2/4 · THÔNG TIN CƠ THỂ
            </span>
            <Heading level={1} size="2xl" className="font-semibold text-2xl sm:text-3xl text-text">
              Chỉ số thể trạng cá nhân
            </Heading>
            <p className="font-body text-sm text-text-muted leading-relaxed">
              Thông tin giúp tính chỉ số BMI và ước lượng năng lượng phù hợp.
            </p>
          </div>

          <form onSubmit={handleContinue} className="space-y-5">
            <Input
              label="Tên xưng hô (không bắt buộc)"
              placeholder="Ví dụ: Lan, Phương..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <div className="space-y-2">
              <label className="font-body text-sm font-medium text-text select-none">
                Giới tính
              </label>
              <div className="flex gap-3">
                <Chip
                  type="radio"
                  name="gender"
                  checked={gender === "female"}
                  onChange={() => setGender("female")}
                  label="Nữ"
                  className="flex-1"
                />
                <Chip
                  type="radio"
                  name="gender"
                  checked={gender === "male"}
                  onChange={() => setGender("male")}
                  label="Nam"
                  className="flex-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Input
                label="Tuổi"
                type="number"
                unit="tuổi"
                value={age}
                error={errors.age}
                onChange={(e) => setAge(e.target.value)}
              />
              <Input
                label="Chiều cao"
                type="number"
                unit="cm"
                value={heightCm}
                error={errors.height}
                onChange={(e) => setHeightCm(e.target.value)}
              />
              <Input
                label="Cân nặng"
                type="number"
                unit="kg"
                value={weightKg}
                error={errors.weight}
                onChange={(e) => setWeightKg(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="font-body text-sm font-medium text-text select-none">
                Mức độ vận động hàng ngày
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <Chip
                  type="radio"
                  name="activityLevel"
                  checked={activityLevel === "low"}
                  onChange={() => setActivityLevel("low")}
                  label="Ít vận động"
                />
                <Chip
                  type="radio"
                  name="activityLevel"
                  checked={activityLevel === "moderate"}
                  onChange={() => setActivityLevel("moderate")}
                  label="Vừa phải"
                />
                <Chip
                  type="radio"
                  name="activityLevel"
                  checked={activityLevel === "high"}
                  onChange={() => setActivityLevel("high")}
                  label="Năng động"
                />
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between gap-3">
              <Button
                variant="ghost"
                type="button"
                onClick={() => router.push("/consultation")}
                className="px-6 rounded-full"
              >
                Quay lại
              </Button>
              <Button variant="primary" type="submit" className="px-8 rounded-full">
                Tiếp tục
              </Button>
            </div>
          </form>
        </Card>
      </Container>
    </Section>
  );
}
