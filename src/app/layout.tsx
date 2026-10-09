import type { Metadata, Viewport } from "next";
import { fontVariables } from "./fonts";
import { SITE_CONFIG, THEME_COLOR } from "@/config/site";
import { FIXED_LABELS } from "@/config/copy";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: THEME_COLOR,
};

export const metadata: Metadata = {
  title: {
    template: `%s — ${SITE_CONFIG.name}`,
    default: SITE_CONFIG.name,
  },
  description: SITE_CONFIG.description,
  openGraph: {
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${fontVariables} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-surface focus:text-text focus:border focus:border-border focus:rounded-lg"
        >
          {FIXED_LABELS.SKIP_TO_CONTENT}
        </a>
        {children}
      </body>
    </html>
  );
}
