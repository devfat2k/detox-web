import type { Metadata } from "next";
import { SafetyForm } from "@/features/consultation";
import { FIXED_LABELS } from "@/config/copy";

export const metadata: Metadata = {
  title: FIXED_LABELS.PAGE_CONSULTATION_STEP4_TITLE,
  description: FIXED_LABELS.PAGE_CONSULTATION_STEP4_DESC,
};

export default function ConsultationSafetyPage() {
  return (
    <main>
      <SafetyForm />
    </main>
  );
}
