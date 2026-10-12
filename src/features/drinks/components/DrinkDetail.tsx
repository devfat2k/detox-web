import React from "react";
import Link from "next/link";
import type { Drink } from "@/data/drinks";
import { Container, Section, Heading, Card, Kicker, LinkButton, DetoxBottle } from "@/components/ui";
import { routes } from "@/config/routes";
import { ArrowLeft, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

export interface DrinkDetailProps {
  readonly drink: Drink;
}

export function DrinkDetail({ drink }: DrinkDetailProps) {
  return (
    <Section spacing="lg">
      <Container className="max-w-3xl space-y-10">
        {/* Navigation quay lại */}
        <div>
          <Link
            href={routes.drinks()}
            className="inline-flex items-center text-sm font-normal text-text-muted hover:text-text transition-colors group"
          >
            <ArrowLeft className="mr-1.5 h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" strokeWidth={1.75} />
            Quay lại danh mục thức uống
          </Link>
        </div>

        {/* Header chi tiết món */}
        <header className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 p-6 sm:p-8 bg-surface border border-border rounded-xl group transition-all duration-300 ease-soft hover:shadow-2xs">
            <div className="p-4 bg-background/60 rounded-lg">
              <DetoxBottle
                color={drink.color}
                size="lg"
                level={drink.level}
                className="mx-auto transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="space-y-3 flex-1 text-center sm:text-left">
              <Kicker>{drink.categoryName}</Kicker>
              <Heading level={1} size="3xl" className="font-medium text-text">
                {drink.name}
              </Heading>
              <p className="font-body text-base text-text-muted leading-relaxed">
                {drink.description}
              </p>
              <div className="pt-1 text-xs text-text-muted font-normal">
                Quy cách: Chai thủy tinh 350ml · Nông sản tươi ép chậm mỗi sáng
              </div>
            </div>
          </div>
        </header>

        {/* Khối thông tin chi tiết */}
        <div className="space-y-6">
          {/* Card 1: Thành phần & Công dụng dinh dưỡng */}
          <Card className="p-6 sm:p-7 space-y-6">
            <div className="space-y-3">
              <Heading level={2} size="xl" className="font-medium text-text">
                Thành phần nông sản
              </Heading>
              <p className="font-body text-sm text-text-muted leading-relaxed">
                Được chuẩn bị từ 100% nguyên liệu tươi sạch, không pha loãng với nước, không thêm đường tinh luyện:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {drink.ingredients.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 bg-background text-text text-xs rounded-lg border border-border"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-5 border-t border-border/60">
              <div className="flex items-center gap-2 text-primary font-medium text-base">
                <CheckCircle2 className="h-4 w-4" strokeWidth={1.75} />
                <span>Giá trị dinh dưỡng & Cảm nhận cơ thể</span>
              </div>
              <p className="font-body text-sm text-text-muted leading-relaxed">
                {drink.benefit}. Nguồn nguyên liệu cung cấp chất xơ hòa tan, vitamin tự nhiên và chất chống oxy hóa thực vật, giúp hệ tiêu hóa được thư giãn nhẹ nhàng.
              </p>
            </div>
          </Card>

          {/* Card 2: Hướng dẫn sử dụng & Lưu ý */}
          <Card className="p-6 sm:p-7 space-y-6">
            <div className="space-y-2">
              <Heading level={2} size="xl" className="font-medium text-text">
                Thời điểm thưởng thức ngon nhất
              </Heading>
              <p className="font-body text-sm text-text-muted leading-relaxed">
                Uống vào buổi sáng khi mới thức dậy hoặc giữa các bữa ăn khi cảm thấy háo nước. Nên giữ lạnh và dùng ngay trong vòng 24 giờ sau khi mở nắp để giữ trọn vẹn hương vị tươi ngon.
              </p>
            </div>

            <div className="space-y-2 pt-5 border-t border-border/60">
              <div className="flex items-center gap-2 text-error font-medium text-base">
                <AlertCircle className="h-4 w-4" strokeWidth={1.75} />
                <span>Lưu ý sức khỏe</span>
              </div>
              <p className="font-body text-sm text-text-muted leading-relaxed">
                Nếu bạn có tiền sử dạ dày nhạy cảm với vị chua tự nhiên hoặc huyết áp thấp, nên uống sau khi lót dạ nhẹ hoặc chọn các dòng củ quả ấm nồng.
              </p>
            </div>
          </Card>
        </div>

        {/* Điều hướng chuyển tiếp & Miễn trừ */}
        <div className="pt-6 border-t border-border/70 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <p className="font-body text-sm font-medium text-text">
              Khám phá lộ trình nước ép phù hợp với thể trạng
            </p>
            <p className="font-body text-xs text-text-muted">
              Miễn phí hoàn toàn · Không quảng cáo · Dựa trên khảo sát ngắn
            </p>
          </div>

          <LinkButton href={routes.consultation()} variant="primary" className="group">
            <span>Tư vấn lộ trình</span>
            <ArrowRight
              className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5"
              strokeWidth={1.75}
            />
          </LinkButton>
        </div>
      </Container>
    </Section>
  );
}
