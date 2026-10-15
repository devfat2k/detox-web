import React from "react";
import { Check, X } from "lucide-react";

export function GraphicGentleRecovery() {
  return (
    <div className="w-full rounded-2xl bg-bg border border-border p-4 sm:p-5 flex flex-col justify-center gap-3.5 select-none shadow-2xs">
      <div className="flex items-center justify-between border-b border-border/80 pb-2.5">
        <span className="text-xs font-heading font-medium text-text-muted">
          Hướng dẫn ăn dặm sau detox
        </span>
        <span className="text-xs font-medium text-primary">
          Giữ trọn thành quả
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3.5 rounded-xl bg-surface border border-border/80 flex flex-col justify-between gap-2.5 opacity-85">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-heading font-semibold text-text">Nên tránh ăn bù</span>
            <span className="text-xs text-text-muted">Gây quá tải</span>
          </div>
          <ul className="text-xs text-text-muted space-y-1.5 font-body">
            <li className="flex items-center gap-1.5">
              <X size={12} strokeWidth={2.5} className="text-text-muted/70 shrink-0" aria-hidden="true" />
              <span>Thịt đỏ, đồ chiên rán dầu mỡ</span>
            </li>
            <li className="flex items-center gap-1.5">
              <X size={12} strokeWidth={2.5} className="text-text-muted/70 shrink-0" aria-hidden="true" />
              <span>Trà sữa, nước ngọt có ga, bia rượu</span>
            </li>
            <li className="flex items-center gap-1.5">
              <X size={12} strokeWidth={2.5} className="text-text-muted/70 shrink-0" aria-hidden="true" />
              <span>Ăn quá no ngay ngày đầu kết thúc</span>
            </li>
          </ul>
        </div>

        <div className="p-3.5 rounded-xl bg-accent-soft/40 border border-primary/30 flex flex-col justify-between gap-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-heading font-semibold text-primary">Ăn dặm nhẹ nhàng</span>
            <span className="text-xs font-medium text-primary">Êm bụng 2 ngày sau</span>
          </div>
          <ul className="text-xs text-text space-y-1.5 font-body">
            <li className="flex items-center gap-1.5">
              <Check size={12} strokeWidth={2.5} className="text-primary shrink-0" aria-hidden="true" />
              <span>Cháo yến mạch, súp bí đỏ, khoai lang</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Check size={12} strokeWidth={2.5} className="text-primary shrink-0" aria-hidden="true" />
              <span>Rau củ luộc, ức gà hấp xé nhỏ</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Check size={12} strokeWidth={2.5} className="text-primary shrink-0" aria-hidden="true" />
              <span>Duy trì 1 chai nước ép tươi mỗi sáng</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-xs text-center text-text-muted bg-surface p-2.5 rounded-xl border border-border/70 font-body">
        Ăn dặm đúng cách giúp duy trì vòng bụng phẳng và không bị tăng cân trở lại.
      </div>
    </div>
  );
}
