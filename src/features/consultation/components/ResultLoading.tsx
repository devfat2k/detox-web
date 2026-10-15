import React from "react";
import {
  Container,
  Section,
  Heading,
  Card,
  DetoxBottle,
  DisclaimerNote,
} from "@/components/ui";
import { Check, Sparkles } from "lucide-react";

interface ResultLoadingProps {
  readonly honorific: string;
  readonly weightKg: number;
  readonly bmi: number;
}

export function ResultLoading({
  honorific,
  weightKg,
  bmi,
}: ResultLoadingProps) {
  return (
    <Section spacing="md">
      <Container className="max-w-xl space-y-6">
        <Card className="p-6 sm:p-10 space-y-8 text-center bg-surface border-border shadow-2xs">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-soft text-primary font-heading font-medium text-xs border border-border">
              <Sparkles size={12} className="text-primary animate-pulse" />
              <span>Đang phân tích thể trạng</span>
            </div>
            <Heading
              level={1}
              size="2xl"
              className="font-semibold text-2xl sm:text-3xl text-text leading-snug"
            >
              Thông tin của {honorific} đang được phân tích...
            </Heading>
            <p className="font-body text-sm sm:text-base text-text-muted leading-relaxed max-w-md mx-auto">
              Hãy đợi Ép Xanh một chút để chuẩn bị một lộ trình phù hợp với thể
              trạng của mình nhé.
            </p>
          </div>

          <div className="flex justify-center py-2">
            <div className="p-5 rounded-3xl bg-accent-soft/40 border border-border/80 inline-block">
              <DetoxBottle
                size="lg"
                color="green"
                level={70}
                className="animate-pulse"
              />
            </div>
          </div>

          <div className="space-y-3 text-left max-w-md mx-auto pt-2">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-bg border border-border/80 text-xs font-body text-text">
              <div className="h-4 w-4 rounded-full bg-primary text-bg flex items-center justify-center shrink-0">
                <Check size={10} strokeWidth={3} />
              </div>
              <span>
                Đã tiếp nhận chỉ số thể trạng:{" "}
                <b>
                  {weightKg}kg · BMI ~{bmi}
                </b>
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-bg border border-border/80 text-xs font-body text-text">
              <div className="h-4 w-4 rounded-full bg-primary text-bg flex items-center justify-center shrink-0">
                <Check size={10} strokeWidth={3} />
              </div>
              <span>
                Cân đối cơ cấu 5 chai/ngày (3 Sinh tố + 1 Nước ép + 1 Sữa hạt)
              </span>
            </div>
          </div>

          <DisclaimerNote className="pt-2" />
        </Card>
      </Container>
    </Section>
  );
}
