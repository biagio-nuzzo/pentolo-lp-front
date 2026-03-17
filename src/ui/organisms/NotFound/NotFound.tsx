"use client"

// Libraries
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
// Config
import { Link } from "@/i18n/navigation"

const NotFoundPage = () => {
  const t = useTranslations("NotFound")

  return (
    <main className="min-h-dvh bg-black flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        className="flex flex-col items-center gap-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.44, 0, 0.56, 1] }}
      >
        <span className="text-[clamp(8rem,25vw,18rem)] font-black leading-none tracking-tighter text-primary select-none">
          404
        </span>

        <h1 className="text-white text-3xl md:text-4xl font-bold uppercase tracking-wide">
          {t("title")}
        </h1>

        <p className="text-white/60 text-base md:text-lg max-w-md leading-relaxed">
          {t("description")}
        </p>

        <Link
          href="/"
          className="mt-4 inline-block bg-primary text-black font-bold uppercase tracking-widest px-8 py-4 text-sm hover:bg-white transition-colors duration-200"
        >
          {t("cta")}
        </Link>
      </motion.div>
    </main>
  )
}

export default NotFoundPage
