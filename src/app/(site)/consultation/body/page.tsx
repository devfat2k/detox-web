import type { Metadata } from "next";
import { BodyForm } from "@/features/consultation";
import { FIXED_LABELS } from "@/config/copy";

export const metadata: Metadata = {
  title: FIXED_LABELS.PAGE_CONSULTATION_STEP1_TITLE,
  description: FIXED_LABELS.PAGE_CONSULTATION_STEP1_DESC,
};

export default function ConsultationBodyPage() {
  return (
    <main>
      <BodyForm />
    </main>
  );
}
