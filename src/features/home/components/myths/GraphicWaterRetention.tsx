import React from "react";
import { Droplets, Sparkles } from "lucide-react";

export function GraphicWaterRetention() {
  return (
    <div className="w-full rounded-2xl bg-bg border border-border p-4 sm:p-5 flex flex-col justify-center gap-3.5 select-none shadow-2xs">
      <div className="flex items-center justify-between border-b border-border/80 pb-2.5">
        <span className="text-xs font-heading font-medium text-text-muted">
          Thực tế 0.5 - 1.5kg giảm ban đầu
        </span>
        <span className="text-xs font-medium text-primary">
          Minh bạch khoa học
        </span>
      </div>

      <div className="space-y-2.5">
        <div className="p-3.5 rounded-xl bg-surface border border-border/80 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-heading font-semibold text-text flex items-center gap-1.5">
              <Droplets size={13} className="text-primary shrink-0" aria-hidden="true" />
              <span>Nước và muối natri ứ đọng</span>
            </span>
            <span className="font-medium text-primary text-xs">
              Chiếm ~70%
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-bg overflow-hidden border border-border">
            <div className="h-full bg-primary rounded-full w-[70%]" />
          </div>
          <p className="text-xs text-text-muted leading-relaxed font-body">
            Kali từ cần tây và dưa leo kích thích xả lượng muối thừa, giảm sưng phù mặt và bắp chân.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-surface border border-border/80 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-heading font-semibold text-text flex items-center gap-1.5">
              <Sparkles size={13} className="text-primary shrink-0" aria-hidden="true" />
              <span>Cặn bã tồn đọng đường ruột</span>
            </span>
            <span className="font-medium text-primary text-xs">
              Chiếm ~30%
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-bg overflow-hidden border border-border">
            <div className="h-full bg-primary/70 rounded-full w-[30%]" />
          </div>
          <p className="text-xs text-text-muted leading-relaxed font-body">
            Đường ruột được xả sạch cặn bã giúp vòng bụng xẹp phẳng tự nhiên khi cài nút quần.
          </p>
        </div>
      </div>

      <div className="text-xs text-center text-text-muted bg-surface p-2 rounded-xl border border-border/60 font-body">
        Mỡ thừa cần thời gian thâm hụt calo dài hạn, không có giải pháp giảm mỡ cấp tốc trong vài ngày.
      </div>
    </div>
  );
}
