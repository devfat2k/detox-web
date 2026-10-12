import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { FIXED_LABELS } from "@/config/copy";
import { Container } from "@/components/ui";

/**
 * Footer chính của website - Server Component.
 * Chứa thông tin thương hiệu, liên kết Threads ngoài, liên kết chính sách và thông báo miễn trừ y tế.
 */
export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-surface py-8 sm:py-12 mt-auto">
      <Container className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 border-b border-border pb-6">
          <div className="flex items-start gap-3.5">
            <div className="relative h-16 w-16 sm:h-16 sm:w-16 overflow-hidden rounded-full border border-border/80 bg-surface shrink-0 mt-0.5">
              <Image
                src="/images/logo.png"
                alt={SITE_CONFIG.name}
                fill
                sizes="(max-width: 640px) 40px, 48px"
                className="object-cover"
              />
            </div>
            <div className="space-y-1">
              <span className="font-heading text-lg font-semibold tracking-tight text-text block">
                {SITE_CONFIG.name}
              </span>
              <p className="text-text-muted font-body text-sm max-w-prose">
                {SITE_CONFIG.description}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-body text-sm pt-1">
              <a
                href={SITE_CONFIG.threadsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-text hover:text-primary transition-colors duration-fast"
              >
                <span>{FIXED_LABELS.ACTION_MESSAGE_THREADS}</span>
                <span className="sr-only">
                  {" "}
                  ({FIXED_LABELS.OPEN_IN_NEW_TAB})
                </span>
                <ExternalLink
                  size={14}
                  strokeWidth={1.75}
                  aria-hidden="true"
                  className="shrink-0"
                />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
