import React from "react";
import { Check, X } from "lucide-react";

export function GraphicFreshVsPackaged() {
  return (
    <div className="w-full rounded-2xl bg-bg border border-border p-4 sm:p-5 flex flex-col justify-center gap-3.5 select-none shadow-2xs">
      <div className="flex items-center justify-between border-b border-border/80 pb-2.5">
        <span className="text-xs font-heading font-medium text-text-muted">
          So sánh chất lượng nước ép
        </span>
        <span className="text-xs font-medium text-primary">
          Ép tươi mỗi sáng
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3.5 rounded-xl bg-surface border border-border/80 flex flex-col justify-between gap-2.5 opacity-85">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-heading font-semibold text-text">Đóng chai siêu thị</span>
            <span className="text-xs text-text-muted">Công nghiệp</span>
          </div>
          <ul className="text-xs text-text-muted space-y-1.5 font-body">
            <li className="flex items-center gap-1.5">
              <X size={12} strokeWidth={2.5} className="text-text-muted/70 shrink-0" aria-hidden="true" />
              <span>Gia nhiệt tiệt trùng (mất men sống)</span>
            </li>
            <li className="flex items-center gap-1.5">
              <X size={12} strokeWidth={2.5} className="text-text-muted/70 shrink-0" aria-hidden="true" />
              <span>Chất bảo quản và thêm đường cát</span>
            </li>
            <li className="flex items-center gap-1.5">
              <X size={12} strokeWidth={2.5} className="text-text-muted/70 shrink-0" aria-hidden="true" />
              <span>Hạn sử dụng dài 6 - 12 tháng</span>
            </li>
          </ul>
        </div>

        <div className="p-3.5 rounded-xl bg-accent-soft/40 border border-primary/30 flex flex-col justify-between gap-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-heading font-semibold text-primary">Ép Xanh Chữa Lành</span>
            <span className="text-xs font-medium text-primary">100% nguyên chất</span>
          </div>
          <ul className="text-xs text-text space-y-1.5 font-body">
            <li className="flex items-center gap-1.5">
              <Check size={12} strokeWidth={2.5} className="text-primary shrink-0" aria-hidden="true" />
              <span>Ép chậm nông sản tươi mỗi sáng</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Check size={12} strokeWidth={2.5} className="text-primary shrink-0" aria-hidden="true" />
              <span>Giữ trọn enzym sống cho ruột</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Check size={12} strokeWidth={2.5} className="text-primary shrink-0" aria-hidden="true" />
              <span>0 đường, 0 phụ gia, dùng trong ngày</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-xs text-center text-text-muted bg-surface p-2.5 rounded-xl border border-border/70 font-body">
        Chỉ nước ép tươi sống mới mang lại giá trị thanh lọc thực sự cho hệ tiêu hóa.
      </div>
    </div>
  );
}
