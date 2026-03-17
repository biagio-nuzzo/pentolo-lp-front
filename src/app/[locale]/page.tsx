// Built-in
import { use } from "react"
import Link from "next/link"
import Image from "next/image"
// Libraries
import { Locale, useTranslations } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
// Components
import {
  AdSection,
  Container,
  Footer,
  GridTwoCol,
  Hero,
  RotatingImage,
  ScrollScaleText,
} from "@/ui"
// Utils
import { buildPageMetadata } from "@/utils/metadata"
// Assets
import HeartOne from "@/assets/images/1.webp"
import HeartTwo from "@/assets/images/2.webp"
import HeroBackground from "@/assets/images/hero.webp"
import Four from "@/assets/images/4.webp"
import Brevetto from "@/assets/images/brevetto-pentolo-event.webp"
import PentoloEvent from "@/assets/images/pentolo-event-photo.webp"
import CookingPentolo from "@/assets/images/pentolo-event-cooking.webp"

export async function generateMetadata({ params }: PageProps<"/[locale]">) {
  const { locale } = await params

  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "IndexPage",
  })

  return buildPageMetadata({
    locale,
    pathname: "/",
    description: t("meta.description"),
    keywords: t("meta.keywords"),
    ogTitle: t("meta.ogTitle"),
    ogDescription: t("meta.ogDescription"),
    ogImageAlt: t("meta.ogImageAlt"),
  })
}

/**
 * Homepage
 * This is the main landing page for the application, supporting localization
 */
export default function IndexPage({ params }: PageProps<"/[locale]">) {
  const { locale } = use(params)

  // Enable static rendering
  setRequestLocale(locale as Locale)

  const t = useTranslations("IndexPage")

  return (
    <main>
      <Hero
        title={{
          start: t("hero.titleStart"),
          end: t("hero.titleEnd"),
        }}
        overlay
        description={t("hero.description")}
        backgroundSrc={HeroBackground.src}
      />

      {/* Il cuore dell'evento */}
      <section className="py-24 md:py-32 px-8 md:px-16">
        <Container>
          <GridTwoCol className="items-center">
            <div className="space-y-8">
              <ScrollScaleText className="text-4xl md:text-6xl xl:text-7xl font-semibold text-black leading-tight">
                {t("heartOfEvent.title")}
              </ScrollScaleText>
              <div className="w-16 h-1.5 bg-primary rounded-full border border-black" />
              <Link
                href="https://www.pentolo.com/contatti/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border-2 border-black text-black text-sm font-medium uppercase tracking-wider py-3.5 px-10 rounded-full hover:bg-primary hover:border-primary transition-all duration-300"
              >
                {t("heartOfEvent.cta")}
              </Link>
            </div>
            <div className="leading-relaxed text-black/80 space-y-5 text-lg md:text-xl">
              <p>{t("heartOfEvent.p1")}</p>
              <p>
                {t("heartOfEvent.p2a")} <br />
                {t("heartOfEvent.p2b")}
              </p>
              <p>
                {t("heartOfEvent.p3a")}
                <br /> {t("heartOfEvent.p3b")}
                <br /> {t("heartOfEvent.p3c")}
              </p>
              <p>{t("heartOfEvent.p4")}</p>
            </div>
          </GridTwoCol>
        </Container>
      </section>

      {/* Gallery 1 */}
      <section className="px-8 md:px-16">
        <Container>
          <div className="lg:px-16">
            <GridTwoCol className="gap-6! items-start">
              <RotatingImage
                src={HeartOne.src}
                alt="Pentolo Event in action"
                priority
                height="700px"
                className="md:mt-10"
                asBackground
              />
              <RotatingImage
                src={HeartTwo.src}
                alt="Pentolo Event detail"
                height="560px"
                aspectRatio="16/9"
                asBackground
              />
            </GridTwoCol>
          </div>
        </Container>
      </section>

      {/* Potenza e scenografia */}
      <section className="py-24 md:py-32 px-8 md:px-16">
        <Container>
          <GridTwoCol className="items-start">
            <div className="space-y-8">
              <ScrollScaleText className="text-4xl md:text-6xl xl:text-7xl font-semibold text-black leading-tight">
                {t("powerAndScenography.title")}
              </ScrollScaleText>
              <div className="w-16 h-1.5 bg-primary rounded-full border border-black" />
            </div>

            <div className="leading-relaxed space-y-6 text-black/80 text-lg md:text-xl">
              <p>{t("powerAndScenography.intro")}</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="mt-2 w-2.5 h-2.5 bg-primary rounded-full shrink-0 border border-black" />
                  {t("powerAndScenography.bullet1")}
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 w-2.5 h-2.5 bg-primary rounded-full shrink-0 border border-black" />
                  {t("powerAndScenography.bullet2")}
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 w-2.5 h-2.5 bg-primary rounded-full shrink-0 border border-black" />
                  {t("powerAndScenography.bullet3")}
                </li>
              </ul>
              <p>{t("powerAndScenography.structure")}</p>
              <p className="font-medium text-black">
                {t("powerAndScenography.highlight")}
              </p>
            </div>
          </GridTwoCol>
        </Container>
      </section>

      {/* Gallery 2 + CTA */}
      <section className="px-8 md:px-16 pb-24 md:pb-32">
        <Container>
          <div className="lg:px-16">
            <GridTwoCol className="gap-6!">
              <RotatingImage
                src={Four.src}
                alt="Pentolo Event in action"
                priority
                height="540px"
                asBackground
              />
              <div className="hidden md:block">
                <RotatingImage
                  src={Brevetto.src}
                  alt="Brevetto Pentolo Event"
                  aspectRatio="4/3"
                  minHeight="540px"
                  objectFit="contain"
                  className="mt-12"
                  imageClassName="bg-primary"
                />
              </div>
              <Image
                className="block md:hidden w-full h-auto mt-12 rounded-3xl shadow-lg border border-black/10"
                src={Brevetto.src}
                alt="Brevetto Pentolo Event"
                width={400}
                height={400}
              />
            </GridTwoCol>
          </div>

          <div className="flex justify-center mt-16">
            <Link
              href="https://www.pentolo.com/contatti/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary text-black text-sm font-semibold uppercase tracking-wider py-4 px-16 rounded-full border-2 border-primary hover:bg-transparent hover:border-black transition-all duration-300"
            >
              {t("cta")}
            </Link>
          </div>
        </Container>
      </section>

      {/* Per chi ama fare le cose in grande */}
      <section className="py-24 md:py-40 px-8 md:px-16 bg-black text-white">
        <Container>
          <div className="text-center mb-20">
            <ScrollScaleText className="text-4xl md:text-6xl xl:text-7xl font-semibold text-white leading-tight">
              {t("bigThings.title")}
              <span className="italic">{t("bigThings.titleItalic")}</span>
            </ScrollScaleText>
            <div className="w-20 h-1.5 bg-primary rounded-full mx-auto mt-8" />
          </div>

          <RotatingImage
            src={PentoloEvent.src}
            alt="Pentolo Event in action"
            priority
            height="600px"
            offset={["start end", "end center"]}
            asBackground
            className="[&>div]:max-h-75! md:[&>div]:max-h-none!"
          />

          <GridTwoCol className="mt-16 items-start">
            <div>
              <h3 className="text-3xl md:text-4xl xl:text-5xl font-semibold leading-tight">
                {t("bigThings.idealFor")}
              </h3>
              <p className="text-white/70 text-lg md:text-xl leading-relaxed mt-6">
                {t("bigThings.idealForDescription")}
              </p>
            </div>
            <ul className="space-y-5 md:mt-2">
              <li className="flex items-center gap-4 text-lg md:text-xl font-medium">
                <span className="w-3 h-3 bg-primary rounded-full shrink-0" />
                {t("bigThings.bullet1")}
              </li>
              <li className="flex items-center gap-4 text-lg md:text-xl font-medium">
                <span className="w-3 h-3 bg-primary rounded-full shrink-0" />
                {t("bigThings.bullet2")}
              </li>
              <li className="flex items-center gap-4 text-lg md:text-xl font-medium">
                <span className="w-3 h-3 bg-primary rounded-full shrink-0" />
                {t("bigThings.bullet3")}
              </li>
              <li className="flex items-center gap-4 text-lg md:text-xl font-medium">
                <span className="w-3 h-3 bg-primary rounded-full shrink-0" />
                {t("bigThings.bullet4")}
              </li>
            </ul>
          </GridTwoCol>
        </Container>
      </section>

      {/* Ad — Explore Ecosystem */}
      <AdSection
        texts={{
          first: t("ad.first"),
          second: t("ad.second"),
          third: t("ad.third"),
        }}
        imageSrc={CookingPentolo.src}
        imageAlt="Pentolo Event in action"
      />

      {/* Footer */}
      <Footer />
    </main>
  )
}
