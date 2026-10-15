import React from "react";
import { Card } from "@/components/ui";

interface ResultAssessmentCardProps {
  readonly honorific: string;
  readonly bmi: number;
  readonly category?: string;
  readonly goalsSummary: string;
  readonly allergies?: readonly string[];
  readonly warnings: readonly string[];
}

export function ResultAssessmentCard({
  honorific,
  bmi,
  category,
  goalsSummary,
  allergies,
  warnings,
}: ResultAssessmentCardProps) {
  const hasNotes = Boolean((allergies && allergies.length > 0) || warnings.length > 0);

  return (
    <Card className="p-6 sm:p-7 space-y-4 bg-surface border-border">
      <div className="flex items-start gap-3.5">
        <div
          className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0"
          aria-hidden="true"
        />
        <div className="space-y-2 flex-1">
          <h2 className="font-heading font-semibold text-lg sm:text-xl text-text">
            Chia sẻ thể trạng cùng {honorific}
          </h2>
          <p className="font-body text-sm text-text leading-relaxed">
            Dựa trên thông tin {honorific} chia sẻ (
            <b>
              BMI ~{bmi}
              {category ? ` · ${category}` : ""}
            </b>
            ), cơ thể {honorific} đang phản ánh rõ nhu cầu cần được nghỉ ngơi ở
            hệ tiêu hóa và xoa dịu cảm giác <b>{goalsSummary}</b>.
          </p>
          <p className="font-body text-sm text-text-muted leading-relaxed">
            Tại Ép Xanh Chữa Lành, các bạn barista ép tươi từng chai mỗi sáng từ
            nông sản canh tác an toàn. Lộ trình này được thiết kế để {honorific}{" "}
            uống trọn vẹn trong ngày một cách dễ chịu, không bị hụt năng lượng
            hay cồn cào bao tử.
          </p>
        </div>
      </div>

      {hasNotes && (
        <div className="p-4 rounded-xl bg-bg/80 border border-border/80 space-y-2.5">
          <span className="text-xs font-semibold text-text block">
            Lưu ý riêng cho {honorific}:
          </span>
          <div className="space-y-2 text-xs">
            {allergies && allergies.length > 0 && (
              <div className="flex items-start gap-2 text-text-muted leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                <p>
                  <span className="font-medium text-text">
                    Dị ứng & khẩu vị:
                  </span>{" "}
                  Quán đã ghi nhận cơ thể bạn dị ứng hoặc không quen dùng:{" "}
                  <b className="text-text">{allergies.join(", ")}</b>. Đội ngũ
                  barista sẽ chủ động đổi nguyên liệu thay thế tương đương khi
                  chuẩn bị thực đơn cho bạn.
                </p>
              </div>
            )}
            {warnings.map((warning, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 text-text-muted leading-relaxed"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-error mt-1.5 shrink-0" />
                <p>
                  <span className="font-medium text-text">Thể trạng:</span>{" "}
                  {warning}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
