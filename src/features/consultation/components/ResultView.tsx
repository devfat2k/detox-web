"use client";

import React, { useState, useEffect } from "react";
import {
  Container,
  Section,
  Heading,
  Card,
  Notice,
  Button,
  LinkButton,
  DetoxBottle,
  DisclaimerNote,
} from "@/components/ui";
import { useConsultation } from "../context";
import { recommendPlan } from "@/domain/recommend";
import { calculateBmi } from "@/domain/screening";
import { FIXED_LABELS } from "@/config/copy";
import { ROUTES, routes } from "@/config/routes";
import { PLANS_DATA } from "@/data/plans";
import { SITE_CONFIG } from "@/config/site";
import { Check, Sparkles, ArrowRight } from "lucide-react";

const DAILY_SCHEDULE = [
  {
    time: "07:00",
    name: "Xanh Cần Tây Táo",
    desc: "Đánh thức tiêu hóa, thanh mát nhẹ bụng",
    color: "green" as const,
    level: 60,
  },
  {
    time: "10:00",
    name: "Cam Cà Rốt Gừng",
    desc: "Bổ sung vitamin, giữ ấm bụng giữa buổi",
    color: "warm" as const,
    level: 75,
  },
  {
    time: "13:00",
    name: "Xanh Đậm Kale Dưa Leo",
    desc: "Cung cấp khoáng chất diệp lục dồi dào",
    color: "green" as const,
    level: 70,
  },
  {
    time: "16:00",
    name: "Đỏ Rực Củ Dền Thơm",
    desc: "Hỗ trợ tuần hoàn, vị ngọt thanh tự nhiên",
    color: "warm" as const,
    level: 80,
  },
  {
    time: "19:00",
    name: "Sữa Hạt Ấm Dịu",
    desc: "Chất béo lành tính, giúp thư giãn giấc ngủ",
    color: "soft" as const,
    level: 85,
  },
];

const GOAL_LABELS: Record<string, string> = {
  digestion: "khó tiêu, đầy bụng, ậm ạch",
  heat: "nóng trong, háo nước",
  weight: "hỗ trợ cảm giác nhẹ nhõm vóc dáng",
  acne: "mụn ẩn, da kém tươi sáng",
  sleep: "uể oải, ngủ chập chờn",
  other: "duy trì thói quen ăn uống thanh nhẹ",
};

export function ResultView() {
  const { body, experience, goals, warningMessage, reset } = useConsultation();
  const [copied, setCopied] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  const bmi = body ? calculateBmi(body.heightCm, body.weightKg) : 21.5;
  const recommendation = recommendPlan({
    experienceLevel: experience?.level ?? "never",
    durationChoice: experience?.duration ?? "auto",
    bmi,
  });

  const matchedPlan =
    PLANS_DATA.find((p) => p.id === recommendation.planId) ?? PLANS_DATA[1];

  const rawName = body?.name?.trim();
  const isFemale = body?.gender === "female";
  const honorific = rawName
    ? isFemale
      ? `chị ${rawName}`
      : `bạn ${rawName}`
    : isFemale
      ? "chị"
      : "bạn";
  const capitalHonorific = rawName
    ? isFemale
      ? `Chị ${rawName}`
      : `Bạn ${rawName}`
    : isFemale
      ? "Chị"
      : "Bạn";

  const goalsSummary =
    goals.length > 0
      ? goals.map((g) => GOAL_LABELS[g] || g).join(", ")
      : "cảm giác đường tiêu hóa cần được nghỉ ngơi nhẹ nhàng";

  // Hiệu ứng phân tích cá nhân hóa mềm mại ~2.2s
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnalyzing(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  const handleCopySummary = async () => {
    const summaryText = `[Ép Xanh Chữa Lành] Lộ trình tư vấn cho ${capitalHonorific}:
- Lộ trình: ${matchedPlan.title} (${matchedPlan.durationDays} ngày)
- Thể trạng: Cân nặng ${body?.weightKg ?? 52}kg, chiều cao ${body?.heightCm ?? 160}cm (BMI ~${bmi})
- Vấn đề quan tâm: ${goalsSummary}
- Nhịp độ: 5 chai nước ép tươi/ngày
*Mọi thông tin chỉ mang tính chất tương đối và tham khảo có thể không chính xác
Ép Xanh Chữa Lành · Nông sản tươi ép chậm mỗi sáng`;

    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  // Trạng thái màn hình Loading / Phân tích trung gian nhẹ nhàng
  if (isAnalyzing) {
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
                Hãy đợi Ép Xanh một chút để chuẩn bị một lộ trình phù hợp với thể trạng của mình nhé.
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

            {/* Tiến trình phân tích nhẹ nhàng */}
            <div className="space-y-3 text-left max-w-md mx-auto pt-2">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-bg border border-border/80 text-xs font-body text-text">
                <div className="h-4 w-4 rounded-full bg-primary text-bg flex items-center justify-center shrink-0">
                  <Check size={10} strokeWidth={3} />
                </div>
                <span>
                  Đã tiếp nhận chỉ số thể trạng:{" "}
                  <b>
                    {body?.weightKg ?? 52}kg · BMI ~{bmi}
                  </b>
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-bg border border-border/80 text-xs font-body text-text">
                <div className="h-4 w-4 rounded-full bg-primary text-bg flex items-center justify-center shrink-0">
                  <Check size={10} strokeWidth={3} />
                </div>
                <span>Cân đối cữ uống 5 chai và nhịp sinh học tự nhiên</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-bg border border-border/80 text-xs font-body text-text">
                <div className="h-4 w-4 rounded-full bg-primary text-bg flex items-center justify-center shrink-0">
                  <Check size={10} strokeWidth={3} />
                </div>
                <span>Hoàn tất thực đơn nông sản tươi phù hợp</span>
              </div>
            </div>

            <DisclaimerNote className="pt-2" />
          </Card>
        </Container>
      </Section>
    );
  }

  // Màn hình kết quả hoàn chỉnh sau khi phân tích
  return (
    <Section spacing="md">
      <Container className="max-w-3xl space-y-8 animate-fade-in">
        {/* Header kết quả */}
        <div className="space-y-3 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-soft text-primary font-heading font-medium text-xs border border-border">
            <span
              className="h-1.5 w-1.5 rounded-full bg-primary"
              aria-hidden="true"
            />
            <span>Gợi ý theo thể trạng</span>
          </div>
          <Heading
            level={1}
            size="3xl"
            className="font-semibold text-2xl sm:text-3xl lg:text-4xl text-text leading-snug"
          >
            Lộ trình gợi ý dành cho {capitalHonorific}
          </Heading>
          <p className="font-body text-base text-text-muted leading-relaxed max-w-2xl">
            {recommendation.reason}
          </p>
        </div>

        {/* Khối chia sẻ & thấu hiểu thể trạng */}
        <Card className="p-6 sm:p-7 space-y-4 bg-surface border-border">
          <div className="flex items-start gap-3.5">
            <div
              className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0"
              aria-hidden="true"
            />
            <div className="space-y-2 flex-1">
              <h2 className="font-heading font-semibold text-lg sm:text-xl text-text">
                Chia sẻ thể trạng cùng {honorific}
              </h2>
              <p className="font-body text-sm text-text leading-relaxed">
                {capitalHonorific} đang quan tâm đến vấn đề{" "}
                <b className="font-semibold text-primary">{goalsSummary}</b>{" "}
                với cân nặng <b>{body?.weightKg ?? 52} kg</b> (chiều cao{" "}
                {body?.heightCm ?? 160} cm, BMI ước tính ~{bmi}).
              </p>
              <p className="font-body text-sm text-text-muted leading-relaxed pt-1">
                Với kinh nghiệm nhỏ chuẩn bị nước ép rau củ mỗi sáng, Ép Xanh hiểu {honorific} đang cảm thấy đường tiêu hóa cần một khoảng nghỉ êm dịu sau những ngày ăn uống nhiều dầu mỡ. Quán gửi đến {honorific} lựa chọn nhẹ nhàng như sau:
              </p>
            </div>
          </div>
        </Card>

        {warningMessage ? (
          <Notice variant="warning">{warningMessage}</Notice>
        ) : null}

        {/* Thẻ số liệu lộ trình trực quan */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl bg-surface border border-border space-y-1 transition-all duration-200 ease-soft hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-2xs">
            <span className="text-xs font-medium text-primary block">
              Thời gian
            </span>
            <span className="text-xl font-heading font-semibold text-text block">
              {matchedPlan.durationDays} ngày
            </span>
            <span className="text-xs text-text-muted">Nhịp sinh học nhẹ</span>
          </div>
          <div className="p-4 rounded-2xl bg-surface border border-border space-y-1 transition-all duration-200 ease-soft hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-2xs">
            <span className="text-xs font-medium text-primary block">
              Số lượng
            </span>
            <span className="text-xl font-heading font-semibold text-text block">
              {matchedPlan.durationDays * 5} chai
            </span>
            <span className="text-xs text-text-muted">5 chai mỗi ngày</span>
          </div>
          <div className="p-4 rounded-2xl bg-surface border border-border space-y-1 transition-all duration-200 ease-soft hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-2xs">
            <span className="text-xs font-medium text-primary block">
              Năng lượng
            </span>
            <span className="text-xl font-heading font-semibold text-text block">
              ~{matchedPlan.kcalRange}
            </span>
            <span className="text-xs text-text-muted">kcal mỗi ngày</span>
          </div>
          <div className="p-4 rounded-2xl bg-surface border border-border space-y-1 transition-all duration-200 ease-soft hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-2xs">
            <span className="text-xs font-medium text-primary block">
              Cảm nhận cơ thể
            </span>
            <span className="text-xl font-heading font-semibold text-text block">
              ~0.5 - 1.5 kg
            </span>
            <span className="text-xs text-text-muted">Chủ yếu nước & tiêu hóa</span>
          </div>
        </div>

        {/* Khối giải thích thành phần và công dụng tự nhiên (không máy móc khô cứng) */}
        <Card className="p-6 sm:p-8 space-y-5">
          <div className="space-y-1">
            <span className="text-xs font-medium text-primary tracking-wide block">
              Dinh dưỡng tự nhiên từ nông sản tươi
            </span>
            <Heading
              level={2}
              size="xl"
              className="font-semibold text-xl text-text"
            >
              Rau củ quả tươi phối hợp giúp xoa dịu cơ thể như thế nào?
            </Heading>
            <p className="text-xs sm:text-sm text-text-muted font-body leading-relaxed">
              Mỗi công thức được kết hợp để các nguyên liệu bổ trợ lẫn nhau, tạo vị thanh dễ uống và giảm cảm giác ậm ạch:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            <div className="p-4 rounded-xl bg-bg border border-border space-y-1.5">
              <span className="font-heading font-semibold text-sm text-text block">
                Cần tây &amp; Dưa leo
              </span>
              <p className="font-body text-xs text-text-muted leading-relaxed">
                Chứa hàm lượng nước và kali tự nhiên cao, giúp kích thích đào thải lượng muối thừa và hỗ trợ giảm nhanh cảm giác tích nước, nặng bụng.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-bg border border-border space-y-1.5">
              <span className="font-heading font-semibold text-sm text-text block">
                Táo xanh &amp; Thơm (Dứa)
              </span>
              <p className="font-body text-xs text-text-muted leading-relaxed">
                Cung cấp enzym thực vật tự nhiên và chất xơ hòa tan, giúp hỗ trợ men tiêu hóa phân giải thức ăn êm dịu, đồng thời mang vị ngọt thanh dễ uống.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-bg border border-border space-y-1.5">
              <span className="font-heading font-semibold text-sm text-text block">
                Cà rốt &amp; Gừng ấm
              </span>
              <p className="font-body text-xs text-text-muted leading-relaxed">
                Beta-carotene và chất chống oxy hóa tự nhiên giúp nuôi dưỡng đường ruột; vị gừng ấm giữ nhiệt lượng cho bao tử, hạn chế cảm giác lạnh bụng.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-bg border border-border space-y-1.5">
              <span className="font-heading font-semibold text-sm text-text block">
                Sữa hạt hạnh nhân &amp; hạt sen
              </span>
              <p className="font-body text-xs text-text-muted leading-relaxed">
                Cung cấp chất béo lành tính và khoáng chất tự nhiên vào cữ tối 19h, giúp cơ thể không bị hụt năng lượng và hỗ trợ giấc ngủ sâu hơn.
              </p>
            </div>
          </div>
        </Card>

        {/* Lịch 5 chai mẫu phân bổ theo khung giờ */}
        <Card className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="space-y-1">
              <span className="text-xs font-medium text-primary tracking-wide block">
                Thực đơn mẫu trong ngày
              </span>
              <Heading
                level={2}
                size="xl"
                className="font-semibold text-xl text-text"
              >
                Lịch 5 chai nước ép phân bổ nhịp nhàng
              </Heading>
              <p className="text-xs text-text-muted font-body">
                Nước ép tươi ép chậm mỗi sáng, uống chậm rãi từng ngụm cách nhau 2,5 đến 3 tiếng.
              </p>
            </div>

            <LinkButton
              href={routes.plan(matchedPlan.id)}
              variant="secondary"
              className="text-xs font-medium self-start sm:self-auto shrink-0"
            >
              <span>Xem chi tiết gói {matchedPlan.durationDays} ngày</span>
              <ArrowRight size={14} strokeWidth={1.75} aria-hidden="true" />
            </LinkButton>
          </div>

          <div className="flex flex-col gap-3">
            {DAILY_SCHEDULE.map((item) => (
              <div
                key={item.time}
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-bg border border-border/80 hover:border-primary/40 hover:bg-surface transition-all duration-200 ease-soft hover:-translate-y-0.5 group"
              >
                <div className="shrink-0 transition-transform duration-300 group-hover:scale-105">
                  <DetoxBottle
                    size="sm"
                    color={item.color}
                    level={item.level}
                    label={item.name}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-xs font-heading font-semibold bg-accent-soft text-primary transition-colors duration-200 group-hover:bg-accent-soft/80">
                      {item.time}
                    </span>
                    <span className="font-body text-sm sm:text-base font-semibold text-text truncate">
                      {item.name}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted font-body truncate mt-1">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Khối trao đổi cùng quán & sao chép gửi Threads */}
        <div className="p-6 rounded-3xl bg-accent-soft/30 border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-heading font-semibold text-base text-text">
              Bạn muốn trao đổi thêm cùng quán?
            </h3>
            <p className="font-body text-xs text-text-muted">
              Nhắn tin trực tiếp tới Threads của Ép Xanh Chữa Lành để được tư vấn theo ngày.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 w-full sm:w-auto">
            <Button
              variant="secondary"
              onClick={handleCopySummary}
              className="rounded-full text-sm min-h-11 px-5 transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
            >
              {copied ? "Đã sao chép ✓" : FIXED_LABELS.ACTION_COPY_SUMMARY}
            </Button>
            <LinkButton
              href={SITE_CONFIG.threadsUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              className="rounded-full text-sm min-h-11 px-6 transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
            >
              {FIXED_LABELS.ACTION_MESSAGE_THREADS}
            </LinkButton>
          </div>
        </div>

        {/* DisclaimerNote dùng chung */}
        <DisclaimerNote className="max-w-xl mx-auto pt-2" />

        <div className="flex items-center justify-center gap-4 pt-2">
          <LinkButton
            href={ROUTES.CONSULTATION}
            variant="ghost"
            onClick={reset}
            className="text-xs font-medium text-text-muted hover:text-text"
          >
            {FIXED_LABELS.ACTION_RETRY}
          </LinkButton>
          <span className="text-border" aria-hidden="true">
            ·
          </span>
          <LinkButton
            href={ROUTES.HOME}
            variant="ghost"
            className="text-xs font-medium text-text-muted hover:text-text"
          >
            {FIXED_LABELS.ACTION_BACK_TO_HOME}
          </LinkButton>
        </div>
      </Container>
    </Section>
  );
}
