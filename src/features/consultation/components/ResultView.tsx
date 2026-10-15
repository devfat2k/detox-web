"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Section,
  Heading,
  Card,
  Button,
  LinkButton,
  DetoxBottle,
  DisclaimerNote,
} from "@/components/ui";
import { useConsultation } from "../context";
import { useStepGuard } from "../hooks/use-step-guard";
import { useConsultationMutation } from "../hooks/use-consultation-mutation";
import { useDrinksQuery } from "@/features/drinks/hooks/use-drinks-query";
import { calculateBmi } from "@/domain/screening";
import { FIXED_LABELS } from "@/config/copy";
import { routes } from "@/config/routes";
import {
  type Plan,
  type PlanDaySchedule,
  type PlanBottle,
  type PlanId,
} from "@/data/plans";
import { DRINKS_DATA, type Drink as UIDrink } from "@/data/drinks";
import { SITE_CONFIG } from "@/config/site";
import { Check, Sparkles, AlertCircle, RefreshCw, Pencil, RotateCcw } from "lucide-react";
import { PlanDayScheduleView } from "@/features/plans";
import type { ConsultationScheduleDay } from "@/types/api";

const GOAL_LABELS: Record<string, string> = {
  digestion: "nặng bụng, đầy hơi, khó tiêu",
  weight: "hỗ trợ giảm mỡ & nhẹ nhõm vòng eo",
  heat: "nóng trong, tích tụ dầu mỡ",
  acne: "da sạm, mệt mỏi, thiếu năng lượng",
  sleep: "uể oải, khó ngủ sâu giấc",
  other: "thanh lọc định kỳ & duy trì lối sống xanh",
};

const GOAL_SHORT_NAMES: Record<string, string> = {
  digestion: "Tiêu hóa & Nhẹ bụng",
  weight: "Giảm mỡ & Vòng eo",
  heat: "Thanh nhiệt & Giảm nóng",
  acne: "Sáng da & Năng lượng",
  sleep: "Ngủ sâu & Tĩnh dưỡng",
  other: "Lối sống xanh định kỳ",
};

const ACTIVITY_LABELS: Record<string, string> = {
  low: "Ít vận động",
  moderate: "Vận động vừa",
  high: "Năng động",
};

const EXPERIENCE_LABELS: Record<string, string> = {
  never: "Mới bắt đầu",
  experienced_good: "Đã quen, thích ứng tốt",
  experienced_tired: "Đã từng nhưng thấy mệt",
};

function mapApiScheduleToPlanDays(
  dailySchedule: readonly ConsultationScheduleDay[],
  drinks: readonly UIDrink[]
): readonly PlanDaySchedule[] {
  return dailySchedule.map((daySchedule, dayIdx) => {
    const dayNumber = daySchedule.day ?? dayIdx + 1;
    const theme =
      daySchedule.title ?? `Ngày ${dayNumber}: Nhịp điệu thanh lọc cân bằng`;
    const bottles: PlanBottle[] = (daySchedule.meals ?? []).map(
      (meal, mealIdx) => {
        const timeParts = (meal.time ?? "").split(" - ");
        const time = timeParts[0]?.trim() || "07:00";
        const slotName =
          timeParts[1]?.trim() || meal.name || `Cữ ${mealIdx + 1}`;

        const suggestedName = meal.suggestedItems?.[0];
        const matchedDrink = suggestedName
          ? drinks.find(
              (d) =>
                d.name.toLowerCase() === suggestedName.toLowerCase() ||
                d.slug === suggestedName.toLowerCase() ||
                suggestedName.toLowerCase().includes(d.name.toLowerCase())
            )
          : undefined;

        let bottleType: "smoothie" | "juice" | "nut_milk" | "herbal_tea" =
          "smoothie";
        if (meal.category === "JUICE") {
          bottleType = "juice";
        } else if (meal.category === "NUT_MILK_TEA") {
          bottleType = suggestedName?.toLowerCase().includes("trà")
            ? "herbal_tea"
            : "nut_milk";
        } else {
          bottleType = "smoothie";
        }

        const fallbackColor =
          bottleType === "smoothie"
            ? "green"
            : bottleType === "juice"
              ? "warm"
              : "soft";

        return {
          time,
          slotName,
          name: suggestedName || meal.name || "Nước ép dinh dưỡng",
          desc:
            meal.role ||
            matchedDrink?.benefit ||
            "Bổ sung vi chất tự nhiên cho cơ thể",
          drinkSlug:
            matchedDrink?.slug ||
            (bottleType === "smoothie"
              ? "sinh-to-xanh-healthy"
              : bottleType === "juice"
                ? "ep-tao-can-tay"
                : "tra-thao-moc-thanh-nhiet"),
          color: matchedDrink?.color || fallbackColor,
          level: matchedDrink?.level || 80,
          bottleType,
        };
      }
    );

    return {
      dayNumber,
      theme,
      bottles,
    };
  });
}

export function ResultView() {
  const { isAllowed } = useStepGuard("result");
  const { body, safety, experience, goals, warningMessage, reset, result, setResult } =
    useConsultation();
  const [copied, setCopied] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(() => !result);

  const { data: drinks = DRINKS_DATA } = useDrinksQuery();

  const {
    mutate,
    data: mutateData,
    isPending,
    isError,
    error,
  } = useConsultationMutation();
  const router = useRouter();
  const hasSubmittedRef = useRef(false);

  const apiResult = result ?? mutateData;

  // Khi người dùng bấm Back trình duyệt ở trang Kết quả -> Chuyển hướng thẳng về Trang Chủ (chỉ khi có kết quả hợp lệ)
  useEffect(() => {
    if (!isAllowed || !apiResult) return;

    try {
      window.history.pushState(window.history.state, "", window.location.href);
    } catch {
      // Bỏ qua nếu môi trường không hỗ trợ pushState
    }

    const handlePopState = () => {
      router.replace(routes.home());
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router, isAllowed, apiResult]);

  // Chỉ submit lên server đúng 1 lần khi chưa có kết quả trong context
  useEffect(() => {
    if (!result && !hasSubmittedRef.current && body && safety && experience) {
      hasSubmittedRef.current = true;
      mutate(
        { body, safety, goals, experience },
        {
          onSuccess: (data) => {
            setResult(data);
          },
        }
      );
    }
  }, [mutate, body, safety, goals, experience, result, setResult]);

  // Hiệu ứng phân tích cá nhân hóa mềm mại ~2.2s (chỉ chạy khi chưa có kết quả)
  useEffect(() => {
    if (result) return;
    const timer = setTimeout(() => {
      setIsAnalyzing(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, [result]);

  const clientBmi = body ? calculateBmi(body.heightCm, body.weightKg) : 21.5;
  const bmi = apiResult?.bmi ?? apiResult?.assessment?.bmi ?? clientBmi;

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

  const displayPlan: Plan | null = useMemo(() => {
    if (!apiResult?.recommendedPlan) return null;

    const durationDays =
      apiResult.recommendedPlan.duration_days ??
      apiResult.durationDays ??
      (experience?.durationDays ?? 3);

    const totalBottles =
      apiResult.recommendedPlan.total_bottles ?? durationDays * 5;

    const title =
      apiResult.recommendedPlan.name ??
      (durationDays === 1
        ? "Combo Detox 1 Ngày"
        : durationDays === 3
          ? "Combo Detox 3 Ngày"
          : "Combo Detox 6 Ngày");

    let days: readonly PlanDaySchedule[] = [];
    if (apiResult.dailySchedule && apiResult.dailySchedule.length > 0) {
      days = mapApiScheduleToPlanDays(apiResult.dailySchedule, drinks);
    }

    return {
      id: (apiResult.recommendedPlan.id as PlanId) || `${durationDays}-day`,
      title,
      durationDays,
      totalBottles,
      days,
      description: apiResult.recommendedPlan.description,
    };
  }, [apiResult, drinks, experience]);

  const recommendationReason =
    apiResult?.recommendedPlan?.reason ??
    apiResult?.assessment?.recommendationNote ??
    "Lộ trình được cân đối tỉ lệ 3 Sinh tố : 1 Nước ép : 1 Sữa hạt/Trà giúp cơ thể thích nghi êm ái.";

  const handleCopySummary = async () => {
    if (!displayPlan) return;
    const summaryText = `[Ép Xanh Chữa Lành] Thông tin tư vấn cho ${capitalHonorific}:
- Lộ trình đề xuất: ${displayPlan.title} (${displayPlan.durationDays} ngày · ${displayPlan.totalBottles} chai)
- Thể trạng: Chiều cao ${body?.heightCm ?? 160}cm, Cân nặng ${body?.weightKg ?? 52}kg (BMI ~${bmi}${apiResult?.assessment?.category ? ` · ${apiResult.assessment.category}` : ""})
- Mục tiêu quan tâm: ${goalsSummary}
- Dị ứng ghi nhận: ${safety?.allergies && safety.allergies.length > 0 ? safety.allergies.join(", ") : "Không có"}
- Cơ cấu mỗi ngày: 5 chai (3 Sinh tố xanh + 1 Nước ép tươi + 1 Sữa hạt/Trà thảo mộc)
*Em gửi shop xem qua thực đơn và hỗ trợ tư vấn chi tiết giúp em nhé!
Ép Xanh Chữa Lành · Nông sản tươi ép chậm mỗi sáng`;

    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const handleRetrySubmit = () => {
    if (body && safety && experience) {
      mutate(
        { body, safety, goals, experience },
        {
          onSuccess: (data) => {
            setResult(data);
          },
        }
      );
    }
  };

  // Khi tải lại trang hoặc chưa có dữ liệu hợp lệ: hiển thị màn hình thông báo phiên làm mới (bảo vệ quyền riêng tư)
  if (!isAllowed) {
    return (
      <Section spacing="md">
        <Container className="max-w-xl space-y-6">
          <Card className="p-6 sm:p-10 space-y-6 text-center bg-surface border-border shadow-2xs animate-fade-in-slow">
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-full bg-accent-soft text-primary flex items-center justify-center">
                <RotateCcw className="w-6 h-6" strokeWidth={1.75} />
              </div>
            </div>
            <div className="space-y-2">
              <Heading level={1} className="text-xl sm:text-2xl font-semibold text-text">
                Phiên tư vấn đã được làm mới
              </Heading>
              <p className="font-body text-sm text-text-muted leading-relaxed">
                Vì mục tiêu bảo vệ quyền riêng tư, Ép Xanh không lưu trữ thông tin thể trạng của bạn trên trình duyệt khi tải lại trang. Hãy thực hiện lại khảo sát để nhận thực đơn phù hợp nhất nhé!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <LinkButton
                href={routes.consultation()}
                variant="primary"
                onClick={reset}
                className="w-full sm:w-auto min-h-11 px-6"
              >
                Tư vấn lộ trình mới
              </LinkButton>
              <LinkButton
                href={routes.home()}
                variant="secondary"
                className="w-full sm:w-auto min-h-11 px-6"
              >
                {FIXED_LABELS.ACTION_BACK_TO_HOME}
              </LinkButton>
            </div>
          </Card>
        </Container>
      </Section>
    );
  }

  // Trạng thái màn hình Loading / Phân tích trung gian
  if (isAnalyzing || isPending) {
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
                <span>Cân đối cơ cấu 5 chai/ngày (3 Sinh tố + 1 Nước ép + 1 Sữa hạt)</span>
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

  // Màn hình báo lỗi nếu API gặp sự cố (không fallback về mock)
  if (isError || !displayPlan) {
    return (
      <Section spacing="md">
        <Container className="max-w-xl space-y-6">
          <Card className="p-6 sm:p-10 space-y-6 text-center bg-surface border-border shadow-2xs">
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-full bg-danger/10 text-danger flex items-center justify-center">
                <AlertCircle className="w-6 h-6" strokeWidth={2} />
              </div>
            </div>
            <div className="space-y-2">
              <Heading level={1} className="text-xl sm:text-2xl font-semibold text-text">
                Không thể tải kết quả phân tích
              </Heading>
              <p className="font-body text-sm text-text-muted leading-relaxed">
                {error?.message || "Đã xảy ra sự cố kết nối tới máy chủ khi tổng hợp lộ trình. Vui lòng thử lại."}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Button
                variant="primary"
                onClick={handleRetrySubmit}
                className="w-full sm:w-auto flex items-center justify-center gap-2 min-h-11 px-5"
              >
                <RefreshCw className="w-4 h-4" strokeWidth={2} />
                <span>Thử lại</span>
              </Button>
              <LinkButton
                href={routes.consultation()}
                variant="secondary"
                onClick={reset}
                className="w-full sm:w-auto min-h-11 px-5"
              >
                {FIXED_LABELS.ACTION_RETRY}
              </LinkButton>
            </div>
          </Card>
        </Container>
      </Section>
    );
  }

  const allWarnings = [
    ...(warningMessage ? [warningMessage] : []),
    ...(apiResult?.warnings ?? apiResult?.safetyAlerts ?? []),
  ];

  return (
    <Section spacing="md">
      <Container className="max-w-3xl space-y-8">
        {/* Section 1: Header kết quả & Khối chia sẻ thể trạng */}
        <div className="space-y-6 animate-fade-in-slow" style={{ animationDelay: "0ms" }}>
          <div className="space-y-3 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-soft text-primary font-heading font-medium text-xs border border-border">
              <span
                className="h-1.5 w-1.5 rounded-full bg-primary"
                aria-hidden="true"
              />
              <span>Gợi ý thực đơn theo thể trạng</span>
            </div>
            <Heading
              level={1}
              size="3xl"
              className="font-semibold text-2xl sm:text-3xl lg:text-4xl text-text leading-snug"
            >
              Thực đơn gợi ý dành cho {capitalHonorific}
            </Heading>
            <p className="font-body text-base text-text-muted leading-relaxed max-w-2xl">
              {recommendationReason}
            </p>
          </div>

          {/* Khối chia sẻ thể trạng */}
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
                  Dựa trên thông tin {honorific} chia sẻ (
                  <b>
                    BMI ~{bmi}
                    {apiResult?.assessment?.category
                      ? ` · ${apiResult.assessment.category}`
                      : ""}
                  </b>
                  ), cơ thể {honorific} đang phản ánh rõ nhu cầu cần được nghỉ ngơi
                  ở hệ tiêu hóa và xoa dịu cảm giác <b>{goalsSummary}</b>.
                </p>
                <p className="font-body text-sm text-text-muted leading-relaxed">
                  Tại Ép Xanh Chữa Lành, các bạn barista ép tươi từng chai mỗi sáng
                  từ nông sản canh tác an toàn. Lộ trình này được thiết kế để{" "}
                  {honorific} uống trọn vẹn trong ngày một cách dễ chịu, không bị
                  hụt năng lượng hay cồn cào bao tử.
                </p>
              </div>
            </div>

            {/* Khối lưu ý kết hợp duy nhất (tránh lặp 2 lần Lưu ý) */}
            {((safety?.allergies && safety.allergies.length > 0) || allWarnings.length > 0) && (
              <div className="p-4 rounded-xl bg-bg/80 border border-border/80 space-y-2.5">
                <span className="text-xs font-semibold text-text block">
                  Lưu ý riêng cho {honorific}:
                </span>
                <div className="space-y-2 text-xs">
                  {safety?.allergies && safety.allergies.length > 0 && (
                    <div className="flex items-start gap-2 text-text-muted leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      <p>
                        <span className="font-medium text-text">Dị ứng & khẩu vị:</span>{" "}
                        Quán đã ghi nhận cơ thể bạn dị ứng hoặc không quen dùng:{" "}
                        <b className="text-text">{safety.allergies.join(", ")}</b>. Đội
                        ngũ barista sẽ chủ động đổi nguyên liệu thay thế tương đương khi
                        chuẩn bị thực đơn cho bạn.
                      </p>
                    </div>
                  )}
                  {allWarnings.map((warning, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-text-muted leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-error mt-1.5 shrink-0" />
                      <p>
                        <span className="font-medium text-text">Thể trạng:</span>{" "}
                        {warning}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Section 2: Khối xem lại & chỉnh sửa thông tin từng bước */}
        <div className="animate-fade-in-slow" style={{ animationDelay: "150ms" }}>
          <Card className="p-5 sm:p-6 space-y-4 bg-surface border-border">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
              <div>
                <h2 className="font-heading font-semibold text-base sm:text-lg text-text">
                  Thông tin bạn đã cung cấp
                </h2>
                <p className="font-body text-xs text-text-muted">
                  Bạn có thể chọn chỉnh sửa bất kỳ bước nào mà không làm mất các thông tin đã điền.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  reset();
                  router.push(routes.consultation());
                }}
                className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-danger transition-colors self-start sm:self-auto py-1 px-2 rounded-md hover:bg-danger/10 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.75} />
                <span>Làm lại từ đầu</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Bước 1: Cơ thể */}
              <div className="p-3.5 rounded-xl border border-border/70 bg-bg/40 flex items-start justify-between gap-3">
                <div className="space-y-1 text-xs">
                  <span className="font-semibold text-primary block">01. Thông tin cơ thể</span>
                  <p className="text-text font-medium">
                    {body?.name || "Bạn"} · {body?.gender === "male" ? "Nam" : "Nữ"} · {body?.age ?? "--"} tuổi
                  </p>
                  <p className="text-text-muted">
                    {body?.heightCm ?? "--"}cm · {body?.weightKg ?? "--"}kg (BMI ~{bmi})
                    {body?.activityLevel ? ` · ${ACTIVITY_LABELS[body.activityLevel]}` : ""}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => router.push(routes.consultation())}
                  className="shrink-0 p-1.5 text-xs font-medium text-primary hover:text-primary hover:bg-accent-soft rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                  aria-label="Sửa thông tin cơ thể"
                >
                  <Pencil className="w-3.5 h-3.5" strokeWidth={1.75} />
                  <span>Sửa</span>
                </button>
              </div>

              {/* Bước 2: Mục tiêu */}
              <div className="p-3.5 rounded-xl border border-border/70 bg-bg/40 flex items-start justify-between gap-3">
                <div className="space-y-1 text-xs">
                  <span className="font-semibold text-primary block">02. Nhu cầu & Mục tiêu</span>
                  <p className="text-text font-medium leading-relaxed">
                    {goals && goals.length > 0
                      ? goals.map((g) => GOAL_SHORT_NAMES[g] ?? g).join(", ")
                      : "Chưa chọn"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => router.push(routes.consultationGoals())}
                  className="shrink-0 p-1.5 text-xs font-medium text-primary hover:text-primary hover:bg-accent-soft rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                  aria-label="Sửa mục tiêu"
                >
                  <Pencil className="w-3.5 h-3.5" strokeWidth={1.75} />
                  <span>Sửa</span>
                </button>
              </div>

              {/* Bước 3: Kinh nghiệm & Lộ trình */}
              <div className="p-3.5 rounded-xl border border-border/70 bg-bg/40 flex items-start justify-between gap-3">
                <div className="space-y-1 text-xs">
                  <span className="font-semibold text-primary block">03. Kinh nghiệm & Thời gian</span>
                  <p className="text-text font-medium">
                    {experience?.durationDays ? `Gói ${experience.durationDays} ngày` : "Chưa chọn"}
                  </p>
                  <p className="text-text-muted">
                    {experience?.experienceLevel
                      ? EXPERIENCE_LABELS[experience.experienceLevel]
                      : "Chưa có kinh nghiệm"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => router.push(routes.consultationExperience())}
                  className="shrink-0 p-1.5 text-xs font-medium text-primary hover:text-primary hover:bg-accent-soft rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                  aria-label="Sửa kinh nghiệm và số ngày"
                >
                  <Pencil className="w-3.5 h-3.5" strokeWidth={1.75} />
                  <span>Sửa</span>
                </button>
              </div>

              {/* Bước 4: Lưu ý an toàn & Dị ứng */}
              <div className="p-3.5 rounded-xl border border-border/70 bg-bg/40 flex items-start justify-between gap-3">
                <div className="space-y-1 text-xs">
                  <span className="font-semibold text-primary block">04. Lưu ý & Dị ứng</span>
                  <p className="text-text font-medium">
                    {safety?.allergies && safety.allergies.length > 0
                      ? `Dị ứng: ${safety.allergies.join(", ")}`
                      : "Không dị ứng nguyên liệu nào"}
                  </p>
                  <p className="text-text-muted">
                    {safety?.pregnantOrNursing ||
                    safety?.medicalConditions ||
                    safety?.regularMedication ||
                    safety?.eatingDisorder
                      ? "Có tiền sử bệnh/thuốc"
                      : "Sức khỏe cơ bản ổn định"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => router.push(routes.consultationSafety())}
                  className="shrink-0 p-1.5 text-xs font-medium text-primary hover:text-primary hover:bg-accent-soft rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                  aria-label="Sửa lưu ý an toàn và dị ứng"
                >
                  <Pencil className="w-3.5 h-3.5" strokeWidth={1.75} />
                  <span>Sửa</span>
                </button>
              </div>
            </div>
          </Card>
        </div>

        {/* Section 3: Chi tiết lộ trình theo ngày */}
        {displayPlan.days && displayPlan.days.length > 0 && (
          <div className="animate-fade-in-slow" style={{ animationDelay: "300ms" }}>
            <PlanDayScheduleView plan={displayPlan} />
          </div>
        )}

        {/* Section 4: Khối liên hệ & sao chép gửi shop */}
        <div
          className="p-6 rounded-3xl bg-accent-soft/30 border border-border flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in-slow"
          style={{ animationDelay: "450ms" }}
        >
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

        {/* Section 5: Disclaimer Note & Phím thử lại */}
        <div
          className="space-y-4 animate-fade-in-slow"
          style={{ animationDelay: "600ms" }}
        >
          <DisclaimerNote className="max-w-xl mx-auto pt-2">
            {apiResult?.disclaimer ? `*${apiResult.disclaimer}` : undefined}
          </DisclaimerNote>

          <div className="flex items-center justify-center gap-4 pt-2">
            <LinkButton
              href={routes.consultation()}
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
              href={routes.home()}
              variant="ghost"
              className="text-xs font-medium text-text-muted hover:text-text"
            >
              {FIXED_LABELS.ACTION_BACK_TO_HOME}
            </LinkButton>
          </div>
        </div>
      </Container>
    </Section>
  );
}
