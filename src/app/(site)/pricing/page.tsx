import type { Metadata } from "next";
import { Container, Section, Heading, LinkButton } from "@/components/ui";
import { PRICING_COMBOS, PRICING_FOOTNOTE, formatVndPrice } from "@/data/pricing";
import { SITE_CONFIG } from "@/config/site";
import { ROUTES } from "@/config/routes";
import { FIXED_LABELS } from "@/config/copy";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Bảng giá combo nước ép tươi",
  description:
    "Bảng giá các combo detox nước ép tươi 1, 3, 6 ngày ép chậm nguyên chất mỗi sáng từ nông sản sạch Việt Nam.",
};

export default function PricingPage() {
  return (
    <Section spacing="md">
      <Container className="space-y-8 sm:space-y-12">
        <div className="space-y-3 text-center max-w-2xl mx-auto">
          <Heading level={1} size="3xl" className="font-semibold text-text tracking-tight">
            Bảng giá combo nước ép tươi mỗi sáng
          </Heading>
          <p className="font-body text-base text-text-muted leading-relaxed">
            Quy chuẩn 5 chai mỗi ngày từ nông sản sạch ép chậm mỗi sáng. Không
            đường, không nước lọc pha loãng, không chất bảo quản.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRICING_COMBOS.map((combo) => (
            <div
              key={combo.id}
              className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl border border-border bg-surface shadow-2xs space-y-6"
            >
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-sm font-medium text-primary">
                    Liệu trình {combo.durationDays} ngày
                  </span>
                  <h2 className="font-heading font-semibold text-xl text-text">
                    {combo.title}
                  </h2>
                </div>

                <div className="space-y-1 pt-2 border-t border-border/70">
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading font-semibold text-2xl sm:text-3xl text-text">
                      {formatVndPrice(combo.price)}
                    </span>
                    <span className="text-xs text-text-muted font-body">
                      / {combo.unit}
                    </span>
                  </div>
                  {combo.originalPrice ? (
                    <p className="text-xs text-text-muted line-through font-body">
                      Giá gốc: {formatVndPrice(combo.originalPrice)}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-2 pt-2 border-t border-border/70">
                  <p className="text-xs font-medium text-text">
                    Khẩu phần mỗi ngày (5 chai):
                  </p>
                  <ul className="space-y-1.5 text-xs text-text-muted font-body">
                    {combo.itemsSummary.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Check size={14} strokeWidth={2} className="text-primary shrink-0" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2 pt-2 border-t border-border/70">
                  <p className="text-xs font-medium text-text">
                    Cảm nhận thể trạng:
                  </p>
                  <ul className="space-y-1.5 text-xs text-text-muted font-body">
                    {combo.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" aria-hidden="true" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-2">
                <LinkButton
                  href={ROUTES.PLAN_DETAIL(combo.id)}
                  variant="secondary"
                  className="w-full text-xs sm:text-sm font-medium justify-center min-h-11"
                >
                  <span>Xem chi tiết thực đơn</span>
                  <ArrowRight size={14} strokeWidth={1.75} aria-hidden="true" />
                </LinkButton>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-border flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1 max-w-xl">
            <h3 className="font-heading font-semibold text-lg text-text">
              Bạn chưa rõ thể trạng mình phù hợp với gói nào?
            </h3>
            <p className="font-body text-xs sm:text-sm text-text-muted leading-relaxed">
              {PRICING_FOOTNOTE} Làm bài khảo sát 1 phút để nhận gợi ý lộ trình phù hợp với mục tiêu của bạn.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
            <LinkButton
              href={ROUTES.CONSULTATION}
              variant="primary"
              className="w-full sm:w-auto min-h-11 px-6 text-xs sm:text-sm font-medium justify-center"
            >
              <span>{FIXED_LABELS.CTA_CONSULTATION}</span>
              <ArrowRight size={14} strokeWidth={1.75} aria-hidden="true" />
            </LinkButton>
            <LinkButton
              href={SITE_CONFIG.threadsUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              className="w-full sm:w-auto min-h-11 px-5 text-xs sm:text-sm font-medium justify-center"
            >
              <span>{FIXED_LABELS.ACTION_MESSAGE_THREADS}</span>
              <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden="true" />
            </LinkButton>
          </div>
        </div>
      </Container>
    </Section>
  );
}
