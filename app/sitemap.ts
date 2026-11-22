import type { MetadataRoute } from "next";

const baseUrl = "https://chartartists.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/risk-calculator`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/tools`, changeFrequency: "monthly", priority: 0.5 },
  ];
}
