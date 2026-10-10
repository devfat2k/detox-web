import type { Metadata } from "next";
import { IneligibleView } from "@/features/consultation";
import { FIXED_LABELS } from "@/config/copy";

export const metadata: Metadata = {
  title: FIXED_LABELS.PAGE_CONSULTATION_INELIGIBLE_TITLE,
  description: FIXED_LABELS.PAGE_CONSULTATION_INELIGIBLE_DESC,
  robots: {
    index: false,
    follow: false,
  },
};

export default function ConsultationIneligiblePage() {
  return (
    <main>
      <IneligibleView />
    </main>
  );
}
