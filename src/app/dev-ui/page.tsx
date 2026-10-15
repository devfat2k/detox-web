import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Button,
  LinkButton,
  Container,
  Section,
  Heading,
  Card,
  Chip,
  Notice,
  Skeleton,
  Kicker,
  Reveal,
} from "@/components/ui";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Bảng hiển thị mẫu màu trong hệ thống tokens (không dùng mã hex thô).
 */
function ColorSwatch({
  name,
  tokenName,
  bgClass,
  textClass = "text-text",
  borderClass = "border-border",
}: {
  name: string;
  tokenName: string;
  bgClass: string;
  textClass?: string;
  borderClass?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className={`h-16 w-full rounded-lg border ${borderClass} ${bgClass} flex items-center justify-center`}
      >
        <span className={`text-xs font-medium font-body ${textClass}`}>
          {tokenName}
        </span>
      </div>
      <div className="space-y-0.5">
        <p className="font-body font-medium text-xs text-text">{name}</p>
        <p className="font-body text-xs text-text-muted">{tokenName}</p>
      </div>
    </div>
  );
}

/**
 * Trang xem thử toàn bộ thành phần UI cơ sở (chỉ hoạt động ở môi trường development).
 * Trả về 404 (notFound) khi build production.
 */
export default function DevUIPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <main className="min-h-screen bg-bg text-text py-12">
      <Container className="space-y-12">
        <header className="border-b border-border pb-6 space-y-3">
          <Kicker>Design Foundation · detox-web</Kicker>
          <Heading level={1} size="3xl">
            Thư viện Thành phần & Tokens Cơ sở
          </Heading>
          <p className="text-text-muted font-body text-base max-w-prose">
            Trang kiểm thử trực quan cho quy chuẩn DESIGN.md và DNA Hallmark
            Narrative Workflow (390px mobile và 1280px desktop).
          </p>
        </header>

        <Section spacing="sm" className="space-y-4">
          <div className="space-y-1">
            <Kicker>01 · Màu sắc</Kicker>
            <Heading level={2} size="xl">
              Bảng màu neo (4 Token chính + biến thể)
            </Heading>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
            <ColorSwatch
              name="Nền kem"
              tokenName="--color-bg"
              bgClass="bg-bg"
              textClass="text-text"
            />
            <ColorSwatch
              name="Bề mặt"
              tokenName="--color-surface"
              bgClass="bg-surface"
              textClass="text-text"
            />
            <ColorSwatch
              name="Mực đậm"
              tokenName="--color-text"
              bgClass="bg-text"
              textClass="text-bg"
            />
            <ColorSwatch
              name="Mực phụ"
              tokenName="--color-text-muted"
              bgClass="bg-text-muted"
              textClass="text-bg"
            />
            <ColorSwatch
              name="Xanh lá trầm"
              tokenName="--color-primary"
              bgClass="bg-primary"
              textClass="text-bg"
            />
            <ColorSwatch
              name="Xanh nhạt"
              tokenName="--color-accent-soft"
              bgClass="bg-accent-soft"
              textClass="text-text"
            />
            <ColorSwatch
              name="Viền mảnh"
              tokenName="--color-border"
              bgClass="bg-border"
              textClass="text-text"
            />
            <ColorSwatch
              name="Đỏ đất nung"
              tokenName="--color-error"
              bgClass="bg-error"
              textClass="text-bg"
            />
          </div>
        </Section>

        {/* 2. Typography & Type scale */}
        <Section spacing="sm" className="space-y-4">
          <div className="space-y-1">
            <Kicker>02 · Chữ & Thang cỡ</Kicker>
            <Heading level={2} size="xl">
              Thang chữ (Be Vietnam Pro thanh mảnh)
            </Heading>
          </div>
          <div className="space-y-4 border border-border bg-surface p-6 rounded-xl">
            <div className="space-y-2 border-b border-border pb-4">
              <Heading level={1}>Heading 1 — 3xl (Be Vietnam Pro 600)</Heading>
              <p className="text-xs text-text-muted font-body">
                1.875rem (30px) · line-height 1.2 · Semibold
              </p>
            </div>
            <div className="space-y-2 border-b border-border pb-4">
              <Heading level={2}>Heading 2 — 2xl (Be Vietnam Pro 600)</Heading>
              <p className="text-xs text-text-muted font-body">
                1.5rem (24px) · line-height 1.3 · Semibold
              </p>
            </div>
            <div className="space-y-2 border-b border-border pb-4">
              <Heading level={3}>Heading 3 — xl (Be Vietnam Pro 500)</Heading>
              <p className="text-xs text-text-muted font-body">
                1.25rem (20px) · line-height 1.4 · Medium
              </p>
            </div>
            <div className="space-y-2 border-b border-border pb-4">
              <p className="font-body text-base font-medium">
                Text Base — 1rem (Be Vietnam Pro 500/400)
              </p>
              <p className="text-text-muted font-body text-base leading-relaxed">
                Nước ép tươi mỗi sáng giúp thanh lọc dịu nhẹ, giữ lại trọn vẹn
                chất chống oxy hóa tự nhiên và vitamin tươi từ rau củ hữu cơ.
              </p>
            </div>
            <div className="space-y-1 border-b border-border pb-4">
              <p className="font-body text-sm font-medium">
                Text Sm — 0.875rem (14px)
              </p>
              <p className="text-text-muted font-body text-sm">
                Ước tính khoảng cân nặng tham khảo, phần lớn là nước và giảm cảm
                giác đầy bụng.
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-body text-xs font-medium">
                Text Xs — 0.75rem (12px)
              </p>
              <p className="text-text-muted font-body text-xs uppercase tracking-wider">
                01 · Thông tin cơ thể · Khảo sát không lưu trữ
              </p>
            </div>
          </div>
        </Section>

        <Section spacing="sm" className="space-y-4">
          <div className="space-y-1">
            <Kicker>03 · Tương tác</Kicker>
            <Heading level={2} size="xl">
              Nút bấm (Tap target ≥ 48px)
            </Heading>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary">Nút chính (Primary)</Button>
            <Button variant="secondary">Nút phụ (Secondary)</Button>
            <Button variant="ghost">Nút chữ (Ghost)</Button>
            <Button variant="primary" disabled>
              Vô hiệu hóa (Disabled)
            </Button>
            <LinkButton href="/" variant="primary">
              LinkButton (Trang chủ)
            </LinkButton>
            <LinkButton
              href="https://threads.net"
              isExternal
              variant="secondary"
            >
              Nhắn qua Threads
            </LinkButton>
          </div>
        </Section>

        {/* 4. Kicker */}
        <Section spacing="sm" className="space-y-4">
          <div className="space-y-1">
            <Kicker>04 · Dẫn dắt</Kicker>
            <Heading level={2} size="xl">
              Kicker (Nhãn nhỏ chỉ mục)
            </Heading>
          </div>
          <div className="flex flex-wrap items-center gap-4 p-4 border border-border bg-surface rounded-xl">
            <Kicker>01 · Thông tin cơ thể</Kicker>
            <span className="text-border">|</span>
            <Kicker>02 · Mục tiêu sức khỏe</Kicker>
            <span className="text-border">|</span>
            <Kicker>03 · Thói quen uống nước</Kicker>
          </div>
        </Section>

        {/* 5. Cards & Anti-nesting */}
        <Section spacing="sm" className="space-y-4">
          <div className="space-y-1">
            <Kicker>05 · Khối bề mặt</Kicker>
            <Heading level={2} size="xl">
              Thẻ Card & Chống lồng thẻ
            </Heading>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <Heading level={3} size="base" className="mb-2">
                Thẻ đơn tiêu chuẩn
              </Heading>
              <p className="text-text font-body text-sm">
                Nền surface, viền mảnh 1px border-border, không bóng đổ nặng, bo
                góc 12px.
              </p>
            </Card>
            <Card>
              <Heading level={3} size="base" className="mb-2">
                Thẻ thử nghiệm chống lồng
              </Heading>
              <Card>
                <p className="text-text-muted font-body text-sm">
                  Card con bị lồng: tự động hủy bỏ viền/nền thừa qua CSS
                  selector [data-card] [data-card].
                </p>
              </Card>
            </Card>
          </div>
        </Section>

        {/* 6. Chips */}
        <Section spacing="sm" className="space-y-4">
          <div className="space-y-1">
            <Kicker>06 · Lựa chọn</Kicker>
            <Heading level={2} size="xl">
              Chip lựa chọn (1 kiểu duy nhất trên toàn site)
            </Heading>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Chip name="goals" label="Giảm đầy bụng" defaultChecked />
            <Chip name="goals" label="Thanh lọc cơ thể" />
            <Chip name="goals" label="Cải thiện giấc ngủ" />
            <Chip name="goals" label="Bị vô hiệu" disabled />
          </div>
        </Section>

        {/* 7. Notices */}
        <Section spacing="sm" className="space-y-4">
          <div className="space-y-1">
            <Kicker>07 · Thông báo</Kicker>
            <Heading level={2} size="xl">
              Hộp thông báo (Hairline border, không side-stripe dày)
            </Heading>
          </div>
          <div className="space-y-3">
            <Notice variant="info" title="Thời gian giao hàng">
              Các chai nước ép tươi được chuẩn bị và giao vào sáng sớm mỗi ngày.
            </Notice>
            <Notice variant="warning" title="Miễn trừ trách nhiệm y tế">
              Nước ép hỗ trợ cân bằng dinh dưỡng, không thay thế điều trị y
              khoa.
            </Notice>
            <Notice variant="error" title="Không phù hợp">
              Người có bệnh lý dạ dày nặng không nên áp dụng liệu trình ép xanh
              đậm vị chua.
            </Notice>
          </div>
        </Section>

        {/* 8. Skeletons */}
        <Section spacing="sm" className="space-y-4">
          <div className="space-y-1">
            <Kicker>08 · Khối tĩnh</Kicker>
            <Heading level={2} size="xl">
              Skeleton (Khối giữ chỗ tĩnh, không shimmer/pulse)
            </Heading>
          </div>
          <div className="space-y-3 max-w-md">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-12 w-32" />
          </div>
        </Section>

        {/* 9. Reveal Component */}
        <Section spacing="sm" className="space-y-4">
          <div className="space-y-1">
            <Kicker>09 · Chuyển động</Kicker>
            <Heading level={2} size="xl">
              Reveal (IntersectionObserver 1 lần, transform + opacity)
            </Heading>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Reveal delay={0}>
              <Card>
                <p className="font-heading font-semibold text-base">Khối 01</p>
                <p className="text-text-muted text-sm mt-1">
                  Xuất hiện ngay lập tức
                </p>
              </Card>
            </Reveal>
            <Reveal delay={100}>
              <Card>
                <p className="font-heading font-semibold text-base">Khối 02</p>
                <p className="text-text-muted text-sm mt-1">
                  Trì hoãn 100ms nhẹ
                </p>
              </Card>
            </Reveal>
            <Reveal delay={200}>
              <Card>
                <p className="font-heading font-semibold text-base">Khối 03</p>
                <p className="text-text-muted text-sm mt-1">
                  Trì hoãn 200ms nhẹ
                </p>
              </Card>
            </Reveal>
          </div>
        </Section>
      </Container>
    </main>
  );
}
