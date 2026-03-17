import Link from "next/link"
import Image from "next/image"
// Components
import { Container, LanguageSwitcher } from "@/ui"
// Assets
import { InstagramIcon, FacebookIcon, WebsiteIcon } from "@/assets/icons"
// Config
import { company } from "@/config"

const Footer = () => {
  return (
    <footer className="bg-black text-white rounded-t-[42px] pt-16 pb-8 px-8 md:px-16">
      <Container>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10 md:gap-5 mb-10">
          {/* Brand */}
          <div className="shrink-0">
            <Image
              src="/logo-extended-decoration.png"
              alt="Pentolo Event Logo"
              width={240}
              height={125}
              className="w-42 md:w-60 h-auto shrink-0"
            />
          </div>

          {/* Info + Contact */}
          <div className="flex flex-col sm:flex-row gap-10 sm:gap-16 md:gap-20">
            {/* Company info */}
            <div className="space-y-3">
              <p className="text-white">{company.name}</p>
              <p className="text-white/80 text-sm leading-relaxed">
                {company.address.street}
                <br />
                {company.address.zip} {company.address.city} (fraz. di{" "}
                {company.address.fraction}) – {company.address.province}
              </p>
              <p className="text-white/80 text-sm">PI {company.vat}</p>
            </div>

            {/* Contact */}
            <div className="space-y-3">
              <p className="text-white/50 text-xs uppercase tracking-wider">
                Contattaci
              </p>
              <a
                href={`mailto:${company.email}`}
                className="block text-white hover:text-primary transition-colors"
              >
                {company.email}
              </a>
              <a
                href={`tel:${company.phone.replace(/\s/g, "")}`}
                className="block text-white hover:text-primary transition-colors"
              >
                {company.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-6 md:mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Copyright + Privacy */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-6">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} {company.brandName}. All rights
              reserved
            </p>
            <Link
              href={company.privacyPolicy}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 text-sm hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
          </div>

          {/* Language + Social icons */}
          <div className="flex items-center gap-6">
            <LanguageSwitcher />
            <div className="w-px h-4 bg-white/20" />
            <div className="flex items-center gap-4">
              <a
                href={company.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white/50 hover:text-white transition-colors"
              >
                <InstagramIcon />
              </a>
              <a
                href={company.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-white/50 hover:text-white transition-colors"
              >
                <FacebookIcon />
              </a>
              <a
                href={company.socials.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Website"
                className="text-white/50 hover:text-white transition-colors"
              >
                <WebsiteIcon />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
