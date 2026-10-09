import React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh flex flex-col bg-bg text-text">
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 flex flex-col focus:outline-none">
        {children}
      </main>
      <Footer />
    </div>
  );
}
