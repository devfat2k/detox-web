import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section, Heading, LinkButton, DetoxBottle } from "@/components/ui";
import { ConsultationCtaButton } from "@/components/common";
import { ROUTES } from "@/config/routes";
import { FIXED_LABELS } from "@/config/copy";

interface HeroBottleItem {
  readonly time: string;
  readonly name: string;
  readonly shortName: string;
  readonly role: string;
  readonly color: "green" | "warm" | "soft";
  readonly level: number;
}

const HERO_V2_BOTTLES: readonly HeroBottleItem[] = [
  {
    time: "07:00",
    name: "Cần tây táo xanh",
    shortName: "Cần tây táo",
    role: "Đánh thức",
    color: "green",
    level: 85,
  },
  {
    time: "10:00",
    name: "Cà rốt cam gừng",
    shortName: "Cà rốt cam",
    role: "Năng lượng",
    color: "warm",
    level: 75,
  },
  {
    time: "13:00",
    name: "Củ dền táo đỏ",
    shortName: "Củ dền táo",
    role: "Cân bằng",
    color: "warm",
    level: 80,
  },
  {
    time: "16:00",
    name: "Dưa leo bạc hà",
    shortName: "Dưa leo",
    role: "Thanh mát",
    color: "green",
    level: 70,
  },
  {
    time: "19:00",
    name: "Bí đao hạt sen",
    shortName: "Hạt sen",
    role: "Êm dịu",
    color: "soft",
    level: 75,
  },
] as const;

export function HomeHeroSectionV2() {
  return (
    <Section spacing="md" className="bg-surface/30">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Cột trái: Thông điệp & Lời dẫn thương hiệu */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-6">
            <div className="space-y-4 max-w-xl">
              <span className="text-xs font-medium text-primary tracking-normal block">
                Tiệm nước ép thủ công · Giao tươi mỗi sáng tại TP. Hồ Chí Minh
              </span>

              <Heading
                level={1}
                size="3xl"
                className="font-heading font-semibold text-2xl sm:text-4xl lg:text-[2.6rem] leading-[1.18] tracking-tight text-text"
              >
                Nước ép tươi mỗi sáng, vừa vặn với{" "}
                <span className="text-primary font-semibold">
                  thể trạng của bạn
                </span>
              </Heading>

              <p className="text-sm sm:text-base text-text-muted font-body leading-relaxed max-w-xl">
                Khảo sát ngắn để nhận gợi ý phân bổ 5 chai rau củ tươi trong ngày. Nông sản sạch được ép chậm mỗi sáng sớm, gửi gắm chút thanh lành và dịu êm đến cơ thể sau những bộn bề.
              </p>
            </div>

            {/* Cặp nút hành động bo tròn hoàn toàn */}
            <div className="space-y-3 w-full sm:w-auto">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <ConsultationCtaButton
                  size="lg"
                  icon="arrow"
                  className="w-full sm:w-auto justify-center"
                >
                  {FIXED_LABELS.CTA_CONSULTATION}
                </ConsultationCtaButton>

                <LinkButton
                  href={ROUTES.PRICING}
                  variant="secondary"
                  rounded="full"
                  className="w-full sm:w-auto min-h-14 sm:min-h-16 text-sm sm:text-base px-7 py-3.5 sm:py-4 font-medium text-text hover:text-primary hover:border-primary/50 justify-center rounded-full transition-all duration-200"
                >
                  <span>{FIXED_LABELS.ACTION_VIEW_PRICING}</span>
                  <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
                </LinkButton>
              </div>

              <p className="text-xs text-text-muted/80 font-body">
                100% rau củ tự nhiên ép chậm, không đường, không nước lọc pha loãng.
              </p>
            </div>
          </div>

          {/* Cột phải: Tactile Bottle Tray (Khay 5 chai nước ép nằm ngang cân đối) */}
          <div className="lg:col-span-6 w-full">
            <div className="rounded-3xl border border-border/80 bg-surface p-6 sm:p-7 space-y-6 shadow-xs text-left">
              <div className="space-y-1">
                <span className="text-xs font-medium text-primary tracking-normal block">
                  Khẩu phần chuẩn hóa
                </span>
                <h3 className="text-lg sm:text-xl font-semibold text-text font-heading tracking-tight">
                  Set 5 chai tươi trong ngày
                </h3>
                <p className="text-xs text-text-muted font-body leading-relaxed">
                  Phân bổ nhịp nhàng từ sáng đến tối, giúp dạ dày được nghỉ ngơi và năng lượng êm ái.
                </p>
              </div>

              {/* Khay 5 chai nằm ngang trên một bề mặt duy nhất - Không card-in-card */}
              <div className="grid grid-cols-5 gap-2 pt-1 items-end text-center select-none">
                {HERO_V2_BOTTLES.map((item) => (
                  <div
                    key={item.time}
                    className="flex flex-col items-center space-y-2 group"
                  >
                    <span className="text-[11px] font-medium text-text-muted font-body">
                      {item.time}
                    </span>

                    <div className="py-1 transition-transform duration-300 ease-soft group-hover:scale-105 group-hover:-translate-y-1">
                      <DetoxBottle
                        color={item.color}
                        size="sm"
                        level={item.level}
                        label={item.name}
                      />
                    </div>

                    <div className="space-y-0.5 w-full">
                      <p className="text-xs font-medium text-text leading-tight truncate">
                        {item.shortName}
                      </p>
                      <p className="text-[10px] text-text-muted leading-tight truncate">
                        {item.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dòng liên kết khảo sát tinh tế */}
              <div className="p-3.5 rounded-2xl bg-accent-soft/30 border border-primary/15 flex items-center justify-between gap-3 text-xs">
                <span className="text-text font-body">
                  Cá nhân hóa theo thể trạng của bạn
                </span>
                <Link
                  href={ROUTES.CONSULTATION}
                  className="text-primary font-medium hover:underline inline-flex items-center gap-1 shrink-0 group"
                >
                  <span>Khảo sát ngay</span>
                  <ArrowRight
                    size={13}
                    strokeWidth={1.75}
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
