"use client"

// Built-in
import { useParams } from "next/navigation"
// Libraries
import { useLocale } from "next-intl"
import { Locale } from "next-intl"
// Config
import { usePathname, useRouter } from "@/i18n/navigation"

const locales: { locale: Locale; flag: string; label: string }[] = [
  { locale: "it" as Locale, flag: "🇮🇹", label: "Italiano" },
  { locale: "en" as Locale, flag: "🇬🇧", label: "English" },
]

export default function LanguageSwitcher() {
  const currentLocale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()

  function handleLocaleChange(nextLocale: Locale) {
    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      { pathname, params },
      { locale: nextLocale }
    )
  }

  return (
    <div className="flex items-center gap-1">
      {locales.map(({ locale, flag, label }) => {
        const isActive = currentLocale === locale
        return (
          <button
            key={locale}
            onClick={() => handleLocaleChange(locale)}
            aria-label={label}
            title={label}
            className={`relative text-2xl leading-none cursor-pointer transition-all px-1.5 py-0.5 rounded-md ${
              isActive
                ? "ring-1 ring-white/40 bg-white/10"
                : "opacity-90 hover:opacity-100"
            }`}
          >
            {flag}
          </button>
        )
      })}
    </div>
  )
}
