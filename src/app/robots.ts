import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://epxanhchualanh.vn";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/dev-ui",
        "/dev-ui/",
        "/consultation/result",
        "/consultation/ineligible",
      ],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
