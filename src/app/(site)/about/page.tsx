import type { Metadata } from "next";
import { AboutLetter } from "@/features/about";
import { FIXED_LABELS } from "@/config/copy";

export const metadata: Metadata = {
  title: FIXED_LABELS.PAGE_ABOUT_TITLE,
  description: FIXED_LABELS.PAGE_ABOUT_DESC,
};

export default function AboutPage() {
  return (
    <main>
      <AboutLetter />
    </main>
  );
}
