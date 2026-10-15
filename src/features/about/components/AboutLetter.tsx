/* Hallmark · macrostructure: Open Letter · tone: editorial-calm · anchor hue: 150 (sage green) */

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container, Section } from "@/components/ui";
import { SITE_CONFIG } from "@/config/site";
import { FIXED_LABELS } from "@/config/copy";

export function AboutLetter() {
  return (
    <Section spacing="md">
      <Container className="max-w-2xl mx-auto px-4 sm:px-6">
        <article className="space-y-8 sm:space-y-10 py-2 sm:py-4">
          <header className="space-y-6 text-center">
            <div className="mx-auto relative h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-full border border-border/80 bg-surface shrink-0">
              <Image
                src="/images/logo.png"
                alt={SITE_CONFIG.name}
                fill
                sizes="(max-width: 640px) 80px, 96px"
                className="object-cover"
                priority
              />
            </div>

            <div className="space-y-2">
              <h1 className="font-heading font-semibold text-3xl sm:text-4xl text-primary tracking-tight">
                {SITE_CONFIG.name}
              </h1>
              <p className="font-heading font-medium text-base sm:text-lg text-text/80">
                Shop có mặt tại, Tp. Hồ Chí Minh
              </p>
            </div>

            <div className="pt-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 max-w-xl mx-auto">
                <a
                  href={SITE_CONFIG.threadsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col justify-between p-6 sm:p-7 rounded-3xl border border-border/80 bg-surface hover:border-primary/50 hover:bg-accent-soft/25 transition-all duration-300 group text-left min-h-32"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-body text-xs text-text-muted">
                      Kênh trò chuyện
                    </span>
                    <ArrowUpRight
                      size={18}
                      strokeWidth={1.75}
                      className="text-text-muted group-hover:text-primary transition-colors shrink-0"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="space-y-1 pt-3">
                    <span className="font-heading font-semibold text-xl sm:text-2xl text-text group-hover:text-primary transition-colors block">
                      Threads
                    </span>
                    <span className="font-body text-sm font-medium text-primary block">
                      @ep_xanh_chua_lanh
                    </span>
                    <span className="font-body text-xs text-text-muted block pt-1">
                      Nhắn tin chia sẻ và đặt nước
                    </span>
                  </div>
                  <span className="sr-only">({FIXED_LABELS.OPEN_IN_NEW_TAB})</span>
                </a>

                <a
                  href={SITE_CONFIG.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col justify-between p-6 sm:p-7 rounded-3xl border border-border/80 bg-surface hover:border-primary/50 hover:bg-accent-soft/25 transition-all duration-300 group text-left min-h-32"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-body text-xs text-text-muted">
                      Kênh video ngắn
                    </span>
                    <ArrowUpRight
                      size={18}
                      strokeWidth={1.75}
                      className="text-text-muted group-hover:text-primary transition-colors shrink-0"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="space-y-1 pt-3">
                    <span className="font-heading font-semibold text-xl sm:text-2xl text-text group-hover:text-primary transition-colors block">
                      TikTok
                    </span>
                    <span className="font-body text-sm font-medium text-primary block">
                      @epxanhchualanh
                    </span>
                    <span className="font-body text-xs text-text-muted block pt-1">
                      Xem những thước phim từ tiệm
                    </span>
                  </div>
                  <span className="sr-only">({FIXED_LABELS.OPEN_IN_NEW_TAB})</span>
                </a>
              </div>
            </div>
          </header>

          <hr className="border-t border-border/70" />

          <div className="space-y-6 font-body text-text leading-relaxed text-base sm:text-lg">
            <p className="font-heading font-medium text-lg sm:text-xl text-primary">
              Gửi những người phụ nữ thương mến,
            </p>

            <p className="text-text/90">
              Một tiệm nhỏ chuẩn bị nước ép từ rau củ quả tươi tự nhiên, gửi gắm chút thanh lành và dịu êm đến cơ thể bạn sau những bộn bề. Tụi mình chuẩn bị chu đáo và giao trong ngày đến bạn tại khu vực TP. Hồ Chí Minh.
            </p>

            <p className="text-text/90">
              Giữa công việc và nhịp sống bận rộn, tụi mình mong bạn có những khoảng dừng nhẹ nhàng để lắng nghe cơ thể.
            </p>

            <p className="text-text/90">
              Một chai nước ép tươi không phải điều gì thần kỳ, chỉ đơn giản là rau củ quả nguyên chất ép chậm: không đường, không nước lọc pha loãng, không chất bảo quản. Đủ để cơ thể nhẹ nhõm và tiếp thêm chút năng lượng tươi lành cho ngày mới.
            </p>

            <p className="text-text/90">
              Ăn uống lành mạnh là để cảm thấy thoải mái hơn, không phải thêm một áp lực kiêng khem.
            </p>

            <p className="text-text/90">
              Mong bạn luôn tìm thấy sự nhẹ nhõm mỗi ngày.
            </p>

            <div className="pt-4 text-right space-y-1">
              <span className="block font-body text-sm text-text-muted">
                Thương mến,
              </span>
              <span className="block font-heading font-medium italic text-lg sm:text-xl text-primary">
                {SITE_CONFIG.name}
              </span>
            </div>
          </div>
        </article>
      </Container>
    </Section>
  );
}
