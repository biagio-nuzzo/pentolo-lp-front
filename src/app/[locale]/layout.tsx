// Built-in
import { notFound } from "next/navigation"
// Libraries
import { Locale, hasLocale, NextIntlClientProvider } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { clsx } from "clsx"
// Config
import { routing } from "@/i18n/routing"
// Styles
import "./styles.css"

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata(
  props: Omit<LayoutProps<"/[locale]">, "children">
) {
  const { locale } = await props.params

  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "LocaleLayout",
  })

  return {
    title: t("siteName"),
    applicationName: t("siteName"),
    authors: [{ name: t("author") }],
    creator: t("author"),
    publisher: t("publisher"),
  }
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  // Enable static rendering
  setRequestLocale(locale)

  return (
    <html className="h-full" lang={locale}>
      <body className={clsx("flex h-full flex-col scroller")}>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  )
}
