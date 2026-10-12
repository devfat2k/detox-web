import React from "react";
import { Droplets, Sparkles, Check, X } from "lucide-react";

/**
 * Minh họa #1: Bữa ăn nặng bụng (4-5h co bóp) VS Nước ép tươi (20 phút thẩm thấu)
 */
export function GraphicMealVsJuice() {
  return (
    <div className="w-full rounded-2xl bg-bg border border-border p-4 sm:p-5 flex flex-col justify-center gap-3.5 select-none shadow-2xs">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-border/80 pb-2.5">
        <span className="text-xs font-heading font-semibold uppercase tracking-wider text-text-muted">
          So sánh cơ chế hấp thu
        </span>
        <span className="text-[11px] font-heading font-semibold text-primary bg-accent-soft px-2.5 py-0.5 rounded-full border border-primary/20">
          Nhẹ bụng êm ruột
        </span>
      </div>

      {/* Grid so sánh cân đối 2 cột */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Cột 1: Cơm dầu mỡ */}
        <div className="p-3.5 rounded-xl bg-surface border border-border/80 flex flex-col justify-between gap-2.5 transition-all duration-200">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-heading font-semibold text-text">Bữa ăn dầu mỡ</span>
            <span className="text-[11px] font-medium text-text-muted bg-bg px-2 py-0.5 rounded-md border border-border shrink-0">
              4 - 5 tiếng
            </span>
          </div>
          <p className="text-xs text-text-muted leading-relaxed font-body">
            Dạ dày và gan phải co bóp liên tục phân giải chất béo nặng, dễ gây ậm ạch, buồn ngủ.
          </p>
          <div className="pt-1.5 border-t border-border/60 flex items-center gap-1.5 text-[11px] text-text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-text-muted/40 shrink-0" />
            <span>Tiêu hóa chậm, nặng bụng</span>
          </div>
        </div>

        {/* Cột 2: 5 chai nước ép tươi */}
        <div className="p-3.5 rounded-xl bg-accent-soft/40 border border-primary/30 flex flex-col justify-between gap-2.5 transition-all duration-200">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-heading font-semibold text-primary">5 chai nước ép tươi</span>
            <span className="text-[11px] font-heading font-semibold text-primary bg-surface px-2 py-0.5 rounded-md border border-primary/30 shrink-0">
              ~20 phút
            </span>
          </div>
          <p className="text-xs text-text leading-relaxed font-body">
            Dinh dưỡng lỏng thẩm thấu nhanh qua ruột non, dạ dày được nghỉ ngơi để tự phục hồi.
          </p>
          <div className="pt-1.5 border-t border-primary/20 flex items-center gap-1.5 text-[11px] font-medium text-primary">
            <Check size={12} strokeWidth={2.5} className="shrink-0" />
            <span>Hấp thu nhanh, ruột nhẹ nhõm</span>
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-surface border border-border/70 text-xs">
        <span className="flex items-center gap-1.5 font-medium text-text">
          <Sparkles size={13} className="text-primary shrink-0" />
          <span>Tổng năng lượng sạch:</span>
        </span>
        <span className="font-heading font-semibold text-primary">~850 - 1.050 kcal / ngày</span>
      </div>
    </div>
  );
}

/**
 * Minh họa #2: Giảm nước thừa & cặn bã tiêu hóa (giúp vòng bụng phẳng tự nhiên)
 */
export function GraphicWaterRetention() {
  return (
    <div className="w-full rounded-2xl bg-bg border border-border p-4 sm:p-5 flex flex-col justify-center gap-3.5 select-none shadow-2xs">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-border/80 pb-2.5">
        <span className="text-xs font-heading font-semibold uppercase tracking-wider text-text-muted">
          Thực tế 0.5 - 1.5kg giảm ban đầu
        </span>
        <span className="text-[11px] font-heading font-semibold text-primary bg-accent-soft px-2.5 py-0.5 rounded-full border border-primary/20">
          Minh bạch khoa học
        </span>
      </div>

      {/* 2 Khối tỷ lệ cân đối */}
      <div className="space-y-2.5">
        {/* Khối 1: Nước & Muối thừa */}
        <div className="p-3.5 rounded-xl bg-surface border border-border/80 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-heading font-semibold text-text flex items-center gap-1.5">
              <Droplets size={13} className="text-primary shrink-0" />
              <span>Nước &amp; muối natri ứ đọng</span>
            </span>
            <span className="font-heading font-semibold text-primary bg-accent-soft/60 px-2 py-0.5 rounded-md border border-primary/20 text-[11px]">
              Chiếm ~70%
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-bg overflow-hidden border border-border">
            <div className="h-full bg-primary rounded-full w-[70%]" />
          </div>
          <p className="text-[11px] text-text-muted leading-relaxed font-body">
            Kali từ cần tây &amp; dưa leo kích thích xả lượng muối thừa, giảm sưng phù mặt và bắp chân.
          </p>
        </div>

        {/* Khối 2: Cặn bã tiêu hóa */}
        <div className="p-3.5 rounded-xl bg-surface border border-border/80 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-heading font-semibold text-text flex items-center gap-1.5">
              <Sparkles size={13} className="text-primary shrink-0" />
              <span>Cặn bã tồn đọng đường ruột</span>
            </span>
            <span className="font-heading font-semibold text-primary/80 bg-accent-soft/40 px-2 py-0.5 rounded-md border border-primary/20 text-[11px]">
              Chiếm ~30%
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-bg overflow-hidden border border-border">
            <div className="h-full bg-primary/70 rounded-full w-[30%]" />
          </div>
          <p className="text-[11px] text-text-muted leading-relaxed font-body">
            Đường ruột được xả sạch cặn bã giúp vòng bụng xẹp phẳng tự nhiên khi cài nút quần.
          </p>
        </div>
      </div>

      {/* Footer bar */}
      <div className="text-[11px] text-center text-text-muted italic bg-surface p-2 rounded-xl border border-border/60">
        *Mỡ thừa cần thời gian thâm hụt calo dài hạn, không có giải pháp giảm mỡ cấp tốc trong vài ngày.
      </div>
    </div>
  );
}

/**
 * Minh họa #3: Nước ép chậm tươi 100% VS Nước đóng chai tiệt trùng
 */
export function GraphicFreshVsPackaged() {
  return (
    <div className="w-full rounded-2xl bg-bg border border-border p-4 sm:p-5 flex flex-col justify-center gap-3.5 select-none shadow-2xs">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-border/80 pb-2.5">
        <span className="text-xs font-heading font-semibold uppercase tracking-wider text-text-muted">
          So sánh chất lượng nước ép
        </span>
        <span className="text-[11px] font-heading font-semibold text-primary bg-accent-soft px-2.5 py-0.5 rounded-full border border-primary/20">
          Ép tươi mỗi sáng
        </span>
      </div>

      {/* Grid so sánh 2 cột cân đối */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Đóng chai siêu thị */}
        <div className="p-3.5 rounded-xl bg-surface border border-border/80 flex flex-col justify-between gap-2.5 opacity-85">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-heading font-semibold text-text">Đóng chai siêu thị</span>
            <span className="text-[10px] text-text-muted bg-bg px-2 py-0.5 rounded-md border border-border shrink-0">
              Công nghiệp
            </span>
          </div>
          <ul className="text-xs text-text-muted space-y-1.5 font-body">
            <li className="flex items-center gap-1.5">
              <X size={12} strokeWidth={2.5} className="text-text-muted/70 shrink-0" />
              <span>Gia nhiệt tiệt trùng (mất men sống)</span>
            </li>
            <li className="flex items-center gap-1.5">
              <X size={12} strokeWidth={2.5} className="text-text-muted/70 shrink-0" />
              <span>Chất bảo quản &amp; thêm đường cát</span>
            </li>
            <li className="flex items-center gap-1.5">
              <X size={12} strokeWidth={2.5} className="text-text-muted/70 shrink-0" />
              <span>Hạn sử dụng dài 6 - 12 tháng</span>
            </li>
          </ul>
        </div>

        {/* Nước ép tươi Ép Xanh */}
        <div className="p-3.5 rounded-xl bg-accent-soft/40 border border-primary/30 flex flex-col justify-between gap-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-heading font-semibold text-primary">Ép Xanh Chữa Lành</span>
            <span className="text-[10px] font-heading font-semibold text-primary bg-surface px-2 py-0.5 rounded-md border border-primary/30 shrink-0">
              100% Nguyên chất
            </span>
          </div>
          <ul className="text-xs text-text space-y-1.5 font-body">
            <li className="flex items-center gap-1.5">
              <Check size={12} strokeWidth={2.5} className="text-primary shrink-0" />
              <span>Ép chậm nông sản tươi mỗi sáng</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Check size={12} strokeWidth={2.5} className="text-primary shrink-0" />
              <span>Giữ trọn enzym sống cho ruột</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Check size={12} strokeWidth={2.5} className="text-primary shrink-0" />
              <span>0 đường, 0 phụ gia, dùng trong ngày</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer bar */}
      <div className="text-xs text-center text-text-muted bg-surface p-2.5 rounded-xl border border-border/70 font-body">
        Chỉ nước ép tươi sống mới mang lại giá trị thanh lọc thực sự cho hệ tiêu hóa.
      </div>
    </div>
  );
}

/**
 * Minh họa #4: Nhịp sinh học 1-3 ngày vừa vặn, không ép cơ thể quá mức
 */
export function GraphicPacingCycles() {
  return (
    <div className="w-full rounded-2xl bg-bg border border-border p-4 sm:p-5 flex flex-col justify-center gap-3.5 select-none shadow-2xs">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-border/80 pb-2.5">
        <span className="text-xs font-heading font-semibold uppercase tracking-wider text-text-muted">
          Chu kỳ thích ứng khoa học
        </span>
        <span className="text-[11px] font-heading font-semibold text-primary bg-accent-soft px-2.5 py-0.5 rounded-full border border-primary/20">
          Không ép quá sức
        </span>
      </div>

      {/* 3 Thẻ nhịp độ sinh học cân đối */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {/* Bước 1 */}
        <div className="p-3 rounded-xl bg-surface border border-border/80 space-y-1 text-center flex flex-col justify-between">
          <div className="h-6 w-6 rounded-full bg-bg border border-border text-text font-heading font-semibold text-xs flex items-center justify-center mx-auto">
            1
          </div>
          <div>
            <span className="text-xs font-heading font-semibold text-text block">1 ngày</span>
            <span className="text-[11px] text-primary font-medium block">Làm quen</span>
          </div>
          <p className="text-[11px] text-text-muted leading-tight font-body">
            Thử thách nhẹ nhàng cho người mới, bụng êm ái.
          </p>
        </div>

        {/* Bước 2 */}
        <div className="p-3 rounded-xl bg-accent-soft/50 border border-primary/40 space-y-1 text-center flex flex-col justify-between">
          <div className="h-6 w-6 rounded-full bg-primary text-bg font-heading font-semibold text-xs flex items-center justify-center mx-auto shadow-2xs">
            2
          </div>
          <div>
            <span className="text-xs font-heading font-semibold text-primary block">3 ngày</span>
            <span className="text-[11px] text-primary font-semibold block">Cân bằng chuẩn</span>
          </div>
          <p className="text-[11px] text-text leading-tight font-body">
            72 giờ vàng tái lập nhịp sinh học cho đường ruột.
          </p>
        </div>

        {/* Bước 3 */}
        <div className="p-3 rounded-xl bg-surface border border-border/80 space-y-1 text-center flex flex-col justify-between">
          <div className="h-6 w-6 rounded-full bg-bg border border-border text-text font-heading font-semibold text-xs flex items-center justify-center mx-auto">
            3
          </div>
          <div>
            <span className="text-xs font-heading font-semibold text-text block">Ăn dặm</span>
            <span className="text-[11px] text-primary font-medium block">Phục hồi</span>
          </div>
          <p className="text-[11px] text-text-muted leading-tight font-body">
            Ăn súp, cháo yến mạch để giữ vòng eo thon gọn.
          </p>
        </div>
      </div>

      {/* Footer bar */}
      <div className="text-xs text-center text-text-muted bg-surface p-2.5 rounded-xl border border-border/70 font-body">
        Khởi đầu với 1 hoặc 3 ngày là nhịp độ an toàn và thoải mái nhất cho cơ thể.
      </div>
    </div>
  );
}

/**
 * Minh họa #5: Chuyển tiếp êm dịu sau detox (ăn dặm súp, cháo yến mạch)
 */
export function GraphicGentleRecovery() {
  return (
    <div className="w-full rounded-2xl bg-bg border border-border p-4 sm:p-5 flex flex-col justify-center gap-3.5 select-none shadow-2xs">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-border/80 pb-2.5">
        <span className="text-xs font-heading font-semibold uppercase tracking-wider text-text-muted">
          Hướng dẫn ăn dặm sau detox
        </span>
        <span className="text-[11px] font-heading font-semibold text-primary bg-accent-soft px-2.5 py-0.5 rounded-full border border-primary/20">
          Giữ trọn thành quả
        </span>
      </div>

      {/* Grid 2 cột so sánh cân đối */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Nên tránh */}
        <div className="p-3.5 rounded-xl bg-surface border border-border/80 flex flex-col justify-between gap-2.5 opacity-85">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-heading font-semibold text-text">Nên tránh ăn bù</span>
            <span className="text-[10px] text-text-muted bg-bg px-2 py-0.5 rounded-md border border-border shrink-0">
              Dễ sốc ruột
            </span>
          </div>
          <p className="text-xs text-text-muted leading-relaxed font-body">
            Tránh nạp ngay đồ chiên rán dầu mỡ, cay nóng hay đồ uống có cồn làm hệ tiêu hóa bị quá tải đột ngột.
          </p>
          <div className="pt-1.5 border-t border-border/60 flex items-center gap-1.5 text-[11px] text-text-muted">
            <X size={12} strokeWidth={2.5} className="text-text-muted/70 shrink-0" />
            <span>Hạn chế dầu mỡ, đồ cay nóng</span>
          </div>
        </div>

        {/* Nên ăn */}
        <div className="p-3.5 rounded-xl bg-accent-soft/40 border border-primary/30 flex flex-col justify-between gap-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-heading font-semibold text-primary">Nên ăn nhẹ 1-2 ngày</span>
            <span className="text-[10px] font-heading font-semibold text-primary bg-surface px-2 py-0.5 rounded-md border border-primary/30 shrink-0">
              Êm dịu dạ dày
            </span>
          </div>
          <p className="text-xs text-text leading-relaxed font-body">
            Ưu tiên súp bí đỏ, cháo yến mạch, khoai lang hấp và trái cây mềm để giữ vòng bụng xẹp phẳng lâu dài.
          </p>
          <div className="pt-1.5 border-t border-primary/20 flex items-center gap-1.5 text-[11px] font-medium text-primary">
            <Check size={12} strokeWidth={2.5} className="shrink-0" />
            <span>Ưu tiên súp, cháo yến mạch</span>
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="text-xs text-center text-text-muted bg-surface p-2.5 rounded-xl border border-border/70 font-body">
        Ăn nhẹ 1-2 ngày sau detox giúp cơ thể chuyển tiếp tự nhiên sang lối sống thanh đạm.
      </div>
    </div>
  );
}
