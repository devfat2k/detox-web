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
} from "@/components/ui";

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
        <header className="border-b border-border pb-6 space-y-2">
          <Heading level={1} size="3xl">
            Thư viện Thành phần UI Cơ sở
          </Heading>
          <p className="text-text-muted font-body text-base">
            Trang kiểm thử trực quan cho quy chuẩn DESIGN.md (390px mobile và 1280px desktop).
          </p>
        </header>

        {/* 1. Buttons */}
        <Section spacing="sm" className="space-y-4">
          <Heading level={2} size="xl">
            1. Nút bấm (Button và LinkButton)
          </Heading>
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
          </div>
        </Section>

        {/* 2. Headings & Typography */}
        <Section spacing="sm" className="space-y-4">
          <Heading level={2} size="xl">
            2. Thang tiêu đề (Heading)
          </Heading>
          <div className="space-y-2">
            <Heading level={1}>Heading 1 (3xl - Bricolage Grotesque)</Heading>
            <Heading level={2}>Heading 2 (2xl)</Heading>
            <Heading level={3}>Heading 3 (xl)</Heading>
            <Heading level={4}>Heading 4 (base)</Heading>
            <Heading level={5}>Heading 5 (sm)</Heading>
            <Heading level={6}>Heading 6 (xs)</Heading>
          </div>
        </Section>

        {/* 3. Cards */}
        <Section spacing="sm" className="space-y-4">
          <Heading level={2} size="xl">
            3. Thẻ bề mặt (Card)
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <Heading level={3} size="base" className="mb-2">
                Thẻ đơn tiêu chuẩn
              </Heading>
              <p className="text-text font-body text-sm">
                Nền surface, viền mảnh 1px border-border, không bóng đổ.
              </p>
            </Card>
            <Card>
              <Heading level={3} size="base" className="mb-2">
                Thẻ thử nghiệm chống lồng
              </Heading>
              <Card>
                <p className="text-text-muted font-body text-sm">
                  Card con bị lồng: tự động hủy bỏ viền/nền thừa và cảnh báo trong console dev.
                </p>
              </Card>
            </Card>
          </div>
        </Section>

        {/* 4. Chips */}
        <Section spacing="sm" className="space-y-4">
          <Heading level={2} size="xl">
            4. Chip lựa chọn (Toggle Checkbox / Radio)
          </Heading>
          <div className="flex flex-wrap items-center gap-3">
            <Chip name="goals" label="Giảm đầy bụng" defaultChecked />
            <Chip name="goals" label="Thanh lọc cơ thể" />
            <Chip name="goals" label="Cải thiện giấc ngủ" />
            <Chip name="goals" label="Bị vô hiệu" disabled />
          </div>
        </Section>

        {/* 5. Notices */}
        <Section spacing="sm" className="space-y-4">
          <Heading level={2} size="xl">
            5. Hộp thông báo (Notice)
          </Heading>
          <div className="space-y-3">
            <Notice variant="info" title="Thời gian giao hàng">
              Các chai nước ép tươi được chuẩn bị và giao vào sáng sớm mỗi ngày.
            </Notice>
            <Notice variant="warning" title="Miễn trừ trách nhiệm y tế">
              Nước ép hỗ trợ cân bằng dinh dưỡng, không thay thế điều trị y khoa.
            </Notice>
            <Notice variant="error" title="Không phù hợp">
              Người có bệnh lý dạ dày nặng không nên áp dụng liệu trình ép xanh đậm vị chua.
            </Notice>
          </div>
        </Section>

        {/* 6. Skeletons */}
        <Section spacing="sm" className="space-y-4">
          <Heading level={2} size="xl">
            6. Khối giữ chỗ tĩnh (Skeleton)
          </Heading>
          <div className="space-y-3 max-w-md">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-12 w-32" />
          </div>
        </Section>
      </Container>
    </main>
  );
}
