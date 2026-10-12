"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Section, Heading, Card, Button, Chip } from "@/components/ui";
import { useConsultation } from "../context";
import type { ExperienceLevel, DurationChoice } from "@/domain/recommend";

export function Step4Form() {
  const router = useRouter();
  const { experience, updateExperience } = useConsultation();

  const [level, setLevel] = useState<ExperienceLevel>(experience?.level ?? "never");
  const [duration, setDuration] = useState<DurationChoice>(experience?.duration ?? "auto");

  const handleFinish = () => {
    updateExperience({ level, duration });
    router.push("/consultation/result");
  };

  return (
    <Section spacing="md">
      <Container className="max-w-xl space-y-6">
        <Card className="p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-semibold tracking-widest text-primary uppercase block">
              BƯỚC 4/4 · KINH NGHIỆM VÀ SỐ NGÀY
            </span>
            <Heading level={1} size="2xl" className="font-semibold text-2xl sm:text-3xl text-text">
              Kinh nghiệm và số ngày mong muốn
            </Heading>
            <p className="font-body text-sm text-text-muted leading-relaxed">
              Bước cuối cùng giúp cá nhân hóa đúng nhịp sinh học của bạn.
            </p>
          </div>

          <div className="space-y-3">
            <label className="font-body text-sm font-medium text-text select-none block">
              Bạn đã từng áp dụng chế độ nước ép thanh lọc trước đây chưa?
            </label>
            <div className="flex flex-col gap-2.5">
              <Chip
                type="radio"
                name="expLevel"
                checked={level === "never"}
                onChange={() => setLevel("never")}
                label="Chưa từng, đây là lần đầu tiên mình tìm hiểu"
              />
              <Chip
                type="radio"
                name="expLevel"
                checked={level === "experienced_good"}
                onChange={() => setLevel("experienced_good")}
                label="Đã từng và thấy cơ thể đáp ứng rất tốt"
              />
              <Chip
                type="radio"
                name="expLevel"
                checked={level === "experienced_tired"}
                onChange={() => setLevel("experienced_tired")}
                label="Đã từng nhưng thấy hơi mệt hoặc từng bỏ dở"
              />
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <label className="font-body text-sm font-medium text-text select-none block">
              Bạn mong muốn thực hiện trong bao nhiêu ngày?
            </label>
            <div className="flex flex-col gap-2.5">
              <Chip
                type="radio"
                name="planDuration"
                checked={duration === "auto"}
                onChange={() => setDuration("auto")}
                label="Để quán gợi ý lộ trình phù hợp nhất (Khuyên dùng)"
              />
              <Chip
                type="radio"
                name="planDuration"
                checked={duration === 1}
                onChange={() => setDuration(1)}
                label="1 ngày (Khởi đầu thử nghiệm)"
              />
              <Chip
                type="radio"
                name="planDuration"
                checked={duration === 3}
                onChange={() => setDuration(3)}
                label="3 ngày (Cân bằng phổ biến)"
              />
              <Chip
                type="radio"
                name="planDuration"
                checked={duration === 6}
                onChange={() => setDuration(6)}
                label="6 ngày (Chuyên sâu phục hồi)"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between gap-3">
            <Button
              variant="ghost"
              type="button"
              onClick={() => router.push("/consultation/goals")}
              className="px-6 rounded-full"
            >
              Quay lại
            </Button>
            <Button variant="primary" onClick={handleFinish} className="px-8 rounded-full">
              Xem lộ trình của tôi
            </Button>
          </div>
        </Card>
      </Container>
    </Section>
  );
}
