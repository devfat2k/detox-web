import type { Metadata } from "next";
import { Step3Form } from "@/features/consultation";
import { FIXED_LABELS } from "@/config/copy";

export const metadata: Metadata = {
  title: FIXED_LABELS.PAGE_CONSULTATION_STEP2_TITLE,
  description: FIXED_LABELS.PAGE_CONSULTATION_STEP2_DESC,
};

export default function ConsultationGoalsPage() {
  return (
    <main>
      <Step3Form />
    </main>
  );
}
