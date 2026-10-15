import React from "react";
import { Sparkles, Check } from "lucide-react";

export function GraphicMealVsJuice() {
  return (
    <div className="w-full rounded-2xl bg-bg border border-border p-4 sm:p-5 flex flex-col justify-center gap-3.5 select-none shadow-2xs">
      <div className="flex items-center justify-between border-b border-border/80 pb-2.5">
        <span className="text-xs font-heading font-medium text-text-muted">
          So sánh cơ chế hấp thu
        </span>
        <span className="text-xs font-medium text-primary">
          Nhẹ bụng êm ruột
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3.5 rounded-xl bg-surface border border-border/80 flex flex-col justify-between gap-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-heading font-semibold text-text">Bữa ăn dầu mỡ</span>
            <span className="text-xs font-medium text-text-muted">
              4 - 5 tiếng
            </span>
          </div>
          <p className="text-xs text-text-muted leading-relaxed font-body">
            Dạ dày và gan phải co bóp liên tục phân giải chất béo nặng, dễ gây ậm ạch, buồn ngủ.
          </p>
          <div className="pt-1.5 border-t border-border/60 flex items-center gap-1.5 text-xs text-text-muted font-body">
            <span className="h-1.5 w-1.5 rounded-full bg-text-muted/40 shrink-0" aria-hidden="true" />
            <span>Tiêu hóa chậm, nặng bụng</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-accent-soft/40 border border-primary/30 flex flex-col justify-between gap-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-heading font-semibold text-primary">5 chai nước ép tươi</span>
            <span className="text-xs font-medium text-primary">
              ~20 phút
            </span>
          </div>
          <p className="text-xs text-text leading-relaxed font-body">
            Dinh dưỡng lỏng thẩm thấu nhanh qua ruột non, dạ dày được nghỉ ngơi để tự phục hồi.
          </p>
          <div className="pt-1.5 border-t border-primary/20 flex items-center gap-1.5 text-xs font-medium text-primary font-body">
            <Check size={12} strokeWidth={2.5} className="shrink-0" aria-hidden="true" />
            <span>Hấp thu nhanh, ruột nhẹ nhõm</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-surface border border-border/70 text-xs">
        <span className="flex items-center gap-1.5 font-medium text-text">
          <Sparkles size={13} className="text-primary shrink-0" aria-hidden="true" />
          <span>Tổng năng lượng sạch:</span>
        </span>
        <span className="font-heading font-semibold text-primary">~850 - 1.050 kcal / ngày</span>
      </div>
    </div>
  );
}
