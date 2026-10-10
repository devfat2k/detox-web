import { Newsreader, Be_Vietnam_Pro } from "next/font/google";

export const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["vietnamese", "latin"],
  weight: "600",
  style: "normal",
  display: "swap",
});

export const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const fontVariables = `${newsreader.variable} ${beVietnamPro.variable}`;
