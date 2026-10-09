import { Bricolage_Grotesque, Be_Vietnam_Pro } from "next/font/google";

export const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["vietnamese", "latin"],
  display: "swap",
});

export const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const fontVariables = `${bricolage.variable} ${beVietnamPro.variable}`;
