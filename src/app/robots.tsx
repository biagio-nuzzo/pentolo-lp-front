// Built-in
import { MetadataRoute } from "next"
// Config
import { origin } from "@/config"

/**
 * Robots.txt configuration for search engine crawlers.
 * Defines which parts of the site can be crawled and where to find the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${origin}/sitemap.xml`, // Points crawlers to your sitemap
  }
}
