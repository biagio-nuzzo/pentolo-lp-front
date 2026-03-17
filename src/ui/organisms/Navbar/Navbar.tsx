// Libraries
import { useTranslations } from "next-intl"
// Components
import { NavigationLink, LanguageDropdown } from "@/ui"

const Navbar = () => {
  const t = useTranslations("Navigation")

  return (
    <div className="bg-white border-b p-2 flex items-center justify-between">
      {/* Logo */}
      <div>Logo</div>

      <div className="flex items-center gap-x-8">
        {/* Nav */}
        <nav className="flex items-center gap-x-4">
          <NavigationLink href="/">{t("home")}</NavigationLink>
        </nav>

        {/* Change Language */}
        <LanguageDropdown />
      </div>
    </div>
  )
}

export default Navbar
