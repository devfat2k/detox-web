/* Hallmark · macrostructure: Hum-07 Guided Stage Progression · tone: editorial-calm · anchor hue: 150 (sage green)
 * theme: studied-DNA (Hum-07 Bubble) · font: Be Vietnam Pro (single clean sans 300/400/500/600)
 */

import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock, Bell } from "lucide-react";
import {
  Container,
  Section,
  Heading,
  Card,
  LinkButton,
  Notice,
  DetoxBottle,
} from "@/components/ui";
import { PLANS_DATA } from "@/data/plans";
import { DRINKS_DATA } from "@/data/drinks";
import { ARTICLES_DATA } from "@/data/articles";
import { FIXED_LABELS } from "@/config/copy";
import { ROUTES } from "@/config/routes";
import { SITE_CONFIG } from "@/config/site";

const PLAN_STAGE_DETAILS: Record<
  string,
  {
    index: string;
    kicker: string;
    subheading: string;
    description: React.ReactNode;
    durationPill: string;
    intensityPill: string;
  }
> = {
  "1-day": {
    index: "1.0",
    kicker: "1.0 · KHỞI ĐẦU · 1 NGÀY LÀM QUEN",
    subheading: "Đánh thức hệ tiêu hóa",
    description: (
      <>
        Năm chai nước ép xanh thanh nhẹ cho ngày nghỉ cuối tuần hoặc lần đầu làm quen với detox.{" "}
        <b className="font-semibold text-text">Giúp đường ruột nghỉ ngơi</b>, dễ uống và không làm xáo trộn nhịp sinh hoạt thường nhật.
      </>
    ),
    durationPill: "1 NGÀY · 5 CHAI",
    intensityPill: "KHỞI ĐỘNG · 5 MIN/NGỤM",
  },
  "3-day": {
    index: "2.0",
    kicker: "2.0 · CÂN BẰNG · 3 NGÀY THANH LỌC",
    subheading: "Cân bằng nhịp sinh học",
    description: (
      <>
        Mười lăm chai trải đều ba ngày, luân phiên cần tây, táo xanh, cà rốt và củ dền cùng gừng ấm.{" "}
        <b className="font-semibold text-text">Cung cấp vitamin tự nhiên</b> và rèn luyện thói quen tiếp nhận nước ép thực vật nguyên chất.
      </>
    ),
    durationPill: "3 NGÀY · 15 CHAI",
    intensityPill: "CÂN BẰNG · PHỔ BIẾN",
  },
  "6-day": {
    index: "3.0",
    kicker: "3.0 · CHUYÊN SÂU · 6 NGÀY PHỤC HỒI",
    subheading: "Chăm sóc thể trạng toàn diện",
    description: (
      <>
        Ba mươi chai chia thành hai đợt giao tươi để đảm bảo chất lượng dinh dưỡng tối đa.{" "}
        <b className="font-semibold text-text">Thiết lập chu kỳ phục hồi sâu</b> cho người đã quen uống nước ép rau củ kiên trì.
      </>
    ),
    durationPill: "6 NGÀY · 30 CHAI (2 ĐỢT)",
    intensityPill: "CHUYÊN SÂU · KIÊN TRÌ",
  },
};

export default function HomePage() {
  const featuredDrinks = DRINKS_DATA.slice(0, 2);
  const featuredArticle = ARTICLES_DATA[0];

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section (Hum-07 Bubble 2-column layout - Image 6.png) */}
      <Section spacing="lg" className="border-b border-border bg-surface/40 overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column (col-span-7) */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
              {/* Connected Stage Ticker */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-border text-xs text-text-muted font-body shadow-2xs">
                <span className="flex items-center gap-1.5 text-primary font-medium">
                  <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                  01 Khởi đầu
                </span>
                <span aria-hidden="true" className="text-border">───</span>
                <span className="flex items-center gap-1.5 text-text-muted font-medium">
                  <span className="h-2 w-2 rounded-full bg-border" aria-hidden="true" />
                  02 Cân bằng
                </span>
                <span aria-hidden="true" className="text-border">───</span>
                <span className="flex items-center gap-1.5 text-text-muted font-medium">
                  <span className="h-2 w-2 rounded-full bg-border" aria-hidden="true" />
                  03 Chuyên sâu
                </span>
              </div>

              {/* Display Headline with Accent Underline & Subhead */}
              <div className="space-y-4 max-w-2xl">
                <Heading
                  level={1}
                  size="3xl"
                  className="font-medium text-2xl sm:text-3xl lg:text-4xl leading-snug tracking-tight text-text"
                >
                  Nước ép tươi, chọn{" "}
                  <span className="relative inline-block text-primary decoration-primary/40 underline decoration-2 underline-offset-4">
                    lộ trình phù hợp với thể trạng
                  </span>{" "}
                  của bạn.
                </Heading>
                <p className="text-base sm:text-lg text-text-muted font-body leading-relaxed max-w-prose">
                  Ép Xanh Chữa Lành đồng hành cùng bạn lắng nghe cơ thể, tự khám phá lộ trình
                  1, 3 hoặc 6 ngày từ thực đơn nông sản tươi mỗi ngày của quán.
                </p>
              </div>

              {/* Action Buttons Row (Dual Pill Buttons) */}
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto pt-2">
                <LinkButton
                  href={ROUTES.CONSULTATION}
                  variant="primary"
                  className="rounded-full w-full sm:w-auto min-h-12 text-base px-7 py-3 font-semibold select-none shadow-xs"
                >
                  <span>{FIXED_LABELS.ACTION_VIEW_MY_PLAN}</span>
                  <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
                </LinkButton>
                <LinkButton
                  href="#stages"
                  variant="secondary"
                  className="rounded-full w-full sm:w-auto min-h-12 text-base px-6 py-3 font-medium select-none text-text hover:text-primary hover:border-primary/50"
                >
                  <span>Xem 3 giai đoạn</span>
                  <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
                </LinkButton>
              </div>

              {/* Micro-trust Uppercase Bar */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 text-xs font-body text-text-muted pt-1 tracking-wider uppercase">
                <span>100% ÉP TƯƠI</span>
                <span aria-hidden="true" className="text-border">·</span>
                <span>KHÔNG TẠO TÀI KHOẢN</span>
                <span aria-hidden="true" className="text-border">·</span>
                <span>TÍNH TOÁN TRÊN MÁY BẠN</span>
              </div>
            </div>

            {/* Right Column (col-span-5) - Visual Stack (hum-07 DNA: Detox Bottle + status card) */}
            <div className="lg:col-span-5 flex flex-col items-center gap-6">
              {/* Detox Bottle (Hum-07 Starter Jar illustration) */}
              <div className="p-4 rounded-3xl bg-accent-soft/30 border border-border/60 flex items-center justify-center">
                <DetoxBottle
                  size="lg"
                  color="green"
                  level={65}
                  label="Chai nước ép tươi Ép Xanh"
                />
              </div>

              {/* Floating Status Card (hum-07 remind widget) */}
              <div className="w-full max-w-xs rounded-xl border border-border bg-surface p-4 space-y-1.5" role="status">
                <div className="flex items-center gap-2 text-xs font-medium text-primary">
                  <Bell size={14} strokeWidth={1.75} aria-hidden="true" />
                  <span className="font-semibold">Ép Xanh</span>
                  <span className="text-text-muted">· mỗi sáng</span>
                </div>
                <p className="text-sm text-text font-body leading-relaxed">
                  Chai đầu tiên lúc 7h — rau củ tươi ép chậm, uống từ từ để cơ thể hấp thu.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 2. Stages Section (Hum-07 vertical timeline layout - "Four stages, start to slice.") */}
      <Section id="stages" spacing="md" className="border-b border-border">
        <Container className="space-y-8 sm:space-y-12">
          {/* Section Header with Dot Eyebrow */}
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
              <span className="text-xs font-semibold text-primary tracking-widest uppercase">
                GIAI ĐOẠN LỘ TRÌNH
              </span>
            </div>
            <Heading level={2} size="2xl" className="font-semibold text-2xl sm:text-3xl lg:text-4xl text-text tracking-tight">
              Ba giai đoạn, từ làm quen đến chuyên sâu.
            </Heading>
            <p className="text-base text-text-muted font-body leading-relaxed max-w-xl">
              Mỗi liệu trình phục vụ một nhu cầu thể trạng riêng biệt. Bạn chỉ cần chọn
              gói phù hợp — quán chuẩn bị theo thực đơn nông sản tươi mỗi ngày.
            </p>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {PLANS_DATA.map((plan, idx) => {
              const details = PLAN_STAGE_DETAILS[plan.id] ?? {
                index: `${plan.durationDays}.0`,
                kicker: `${plan.durationDays}.0 · LỘ TRÌNH`,
                subheading: plan.title,
                description: plan.description,
                durationPill: `${plan.durationDays} NGÀY`,
                intensityPill: "TIÊU CHUẨN",
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
                <div key={plan.id} className="flex items-stretch gap-4 sm:gap-6 group">
                  {/* Left Spine: Squircle Node & Vertical Connecting Line */}
                  <div className="flex flex-col items-center shrink-0">
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center font-heading font-semibold text-base sm:text-lg select-none transition-colors ${nodeColor}`}
                    >
                      <span>
                        {details.index.split(".")[0]}
                        <span className="text-xs font-normal">.{details.index.split(".")[1]}</span>
                      </span>
                    </div>
                    {!isLast ? (
                      <div
                        className="w-0.5 bg-border group-hover:bg-primary/40 flex-1 my-2 transition-colors"
                        aria-hidden="true"
                      />
                    ) : null}
                  </div>

                  {/* Stage Card (Hum-07 stage__panel) */}
                  <div className="flex-1 rounded-3xl border border-border bg-surface p-6 sm:p-8 hover:border-primary/50 transition-colors duration-fast shadow-2xs">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                      {/* Left Copy Column */}
                      <div className="flex-1 space-y-4">
                        {/* Kicker Header */}
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-semibold tracking-wider text-primary uppercase block">
                            {details.kicker}
                          </span>
                          <span className="text-xs font-medium text-text-muted">
                            {plan.title}
                          </span>
                        </div>

                        {/* Title & Description */}
                        <div className="space-y-2">
                          <Heading level={3} size="xl" className="font-semibold text-xl sm:text-2xl text-text tracking-tight">
                            {details.subheading}
                          </Heading>
                          <p className="text-sm sm:text-base text-text-muted font-body leading-relaxed">
                            {details.description}
                          </p>
                        </div>

                        {/* Metadata Chips (Hum-07 style with colored dots) */}
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-accent-soft/70 text-text font-medium text-xs border border-border/40">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                            {details.durationPill}
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-bg text-text-muted font-medium text-xs border border-border/70">
                            <span className="h-1.5 w-1.5 rounded-full bg-text-muted/60" aria-hidden="true" />
                            {details.intensityPill}
                          </span>
                        </div>

                        {/* Action Link */}
                        <div className="pt-2">
                          <Link
                            href={`/plans/${plan.id}`}
                            className="inline-flex items-center gap-1.5 min-h-10 text-sm font-semibold text-primary hover:underline transition-colors select-none"
                          >
                            <span>Xem chi tiết liệu trình</span>
                            <ArrowRight size={15} strokeWidth={1.75} aria-hidden="true" />
                          </Link>
                        </div>
                      </div>

                      {/* Right Column: Stage Art Container with DetoxBottle */}
                      <div
                        className={`shrink-0 w-28 h-32 sm:w-36 sm:h-40 rounded-2xl border border-border/60 flex items-center justify-center p-3 self-center md:self-start ${artBg}`}
                      >
                        <DetoxBottle
                          size="sm"
                          color={idx === 0 ? "soft" : idx === 1 ? "green" : "warm"}
                          level={idx === 0 ? 55 : idx === 1 ? 75 : 90}
                          label={plan.title}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 3. Honest Math Section (DNA Hum-07 "Mostly, you wait") */}
      <Section spacing="md" className="border-b border-border bg-surface/30">
        <Container className="space-y-8">
          <div className="space-y-1 max-w-xl">
            <span className="text-xs font-medium text-primary tracking-wide block">
              CON SỐ MINH BẠCH
            </span>
            <Heading level={2} size="2xl" className="font-medium text-xl sm:text-2xl text-text">
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
              <span className="text-sm font-medium text-text block">Nông sản tươi ép</span>
              <p className="text-xs text-text-muted font-body leading-relaxed">
                Rau củ quả tươi từ các nông trại Việt Nam, ép chậm nguyên chất mỗi sáng.
              </p>
            </div>

            <div className="space-y-2 rounded-xl border border-border bg-surface p-5 sm:p-6">
              <span className="font-heading font-semibold text-3xl sm:text-4xl text-primary tracking-tight block">
                0
              </span>
              <span className="text-sm font-medium text-text block">Đường cát & Phụ gia</span>
              <p className="text-xs text-text-muted font-body leading-relaxed">
                Vị ngọt hoàn toàn tự nhiên từ táo, dứa, cà rốt và củ dền tươi nguyên.
              </p>
            </div>

            <div className="space-y-2 rounded-xl border border-border bg-surface p-5 sm:p-6">
              <span className="font-heading font-semibold text-3xl sm:text-4xl text-primary tracking-tight block">
                3
              </span>
              <span className="text-sm font-medium text-text block">Lộ trình thực tế</span>
              <p className="text-xs text-text-muted font-body leading-relaxed">
                Một, ba hoặc sáu ngày dựa trên năng lực phục vụ thực tế của quán.
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
                THỰC ĐƠN TƯƠI
              </span>
              <Heading level={2} size="2xl" className="font-medium text-xl sm:text-2xl text-text">
                Thức uống từ nông sản tươi
              </Heading>
              <p className="text-sm text-text-muted font-body">
                Nước ép nguyên chất không thêm đường cát hay phụ gia công nghiệp.
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
                className="flex flex-col justify-between space-y-4 hover:border-primary/50 transition-colors duration-fast"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-text-muted font-body">
                      {drink.categoryName}
                    </span>
                  </div>

                  <Heading level={3} size="xl" className="font-medium text-lg sm:text-xl text-text">
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
                    <ArrowRight size={14} strokeWidth={1.75} aria-hidden="true" />
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
                GÓC KIẾN THỨC
              </span>
              <Heading level={2} size="2xl" className="font-medium text-xl sm:text-2xl text-text">
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

          <Card className="hover:border-primary/50 transition-colors duration-fast">
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

                <Heading level={3} size="xl" className="font-medium text-lg sm:text-xl text-text">
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

      {/* 6. Khối Lưu ý & Cam kết Y tế */}
      <Section spacing="md">
        <Container>
          <Notice variant="info" title="Lưu ý từ Ép Xanh Chữa Lành">
            <p className="text-sm text-text font-body leading-relaxed">
              Nước ép tươi là nguồn bổ sung vitamin và dưỡng chất thực vật lành mạnh,
              không phải liệu pháp chữa bệnh và không thay thế bữa ăn cân bằng dài hạn.
              Nếu bạn đang mang thai, có bệnh lý nền hoặc cần tư vấn sâu hơn, bạn có thể{" "}
              <a
                href={SITE_CONFIG.threadsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline underline-offset-2 hover:opacity-80"
              >
                {FIXED_LABELS.ACTION_MESSAGE_THREADS}
              </a>
              .
            </p>
          </Notice>
        </Container>
      </Section>
    </div>
  );
}