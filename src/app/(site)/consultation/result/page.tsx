import type { Metadata } from "next";
import { ResultView } from "@/features/consultation";
import { FIXED_LABELS } from "@/config/copy";

export const metadata: Metadata = {
  title: FIXED_LABELS.PAGE_CONSULTATION_RESULT_TITLE,
  description: FIXED_LABELS.PAGE_CONSULTATION_RESULT_DESC,
  robots: {
    index: false,
    follow: false,
  },
};

export default function ConsultationResultPage() {
  return (
    <main>
      <ResultView />
    </main>
  );
}
