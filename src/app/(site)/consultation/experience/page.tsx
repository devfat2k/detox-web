import type { Metadata } from "next";
import { ExperienceForm } from "@/features/consultation";
import { FIXED_LABELS } from "@/config/copy";

export const metadata: Metadata = {
  title: FIXED_LABELS.PAGE_CONSULTATION_STEP3_TITLE,
  description: FIXED_LABELS.PAGE_CONSULTATION_STEP3_DESC,
};

export default function ConsultationExperiencePage() {
  return (
    <main>
      <ExperienceForm />
    </main>
  );
}
