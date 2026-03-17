// Built-in
import { MetadataRoute } from "next"
// Config
import { origin } from "@/config"
import { routing } from "@/i18n/routing"

/**
 * Sitemap configuration for SEO.
 * This helps search engines discover and index all pages of your site.
 *
 * Important for multilingual sites: includes alternate language versions (hreflang).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // For each page, include all language variants
  const pages: MetadataRoute.Sitemap = [
    // Homepage for all languages
    {
      url: `${origin}/${routing.defaultLocale}`, // Main URL (Italian)
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          it: `${origin}/it`,
          en: `${origin}/en`,
        },
      },
    },
  ]

  return pages
}
