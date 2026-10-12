/* Hallmark · macrostructure: Hum-07 Guided Stage Progression · tone: editorial-calm · anchor hue: 150 (sage green)
 * theme: studied-DNA (Hum-07 Bubble) · font: Be Vietnam Pro (single clean sans 300/400/500/600)
 */

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Clock,
  Bell,
  Sparkles,
  Check,
} from "lucide-react";
import {
  Container,
  Section,
  Heading,
  Card,
  LinkButton,
  DetoxBottle,
  DisclaimerNote,
} from "@/components/ui";
import { PLANS_DATA } from "@/data/plans";
import { DRINKS_DATA } from "@/data/drinks";
import { ARTICLES_DATA } from "@/data/articles";
import { FIXED_LABELS } from "@/config/copy";
import { ROUTES } from "@/config/routes";
import { SITE_CONFIG } from "@/config/site";
import { DetoxMechanismSection } from "@/features/home/components/DetoxMechanismSection";

const PLAN_STAGE_DETAILS: Record<
  string,
  {
    step: string;
    kicker: string;
    subheading: string;
    description: React.ReactNode;
    durationPill: string;
    intensityPill: string;
    progressPercent: number;
    progressLabel: string;
    bottleSize: "md" | "lg";
    bottleLevel: number;
    bottleColor: "soft" | "green" | "warm";
  }
> = {
  "1-day": {
    step: "01",
    kicker: "Giai đoạn 1 · Khởi đầu làm quen",
    subheading: "Đánh thức hệ tiêu hóa",
    description: (
      <>
        Năm chai nước ép xanh thanh nhẹ cho ngày nghỉ cuối tuần hoặc lần đầu làm
        quen với detox.{" "}
        <b className="font-semibold text-text">Giúp đường ruột nghỉ ngơi</b>, dễ
        uống và không làm xáo trộn nhịp sinh hoạt thường nhật.
      </>
    ),
    durationPill: "1 ngày · 5 chai",
    intensityPill: "Khởi động nhẹ",
    progressPercent: 33,
    progressLabel: "Thử thách bước đầu",
    bottleSize: "md",
    bottleLevel: 60,
    bottleColor: "soft",
  },
  "3-day": {
    step: "02",
    kicker: "Giai đoạn 2 · Cân bằng thanh lọc",
    subheading: "Cân bằng nhịp sinh học",
    description: (
      <>
        Mười lăm chai trải đều ba ngày, luân phiên cần tây, táo xanh, cà rốt và
        củ dền cùng gừng ấm.{" "}
        <b className="font-semibold text-text">Cung cấp vitamin tự nhiên</b> và
        rèn luyện thói quen tiếp nhận nước ép thực vật nguyên chất.
      </>
    ),
    durationPill: "3 ngày · 15 chai",
    intensityPill: "Cân bằng · Phổ biến nhất",
    progressPercent: 66,
    progressLabel: "Nhịp sinh học chuẩn",
    bottleSize: "md",
    bottleLevel: 75,
    bottleColor: "green",
  },
  "6-day": {
    step: "03",
    kicker: "Giai đoạn 3 · Chuyên sâu phục hồi",
    subheading: "Chăm sóc thể trạng toàn diện",
    description: (
      <>
        Ba mươi chai chia thành hai đợt giao tươi để đảm bảo chất lượng dinh
        dưỡng tối đa.{" "}
        <b className="font-semibold text-text">Thiết lập chu kỳ phục hồi sâu</b>{" "}
        cho người đã quen uống nước ép rau củ kiên trì.
      </>
    ),
    durationPill: "6 ngày · 30 chai (2 đợt)",
    intensityPill: "Chuyên sâu · Kiên trì",
    progressPercent: 100,
    progressLabel: "Chu kỳ phục hồi sâu",
    bottleSize: "md",
    bottleLevel: 90,
    bottleColor: "warm",
  },
};

export default function HomePage() {
  const featuredDrinks = DRINKS_DATA.slice(0, 2);
  const featuredArticle = ARTICLES_DATA[0];

  return (
    <div className="flex flex-col w-full">
      {/* 1. Phần Tư Vấn Lộ Trình: Section đầu tiên, nổi bật nhất, đập ngay vào mắt người dùng */}
      <Section
        spacing="md"
        className="border-b border-border bg-accent-soft/35 relative overflow-hidden"
      >
        <Container>
          <div className="max-w-4xl mx-auto rounded-3xl bg-surface border-2 border-primary/40 p-6 sm:p-10 shadow-sm space-y-6 sm:space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-5">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-accent-soft text-primary font-heading font-semibold text-xs border border-primary/20">
                  <Sparkles size={13} className="text-primary" />
                  <span>Tư vấn lộ trình thể trạng</span>
                </div>
                <Heading
                  level={1}
                  size="2xl"
                  className="font-semibold text-2xl sm:text-3xl lg:text-4xl text-text leading-tight tracking-tight"
                >
                  Nhận lộ trình nước ép phù hợp với thể trạng của bạn
                </Heading>
              </div>

              <LinkButton
                href={ROUTES.CONSULTATION}
                variant="primary"
                rounded="full"
                className="min-h-12 px-7 text-base font-semibold shadow-xs shrink-0 self-start sm:self-auto transition-transform duration-200 hover:-translate-y-0.5 active:scale-95"
              >
                <span>{FIXED_LABELS.ACTION_VIEW_MY_PLAN}</span>
                <ArrowRight size={18} strokeWidth={2} />
              </LinkButton>
            </div>

            <div className="space-y-3">
              <p className="text-sm sm:text-base text-text-muted font-body leading-relaxed">
                Các bạn, các chị hoặc các mom cho shop xin một ít thông tin nhỏ
                về thể trạng hiện tại để nhận ngay gợi ý phân bổ 5 chai rau củ
                tươi trong ngày:
              </p>

              {/* 3 Thẻ nhu cầu thể trạng đập ngay vào mắt */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <Link
                  href={ROUTES.CONSULTATION}
                  className="p-4 rounded-2xl bg-bg border border-border/80 flex flex-col justify-between gap-2.5 transition-all duration-200 hover:border-primary hover:bg-accent-soft/40 hover:-translate-y-0.5 group"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-accent-soft text-primary flex items-center justify-center shrink-0">
                      <Check size={13} strokeWidth={2.5} />
                    </div>
                    <span className="font-heading font-semibold text-sm text-text group-hover:text-primary transition-colors">
                      Đầy bụng, khó tiêu
                    </span>
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed font-body">
                    Hệ tiêu hóa cần khoảng nghỉ nhẹ nhàng với cần tây, dưa leo
                    và táo xanh.
                  </p>
                </Link>

                <Link
                  href={ROUTES.CONSULTATION}
                  className="p-4 rounded-2xl bg-bg border border-border/80 flex flex-col justify-between gap-2.5 transition-all duration-200 hover:border-primary hover:bg-accent-soft/40 hover:-translate-y-0.5 group"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-accent-soft text-primary flex items-center justify-center shrink-0">
                      <Check size={13} strokeWidth={2.5} />
                    </div>
                    <span className="font-heading font-semibold text-sm text-text group-hover:text-primary transition-colors">
                      Nóng trong, háo nước
                    </span>
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed font-body">
                    Thanh nhiệt tự nhiên với nhiều khoáng chất và vitamin từ củ
                    quả tươi.
                  </p>
                </Link>

                <Link
                  href={ROUTES.CONSULTATION}
                  className="p-4 rounded-2xl bg-bg border border-border/80 flex flex-col justify-between gap-2.5 transition-all duration-200 hover:border-primary hover:bg-accent-soft/40 hover:-translate-y-0.5 group"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-accent-soft text-primary flex items-center justify-center shrink-0">
                      <Check size={13} strokeWidth={2.5} />
                    </div>
                    <span className="font-heading font-semibold text-sm text-text group-hover:text-primary transition-colors">
                      Làm quen nhẹ 1 ngày
                    </span>
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed font-body">
                    Bắt đầu với các vị thanh ngọt, êm dịu không làm xáo trộn
                    nhịp sinh hoạt.
                  </p>
                </Link>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1 border-t border-border/60">
              <DisclaimerNote className="text-left" />
              <Link
                href={ROUTES.CONSULTATION}
                className="inline-flex items-center gap-1.5 text-base font-semibold text-primary hover:underline self-start sm:self-auto shrink-0"
              >
                <span>Bắt đầu khảo sát chi tiết</span>
                <ArrowRight size={16} strokeWidth={2} />
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* 2. Hero Section như ban đầu: chuyển xuống vị trí thứ 2 */}
      <Section
        spacing="lg"
        className="border-b border-border bg-surface/40 overflow-hidden"
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
              <div className="space-y-4 max-w-2xl">
                <Heading
                  level={2}
                  size="3xl"
                  className="font-semibold text-3xl sm:text-4xl lg:text-5xl leading-tight sm:leading-[1.18] tracking-tight text-text"
                >
                  Nước ép tươi, chọn{" "}
                  <span className="relative inline-block text-primary decoration-primary/40 underline decoration-2 underline-offset-8">
                    lộ trình phù hợp với thể trạng
                  </span>{" "}
                  của bạn.
                </Heading>
                <p className="text-base sm:text-lg text-text-muted font-body leading-relaxed max-w-xl">
                  Các bạn, các chị hoặc các mom cho shop xin một ít thông tin
                  nhỏ để giúp mình có cái nhìn rõ hơn về cơ thể và lộ trình phù
                  hợp nhé.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto pt-2">
                <LinkButton
                  href={ROUTES.CONSULTATION}
                  variant="primary"
                  rounded="full"
                  className="w-full sm:w-auto min-h-12 text-base px-8 py-3.5 font-medium select-none shadow-xs transition-transform duration-200 hover:-translate-y-0.5 active:scale-95"
                >
                  <span>{FIXED_LABELS.ACTION_VIEW_MY_PLAN}</span>
                  <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
                </LinkButton>
                <LinkButton
                  href="#stages"
                  variant="secondary"
                  rounded="full"
                  className="w-full sm:w-auto min-h-12 text-base px-7 py-3.5 font-medium select-none text-text hover:text-primary hover:border-primary/50"
                >
                  <span>Xem 3 giai đoạn</span>
                  <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
                </LinkButton>
              </div>

              <DisclaimerNote className="text-left sm:text-left pt-1" />
            </div>

            <div className="lg:col-span-5 flex flex-col items-center gap-5 w-full max-w-md mx-auto lg:max-w-none">
              <div className="w-full aspect-4/5 sm:aspect-square lg:aspect-4/5 max-h-110 rounded-3xl bg-accent-soft/30 border border-border/80 flex items-center justify-center p-6 sm:p-8 relative overflow-hidden shadow-2xs">
                <DetoxBottle
                  size="xl"
                  color="green"
                  level={65}
                  label="Chai nước ép tươi Ép Xanh"
                />
              </div>

              <div
                className="w-full rounded-2xl border border-border bg-surface p-4 space-y-1.5 shadow-2xs"
                role="status"
              >
                <div className="flex items-center gap-2 text-xs font-medium text-primary">
                  <Bell size={14} strokeWidth={1.75} aria-hidden="true" />
                  <span className="font-semibold">Ép Xanh</span>
                  <span className="text-text-muted">· mỗi sáng</span>
                </div>
                <p className="text-sm text-text font-body leading-relaxed">
                  Chai đầu tiên lúc 7h — rau củ tươi ép chậm, uống từ từ để cơ
                  thể hấp thu.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. Section Giải thích cơ chế Detox & Mô phỏng lộ trình 3 ngày (Redux-style flow) */}
      <DetoxMechanismSection />

      <Section id="stages" spacing="md" className="border-b border-border">
        <Container className="space-y-8 sm:space-y-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full bg-primary"
                aria-hidden="true"
              />
              <span className="text-xs font-medium text-primary tracking-wider">
                Giai đoạn lộ trình
              </span>
            </div>
            <Heading
              level={2}
              size="2xl"
              className="font-semibold text-2xl sm:text-3xl lg:text-4xl text-text tracking-tight"
            >
              Ba giai đoạn, từ làm quen đến chuyên sâu.
            </Heading>
            <p className="text-base text-text-muted font-body leading-relaxed max-w-xl">
              Mỗi liệu trình phục vụ một nhu cầu thể trạng riêng biệt. Bạn chỉ
              cần chọn gói phù hợp — quán chuẩn bị theo thực đơn nông sản tươi
              mỗi ngày.
            </p>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {PLANS_DATA.map((plan, idx) => {
              const details = PLAN_STAGE_DETAILS[plan.id] ?? {
                step: `0${idx + 1}`,
                kicker: `Giai đoạn ${idx + 1}`,
                subheading: plan.title,
                description: plan.description,
                durationPill: `${plan.durationDays} ngày`,
                intensityPill: "Tiêu chuẩn",
                progressPercent: Math.round(((idx + 1) / 3) * 100),
                progressLabel: "Tiến trình thích ứng",
                bottleSize: "md" as const,
                bottleLevel: 65,
                bottleColor: "green" as const,
              };
              const isLast = idx === PLANS_DATA.length - 1;

              const nodeColor =
                idx === 0
                  ? "bg-accent-soft text-primary border border-primary/25"
                  : idx === 1
                    ? "bg-primary text-bg border border-primary shadow-xs"
                    : "bg-accent-subtle text-text border border-border";

              const artBg =
                idx === 0
                  ? "bg-accent-soft/30"
                  : idx === 1
                    ? "bg-accent-soft/60"
                    : "bg-accent-subtle/30";

              return (
                <div
                  key={plan.id}
                  className="flex items-stretch gap-4 sm:gap-6 group"
                >
                  {/* Left Spine: Squircle Node & Vertical Connecting Line */}
                  <div className="flex flex-col items-center shrink-0">
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center font-heading font-semibold text-base sm:text-lg select-none transition-all duration-normal shadow-2xs ring-4 ring-surface ${nodeColor}`}
                    >
                      <span>{details.step}</span>
                    </div>
                    {!isLast ? (
                      <div
                        className="w-1 bg-border/80 group-hover:bg-primary/50 flex-1 my-3 rounded-full transition-colors duration-normal"
                        aria-hidden="true"
                      />
                    ) : null}
                  </div>

                  {/* Stage Card (Hum-07 stage__panel) */}
                  <div className="flex-1 rounded-3xl border border-border bg-surface p-6 sm:p-8 hover:border-primary/50 transition-all duration-300 ease-soft hover:-translate-y-1 hover:shadow-2xs">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">
                      {/* Left Copy Column */}
                      <div className="flex-1 space-y-4">
                        {/* Kicker Header */}
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <span className="text-xs font-semibold tracking-wide text-primary block">
                            {details.kicker}
                          </span>
                          <span className="text-xs font-medium text-text-muted px-2.5 py-0.5 rounded-full bg-bg border border-border/70">
                            {plan.title}
                          </span>
                        </div>

                        {/* Title & Description */}
                        <div className="space-y-2">
                          <Heading
                            level={3}
                            size="xl"
                            className="font-semibold text-xl sm:text-2xl text-text tracking-tight"
                          >
                            {details.subheading}
                          </Heading>
                          <p className="text-sm sm:text-base text-text-muted font-body leading-relaxed">
                            {details.description}
                          </p>
                        </div>

                        {/* Metadata Chips */}
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-soft/70 text-text font-medium text-xs border border-border/40">
                            <span
                              className="h-1.5 w-1.5 rounded-full bg-primary"
                              aria-hidden="true"
                            />
                            {details.durationPill}
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bg text-text-muted font-medium text-xs border border-border/70">
                            <span
                              className="h-1.5 w-1.5 rounded-full bg-text-muted/60"
                              aria-hidden="true"
                            />
                            {details.intensityPill}
                          </span>
                        </div>

                        {/* Card Progress: Visual Progression Bar */}
                        <div className="space-y-1.5 pt-2 max-w-sm">
                          <div className="flex items-center justify-between text-xs font-medium">
                            <span className="text-text-muted flex items-center gap-1.5">
                              <span
                                className="h-1.5 w-1.5 rounded-full bg-primary"
                                aria-hidden="true"
                              />
                              Tiến trình thích ứng:{" "}
                              <span className="text-text font-semibold">
                                {details.progressLabel}
                              </span>
                            </span>
                            <span className="text-primary font-semibold">
                              {details.progressPercent}%
                            </span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-bg border border-border/70 overflow-hidden p-0.5">
                            <div
                              className="h-full rounded-full bg-primary transition-all duration-normal"
                              style={{ width: `${details.progressPercent}%` }}
                            />
                          </div>
                        </div>

                        {/* Action Link */}
                        <div className="pt-2">
                          <Link
                            href={`/plans/${plan.id}`}
                            className="inline-flex items-center gap-1.5 min-h-10 text-sm font-semibold text-primary hover:underline transition-colors select-none group/link"
                          >
                            <span>Xem chi tiết liệu trình</span>
                            <ArrowRight
                              size={15}
                              strokeWidth={1.75}
                              aria-hidden="true"
                              className="transition-transform duration-200 group-hover/link:translate-x-1"
                            />
                          </Link>
                        </div>
                      </div>

                      {/* Right Column: Stage Art Container with LARGER DetoxBottle */}
                      <div
                        className={`shrink-0 w-36 h-44 sm:w-48 sm:h-56 rounded-3xl border border-border/60 flex items-center justify-center p-4 sm:p-6 self-center lg:self-center shadow-2xs ${artBg}`}
                      >
                        <DetoxBottle
                          size="md"
                          color={details.bottleColor}
                          level={details.bottleLevel}
                          label={plan.title}
                          className="transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Spotlight Banner: Đón đầu người dùng còn phân vân, tối đa hóa chuyển đổi vào Tư Vấn */}
          <div className="p-6 sm:p-8 rounded-3xl bg-accent-soft/40 border border-primary/30 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xs">
            <div className="space-y-2 text-center lg:text-left max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface text-primary font-heading font-medium text-xs border border-border">
                <Sparkles size={12} className="text-primary" />
                <span>Bạn còn phân vân?</span>
              </div>
              <h3 className="font-heading font-semibold text-xl sm:text-2xl text-text">
                Chưa biết thể trạng mình phù hợp với gói nào?
              </h3>
              <p className="font-body text-sm text-text-muted leading-relaxed">
                Đừng lo lắng, hãy làm bài trắc nghiệm 1 phút để Ép Xanh phân
                tích BMI và gợi ý thực đơn 5 chai/ngày phù hợp với cơ thể bạn
                nhất.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
              <LinkButton
                href={ROUTES.CONSULTATION}
                variant="primary"
                rounded="full"
                className="w-full sm:w-auto min-h-12 px-7 text-sm font-semibold shadow-xs justify-center transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
              >
                <span>Tư vấn lộ trình ngay</span>
                <ArrowRight size={16} strokeWidth={2} />
              </LinkButton>
              <LinkButton
                href={SITE_CONFIG.threadsUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                rounded="full"
                className="w-full sm:w-auto min-h-12 px-6 text-sm font-medium justify-center"
              >
                <span>Nhắn shop trên Threads</span>
                <ArrowUpRight size={15} strokeWidth={1.75} />
              </LinkButton>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. Honest Math Section (DNA Hum-07 "Mostly, you wait") */}
      <Section spacing="md" className="border-b border-border bg-surface/30">
        <Container className="space-y-8">
          <div className="space-y-1 max-w-xl">
            <span className="text-xs font-medium text-primary tracking-wide block">
              Con số minh bạch
            </span>
            <Heading
              level={2}
              size="2xl"
              className="font-medium text-xl sm:text-2xl text-text"
            >
              Thực tế & Nguyên bản.
            </Heading>
            <p className="text-sm text-text-muted font-body">
              Không lời hứa thần kỳ hay cam kết giảm cân phi khoa học.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2 rounded-xl border border-border bg-surface p-5 sm:p-6">
              <span className="font-heading font-semibold text-3xl sm:text-4xl text-primary tracking-tight block">
                100%
              </span>
              <span className="text-sm font-medium text-text block">
                Nông sản tươi ép
              </span>
              <p className="text-xs text-text-muted font-body leading-relaxed">
                Rau củ quả tươi từ các nông trại Việt Nam, ép chậm nguyên chất
                mỗi sáng.
              </p>
            </div>

            <div className="space-y-2 rounded-xl border border-border bg-surface p-5 sm:p-6">
              <span className="font-heading font-semibold text-3xl sm:text-4xl text-primary tracking-tight block">
                0
              </span>
              <span className="text-sm font-medium text-text block">
                Đường cát & Phụ gia
              </span>
              <p className="text-xs text-text-muted font-body leading-relaxed">
                Vị ngọt hoàn toàn tự nhiên từ táo, dứa, cà rốt và củ dền tươi
                nguyên.
              </p>
            </div>

            <div className="space-y-2 rounded-xl border border-border bg-surface p-5 sm:p-6">
              <span className="font-heading font-semibold text-3xl sm:text-4xl text-primary tracking-tight block">
                3
              </span>
              <span className="text-sm font-medium text-text block">
                Lộ trình thực tế
              </span>
              <p className="text-xs text-text-muted font-body leading-relaxed">
                Một, ba hoặc sáu ngày dựa trên năng lực phục vụ thực tế của
                quán.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. Khối Thức uống nổi bật (2 món mẫu) */}
      <Section spacing="md" className="border-b border-border">
        <Container className="space-y-6 sm:space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-medium text-primary tracking-wide block">
                Thực đơn tươi
              </span>
              <Heading
                level={2}
                size="2xl"
                className="font-medium text-xl sm:text-2xl text-text"
              >
                Thức uống từ nông sản tươi
              </Heading>
              <p className="text-sm text-text-muted font-body">
                Nước ép nguyên chất không thêm đường cát hay phụ gia công
                nghiệp.
              </p>
            </div>

            <Link
              href={ROUTES.DRINKS}
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline select-none"
            >
              <span>Xem toàn bộ thực đơn</span>
              <ArrowUpRight size={15} strokeWidth={1.75} aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {featuredDrinks.map((drink) => (
              <Card
                key={drink.slug}
                className="flex flex-col justify-between space-y-4 hover:border-primary/50 hover:-translate-y-1 hover:shadow-2xs transition-all duration-300 ease-soft group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-text-muted font-body">
                      {drink.categoryName}
                    </span>
                  </div>

                  <Heading
                    level={3}
                    size="xl"
                    className="font-medium text-lg sm:text-xl text-text"
                  >
                    {drink.name}
                  </Heading>

                  <p className="text-sm text-text-muted font-body leading-relaxed">
                    {drink.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {drink.ingredients.map((ing) => (
                      <span
                        key={ing}
                        className="px-2 py-0.5 rounded text-xs text-text-muted bg-bg border border-border/70"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-border/60">
                  <Link
                    href={`/drinks/${drink.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline transition-colors select-none"
                  >
                    <span>Xem thức uống</span>
                    <ArrowRight
                      size={14}
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 5. Khối Bài viết tham khảo (1 bài mẫu có nguồn) */}
      <Section spacing="md" className="border-b border-border bg-surface/30">
        <Container className="space-y-6 sm:space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-medium text-primary tracking-wide block">
                Góc kiến thức
              </span>
              <Heading
                level={2}
                size="2xl"
                className="font-medium text-xl sm:text-2xl text-text"
              >
                Hiểu đúng để chăm sóc cơ thể
              </Heading>
              <p className="text-sm text-text-muted font-body">
                Kiến thức dinh dưỡng tổng hợp từ các tổ chức y tế uy tín.
              </p>
            </div>

            <Link
              href={ROUTES.ARTICLES}
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline select-none"
            >
              <span>Xem tất cả bài viết</span>
              <ArrowUpRight size={15} strokeWidth={1.75} aria-hidden="true" />
            </Link>
          </div>

          <Card className="hover:border-primary/50 hover:-translate-y-1 hover:shadow-2xs transition-all duration-300 ease-soft group">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-2.5 max-w-2xl">
                <div className="flex items-center gap-3 text-xs text-text-muted">
                  <span className="font-medium text-primary bg-accent-soft px-2 py-0.5 rounded">
                    {featuredArticle.categoryName}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock size={12} strokeWidth={1.75} aria-hidden="true" />
                    {featuredArticle.readingTime}
                  </span>
                </div>

                <Heading
                  level={3}
                  size="xl"
                  className="font-medium text-lg sm:text-xl text-text"
                >
                  <Link
                    href={`/articles/${featuredArticle.slug}`}
                    className="hover:text-primary transition-colors"
                  >
                    {featuredArticle.title}
                  </Link>
                </Heading>

                <p className="text-sm text-text-muted font-body leading-relaxed">
                  {featuredArticle.excerpt}
                </p>
              </div>

              <Link
                href={`/articles/${featuredArticle.slug}`}
                className="shrink-0 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline pt-1 select-none"
              >
                <span>Đọc bài viết</span>
                <ArrowRight size={14} strokeWidth={1.75} aria-hidden="true" />
              </Link>
            </div>
          </Card>
        </Container>
      </Section>
    </div>
  );
}
