import type { MetadataRoute } from "next";

const BASE_URL = "https://www.stayhavencollection.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/journal", "/contact", "/privacy", "/terms"];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }));
}
