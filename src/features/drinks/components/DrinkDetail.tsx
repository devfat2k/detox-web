import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import type { Drink } from "@/data/drinks";
import { Container, Section, Heading, Card, LinkButton, DetoxBottle } from "@/components/ui";
import { ROUTES } from "@/config/routes";

export interface DrinkDetailProps {
  readonly drink: Drink;
}

export function DrinkDetail({ drink }: DrinkDetailProps) {
  return (
    <Section spacing="lg">
      <Container className="max-w-3xl space-y-8">
        <div>
          <Link
            href={ROUTES.DRINKS}
            className="inline-flex items-center text-sm text-text-muted hover:text-text transition-colors group"
          >
            <ArrowLeft className="mr-1.5 h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" strokeWidth={1.75} />
            <span>Quay lại danh mục thức uống</span>
          </Link>
        </div>

        <header className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 p-6 sm:p-8 bg-surface border border-border/70 rounded-3xl group transition-all duration-300 ease-soft hover:shadow-2xs">
            <div className="p-4 bg-bg/50 rounded-2xl">
              <DetoxBottle
                color={drink.color}
                size="lg"
                level={drink.level}
                className="mx-auto transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="space-y-2.5 flex-1 text-center sm:text-left">
              <span className="text-xs font-medium text-primary block">
                {drink.categoryName}
              </span>
              <Heading level={1} size="3xl" className="font-heading font-semibold text-2xl sm:text-3xl text-text">
                {drink.name}
              </Heading>
              <p className="font-body text-sm sm:text-base text-text-muted leading-relaxed">
                {drink.description}
              </p>
              <div className="pt-1 text-xs text-text-muted">
                Quy cách: Chai thủy tinh 350ml · Nông sản tươi ép chậm mỗi sáng
              </div>
            </div>
          </div>
        </header>

        <div className="space-y-5">
          <Card className="p-6 sm:p-7 space-y-5 rounded-3xl border border-border/70">
            <div className="space-y-2.5">
              <Heading level={2} size="xl" className="font-heading font-semibold text-lg text-text">
                Thành phần nông sản
              </Heading>
              <p className="font-body text-xs sm:text-sm text-text-muted leading-relaxed">
                Được chuẩn bị từ 100% nguyên liệu tươi sạch, không pha loãng với nước, không thêm đường tinh luyện:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {(drink.ingredients ?? []).map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 bg-bg text-text text-xs rounded-full border border-border/70"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-border/60">
              <div className="flex items-center gap-2 text-primary font-heading font-medium text-sm sm:text-base">
                <CheckCircle2 size={16} strokeWidth={1.75} className="shrink-0 text-primary" />
                <span>Giá trị dinh dưỡng & Cảm nhận cơ thể</span>
              </div>
              <p className="font-body text-xs sm:text-sm text-text-muted leading-relaxed">
                {drink.benefit}. Nguồn nguyên liệu cung cấp chất xơ hòa tan, vitamin tự nhiên và chất chống oxy hóa thực vật, giúp hệ tiêu hóa được thư giãn nhẹ nhàng.
              </p>
            </div>
          </Card>

          <Card className="p-6 sm:p-7 space-y-5 rounded-3xl border border-border/70">
            <div className="space-y-2">
              <Heading level={2} size="xl" className="font-heading font-semibold text-lg text-text">
                Thời điểm thưởng thức ngon nhất
              </Heading>
              <p className="font-body text-xs sm:text-sm text-text-muted leading-relaxed">
                Uống vào buổi sáng khi mới thức dậy hoặc giữa các bữa ăn khi cảm thấy háo nước. Nên giữ lạnh và dùng ngay trong vòng 24 giờ sau khi mở nắp để giữ trọn vẹn hương vị tươi ngon.
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-border/60">
              <div className="flex items-center gap-2 text-primary font-heading font-medium text-sm sm:text-base">
                <AlertCircle size={16} strokeWidth={1.75} className="shrink-0 text-primary" />
                <span>Lưu ý sức khỏe</span>
              </div>
              <p className="font-body text-xs sm:text-sm text-text-muted leading-relaxed">
                Nếu bạn có tiền sử dạ dày nhạy cảm với vị chua tự nhiên hoặc huyết áp thấp, nên uống sau khi lót dạ nhẹ hoặc chọn các dòng củ quả ấm nồng.
              </p>
            </div>
          </Card>
        </div>

        <div className="pt-4 border-t border-border/70 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-0.5">
            <p className="font-body text-sm font-medium text-text">
              Khám phá lộ trình nước ép phù hợp với thể trạng
            </p>
            <p className="font-body text-xs text-text-muted">
              Miễn phí hoàn toàn · Không quảng cáo · Dựa trên khảo sát ngắn
            </p>
          </div>

          <LinkButton href={ROUTES.CONSULTATION} variant="primary" className="group">
            <span>Tư vấn lộ trình</span>
            <ArrowRight
              size={15}
              strokeWidth={1.75}
              className="ml-2 transition-transform group-hover:translate-x-0.5"
            />
          </LinkButton>
        </div>
      </Container>
    </Section>
  );
}
