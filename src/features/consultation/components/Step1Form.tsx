"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Section, Heading, Card, Notice, Button, Chip } from "@/components/ui";
import { useConsultation } from "../context";
import { evaluateSafety, type SafetyAnswers } from "@/domain/screening";

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

  const toggle = (key: keyof SafetyAnswers) => {
    setAnswers((prev) => ({ ...prev, [key]: !prev[key] }));
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
        <Notice variant="info">
          Thông tin chỉ được tính ngay trên máy của bạn, không gửi đi và không lưu lại.
        </Notice>

        <Card className="p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-semibold tracking-widest text-primary uppercase block">
              BƯỚC 1/4 · LƯU Ý AN TOÀN
            </span>
            <Heading level={1} size="2xl" className="font-semibold text-2xl sm:text-3xl text-text">
              Lưu ý an toàn sức khỏe
            </Heading>
            <p className="font-body text-sm text-text-muted leading-relaxed">
              Vui lòng đánh dấu vào các mục dưới đây nếu đúng với bạn. Nếu không có mục nào, bạn có thể tiếp tục ngay.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Chip
              type="checkbox"
              checked={answers.pregnantOrNursing}
              onChange={() => toggle("pregnantOrNursing")}
              label="Đang mang thai hoặc cho con bú"
            />
            <Chip
              type="checkbox"
              checked={answers.medicalConditions}
              onChange={() => toggle("medicalConditions")}
              label="Có bệnh nền (tiểu đường, gan, thận, tim mạch, huyết áp, dạ dày nặng)"
            />
            <Chip
              type="checkbox"
              checked={answers.regularMedication}
              onChange={() => toggle("regularMedication")}
              label="Đang dùng thuốc điều trị thường xuyên"
            />
            <Chip
              type="checkbox"
              checked={answers.eatingDisorder}
              onChange={() => toggle("eatingDisorder")}
              label="Từng hoặc đang có rối loạn ăn uống"
            />
            <Chip
              type="checkbox"
              checked={answers.allergies}
              onChange={() => toggle("allergies")}
              label="Dị ứng với hạt, cần tây hoặc một số loại quả (chỉ lưu ý, không chặn)"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <Button variant="primary" onClick={handleContinue} className="w-full sm:w-auto px-8 rounded-full">
              Tiếp tục
            </Button>
          </div>
        </Card>
      </Container>
    </Section>
  );
}
