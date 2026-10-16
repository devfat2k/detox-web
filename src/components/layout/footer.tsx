import Image from "next/image";
import Link from "next/link";
import { ExternalLink, MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { FIXED_LABELS } from "@/config/copy";
import { ROUTES } from "@/config/routes";
import { Container } from "@/components/ui";

const CURRENT_YEAR = 2025;

/**
 * Footer chính của website - Server Component.
 * Bố cục cân đối, trang nhã, cung cấp thông tin thương hiệu, menu điều hướng nhanh và kênh kết nối chính thức.
 */
export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-surface py-10 sm:py-14 mt-auto">
      <Container className="space-y-8 sm:space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
          <div className="md:col-span-6 space-y-4">
            <Link
              href={ROUTES.HOME}
              className="inline-flex items-center gap-3.5 group"
            >
              <div className="relative h-14 w-14 overflow-hidden rounded-full border border-border/80 bg-surface shrink-0 shadow-2xs group-hover:border-primary/50 transition-colors">
                <Image
                  src="/images/logo.png"
                  alt={SITE_CONFIG.name}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div className="space-y-0.5">
                <span className="font-heading text-lg sm:text-xl font-semibold tracking-tight text-text group-hover:text-primary transition-colors block">
                  {SITE_CONFIG.name}
                </span>
                <span className="text-xs text-text-muted font-body block">
                  Nước ép tươi mỗi sáng · Lắng nghe cơ thể
                </span>
              </div>
            </Link>
            <p className="text-text-muted font-body text-xs sm:text-sm leading-relaxed max-w-md">
              {SITE_CONFIG.description}
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="font-heading text-xs font-semibold text-text">
              Khám phá
            </h4>
            <ul className="space-y-2.5 font-body text-xs sm:text-sm">
              <li>
                <Link
                  href={ROUTES.CONSULTATION}
                  className="text-text-muted hover:text-primary transition-colors inline-block py-0.5"
                >
                  {FIXED_LABELS.NAV_CONSULTATION}
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.PLANS}
                  className="text-text-muted hover:text-primary transition-colors inline-block py-0.5"
                >
                  {FIXED_LABELS.NAV_PLANS}
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.DRINKS}
                  className="text-text-muted hover:text-primary transition-colors inline-block py-0.5"
                >
                  {FIXED_LABELS.NAV_DRINKS}
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.ABOUT}
                  className="text-text-muted hover:text-primary transition-colors inline-block py-0.5"
                >
                  {FIXED_LABELS.NAV_ABOUT}
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="font-heading text-xs font-semibold text-text">
              Kết nối
            </h4>
            <div className="space-y-2.5 font-body text-xs sm:text-sm">
              <a
                href={SITE_CONFIG.threadsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-text hover:text-primary transition-colors py-0.5 group"
              >
                <MessageCircle className="w-4 h-4 text-primary shrink-0" strokeWidth={1.75} />
                <span>{FIXED_LABELS.ACTION_MESSAGE_THREADS}</span>
                <span className="sr-only"> ({FIXED_LABELS.OPEN_IN_NEW_TAB})</span>
                <ExternalLink
                  size={12}
                  strokeWidth={1.75}
                  aria-hidden="true"
                  className="shrink-0 text-text-muted group-hover:text-primary transition-colors"
                />
              </a>
              {SITE_CONFIG.tiktokUrl && (
                <a
                  href={SITE_CONFIG.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors py-0.5 group"
                >
                  <span>{FIXED_LABELS.ACTION_CONNECT_TIKTOK}</span>
                  <span className="sr-only"> ({FIXED_LABELS.OPEN_IN_NEW_TAB})</span>
                  <ExternalLink
                    size={12}
                    strokeWidth={1.75}
                    aria-hidden="true"
                    className="shrink-0 text-text-muted group-hover:text-primary transition-colors inline"
                  />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-muted font-body">
          <p>
            © {CURRENT_YEAR} {SITE_CONFIG.name}. Trải nghiệm cá nhân hóa nước ép tươi mỗi sáng.
          </p>
          <p className="text-[11px] text-text-muted/80">
            Dành tặng những ngày lành và sự nhẹ nhàng cho cơ thể.
          </p>
        </div>
      </Container>
    </footer>
  );
}
