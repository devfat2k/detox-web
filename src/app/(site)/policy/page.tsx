import type { Metadata } from "next";
import { PolicyContent } from "@/features/policy";
import { FIXED_LABELS } from "@/config/copy";

export const metadata: Metadata = {
  title: FIXED_LABELS.PAGE_POLICY_TITLE,
  description: FIXED_LABELS.PAGE_POLICY_DESC,
};

export default function PolicyPage() {
  return (
    <main>
      <PolicyContent />
    </main>
  );
}
