import React from "react";

export function GraphicPacingCycles() {
  return (
    <div className="w-full rounded-2xl bg-bg border border-border p-4 sm:p-5 flex flex-col justify-center gap-3.5 select-none shadow-2xs">
      <div className="flex items-center justify-between border-b border-border/80 pb-2.5">
        <span className="text-xs font-heading font-medium text-text-muted">
          Chu kỳ thích ứng khoa học
        </span>
        <span className="text-xs font-medium text-primary">
          Không ép quá sức
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        <div className="p-3 rounded-xl bg-surface border border-border/80 space-y-1 text-center flex flex-col justify-between">
          <div className="h-6 w-6 rounded-full bg-bg border border-border text-text font-heading font-semibold text-xs flex items-center justify-center mx-auto">
            1
          </div>
          <div>
            <span className="text-xs font-heading font-semibold text-text block">1 ngày</span>
            <span className="text-xs text-primary font-medium block">Làm quen</span>
          </div>
          <p className="text-xs text-text-muted leading-tight font-body">
            Thử thách nhẹ nhàng cho người mới, bụng êm ái.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-accent-soft/50 border border-primary/40 space-y-1 text-center flex flex-col justify-between">
          <div className="h-6 w-6 rounded-full bg-primary text-bg font-heading font-semibold text-xs flex items-center justify-center mx-auto shadow-2xs">
            2
          </div>
          <div>
            <span className="text-xs font-heading font-semibold text-primary block">3 ngày</span>
            <span className="text-xs text-primary font-semibold block">Cân bằng chuẩn</span>
          </div>
          <p className="text-xs text-text leading-tight font-body">
            72 giờ vàng tái lập nhịp sinh học cho đường ruột.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-surface border border-border/80 space-y-1 text-center flex flex-col justify-between">
          <div className="h-6 w-6 rounded-full bg-bg border border-border text-text font-heading font-semibold text-xs flex items-center justify-center mx-auto">
            3
          </div>
          <div>
            <span className="text-xs font-heading font-semibold text-text block">Ăn dặm</span>
            <span className="text-xs text-primary font-medium block">Phục hồi</span>
          </div>
          <p className="text-xs text-text-muted leading-tight font-body">
            Ăn súp, cháo yến mạch để giữ vòng eo thon gọn.
          </p>
        </div>
      </div>

      <div className="text-xs text-center text-text-muted bg-surface p-2.5 rounded-xl border border-border/70 font-body">
        Khởi đầu với 1 hoặc 3 ngày là nhịp độ an toàn và thoải mái nhất cho cơ thể.
      </div>
    </div>
  );
}
