import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://ashevilletailor.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://ashevilletailor.com/wedding-dress-alterations-asheville",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://ashevilletailor.com/how-it-works",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://www.ashevilletailor.com/mobile-tailor-asheville",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },

  ];
}