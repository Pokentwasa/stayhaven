import type { MetadataRoute } from "next";
import { PROPERTIES } from "@/data/properties";
import { DESTINATIONS } from "@/data/destinations";

const BASE_URL = "https://www.stayhavencollection.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/stays", "/destinations", "/about", "/journal", "/contact"].map(
    (route) => ({
      url: `${BASE_URL}${route}`,
      lastModified: new Date(),
    })
  );

  const propertyRoutes = PROPERTIES.map((p) => ({
    url: `${BASE_URL}/stays/${p.slug}`,
    lastModified: new Date(),
  }));

  const destinationRoutes = DESTINATIONS.map((d) => ({
    url: `${BASE_URL}/destinations/${d.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...propertyRoutes, ...destinationRoutes];
}
