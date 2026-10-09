import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-12">
      <div className="w-full max-w-xl space-y-8">
        <header className="space-y-3 text-center md:text-left">
          <span className="inline-block text-xs font-medium text-text-muted">
            Ép Xanh Chữa Lành
          </span>
          <h1 className="text-2xl md:text-3xl font-semibold leading-tight text-text">
            Lắng nghe cơ thể, chọn liệu trình nước ép dịu lành
          </h1>
          <p className="text-base text-text-muted leading-relaxed max-w-prose">
            Website giúp bạn tìm thấy lộ trình nước ép 1, 3 hoặc 6 ngày phù hợp với thể trạng từ menu thật của quán. Tất cả đều miễn phí.
          </p>
        </header>

        <section className="rounded-xl border border-border bg-surface p-6 space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-medium text-text">
              Khảo sát cá nhân hóa
            </h2>
            <p className="text-base text-text-muted leading-relaxed">
              Trả lời 4 câu hỏi ngắn trong khoảng 1 phút để nhận lời khuyên dành riêng cho bạn.
            </p>
          </div>

          <Link
            href="/consultation"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 text-base font-medium text-bg transition-colors duration-150 motion-reduce:transition-none hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <span>Xem lộ trình của tôi</span>
            <ArrowRight size={18} strokeWidth={1.75} />
          </Link>
        </section>

        <footer className="pt-8 text-center text-xs text-text-muted space-y-2">
          <p>Dữ liệu khảo sát tính toán 100% trên trình duyệt và không được lưu trữ.</p>
        </footer>
      </div>
    </main>
  );
}
