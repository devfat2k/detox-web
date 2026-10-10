import type { Metadata } from "next";
import { Step1Form } from "@/features/consultation";
import { FIXED_LABELS } from "@/config/copy";

export const metadata: Metadata = {
  title: FIXED_LABELS.PAGE_CONSULTATION_STEP1_TITLE,
  description: FIXED_LABELS.PAGE_CONSULTATION_STEP1_DESC,
};

export default function ConsultationStep1Page() {
  return (
    <main>
      <Step1Form />
    </main>
  );
}
