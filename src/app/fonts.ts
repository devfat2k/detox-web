import { Be_Vietnam_Pro } from "next/font/google";

export const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const fontVariables = beVietnamPro.variable;

