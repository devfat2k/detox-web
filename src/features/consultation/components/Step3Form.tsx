"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Section, Heading, Card, Button, Chip } from "@/components/ui";
import { useConsultation } from "../context";

const AVAILABLE_GOALS = [
  { id: "weight", label: "Hỗ trợ giảm nhẹ cân nặng" },
  { id: "digestion", label: "Khó tiêu, đầy bụng" },
  { id: "heat", label: "Nóng trong, háo nước" },
  { id: "acne", label: "Mụn ẩn, da kém tươi" },
  { id: "sleep", label: "Ngủ chập chờn, mệt mỏi" },
  { id: "hair", label: "Rụng tóc, thiếu chất" },
  { id: "other", label: "Khởi đầu thói quen lành mạnh khác" },
];

export function Step3Form() {
  const router = useRouter();
  const { goals: savedGoals, updateGoals } = useConsultation();
  const [selected, setSelected] = useState<string[]>(savedGoals);
  const [error, setError] = useState<string | null>(null);

  const toggleGoal = (id: string) => {
    setError(null);
    if (selected.includes(id)) {
      setSelected((prev) => prev.filter((item) => item !== id));
    } else {
      if (selected.length >= 3) {
        setError("Bạn chỉ có thể chọn tối đa 3 mục tiêu chính.");
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
        <Card className="p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-semibold tracking-widest text-primary uppercase block">
              BƯỚC 3/4 · VẤN ĐỀ VÀ MỤC TIÊU
            </span>
            <Heading level={1} size="2xl" className="font-semibold text-2xl sm:text-3xl text-text">
              Vấn đề và mục tiêu cải thiện
            </Heading>
            <p className="font-body text-sm text-text-muted leading-relaxed">
              Chọn tối đa 3 mục tiêu bạn muốn cải thiện trong đợt trải nghiệm này.
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            {AVAILABLE_GOALS.map((goal) => {
              const isChecked = selected.includes(goal.id);
              return (
                <Chip
                  key={goal.id}
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleGoal(goal.id)}
                  label={goal.label}
                />
              );
            })}
          </div>

          {error ? <p className="font-body text-xs text-error">{error}</p> : null}

          <div className="pt-4 flex items-center justify-between gap-3">
            <Button
              variant="ghost"
              type="button"
              onClick={() => router.push("/consultation/body")}
              className="px-6 rounded-full"
            >
              Quay lại
            </Button>
            <Button variant="primary" onClick={handleContinue} className="px-8 rounded-full">
              Tiếp tục
            </Button>
          </div>
        </Card>
      </Container>
    </Section>
  );
}
