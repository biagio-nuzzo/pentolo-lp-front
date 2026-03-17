// Built-in
import { Metadata } from "next"
// Libraries
import { Locale } from "next-intl"
// Config
import { origin, siteName } from "@/config"
import { getPathname } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"

// Types
type Pathname = keyof typeof routing.pathnames

/**
 * Helper to build complete SEO metadata with support for translated paths
 * Accept value already translated to avoid typing issues
 *
 * @param pathname - The unlocalized pathname (e.g., '/example') that will be automatically translated
 * @param customImage - Custom image URL (optional). If not provided, uses default `/og-image.webp`
 */
export function buildPageMetadata({
  locale,
  pathname,
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImageAlt,
  customImage,
  includeAlternates = true,
}: {
  locale: string
  pathname: string
  title?: string
  description: string
  keywords: string
  ogTitle: string
  ogDescription: string
  ogImageAlt: string
  customImage?: string
  includeAlternates?: boolean
}): Metadata {
  // Use custom image or default OG image
  const ogImageUrl = customImage || `${origin}/og-image.webp`

  // Retrive the translated path for the current locale (e.g., '/esempio' for IT, '/example' for EN)
  const localizedPath = getPathname({
    href: pathname as Pathname,
    locale: locale as Locale,
  })

  const metadata: Metadata = {
    ...(title && { title: `${title} | ${siteName}` }),
    description,
    keywords,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: `${origin}${localizedPath}`,
      siteName,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
        },
      ],
      locale: locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }

  if (includeAlternates) {
    // Generate alternates only for other languages (exclude current one)
    const languages: Record<string, string> = {}

    for (const loc of routing.locales) {
      if (loc !== locale) {
        const translatedPath = getPathname({
          href: pathname as Pathname,
          locale: loc as Locale,
        })
        languages[loc] = `${origin}${translatedPath}`
      }
    }

    metadata.alternates = {
      canonical: `${origin}${localizedPath}`,
      languages,
    }
  }

  return metadata
}
