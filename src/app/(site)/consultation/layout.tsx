"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { StepperHeader } from "@/features/consultation";
import { ConsultationProvider } from "@/features/consultation/context";

export default function ConsultationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const getStep = (path: string): number => {
    if (path.includes("/body")) return 2;
    if (path.includes("/goals")) return 3;
    if (path.includes("/experience")) return 4;
    return 1;
  };

  const isStepperPage =
    !pathname.includes("/result") && !pathname.includes("/ineligible");

  return (
    <ConsultationProvider>
      <div className="flex min-h-[calc(100vh-160px)] flex-col">
        {isStepperPage && <StepperHeader currentStep={getStep(pathname)} />}
        <div className="flex-1">{children}</div>
      </div>
    </ConsultationProvider>
  );
}
