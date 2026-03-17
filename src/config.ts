export const siteName = "Pentolo® Event"

export const port = process.env.PORT || 3000
export const origin = process.env.ORIGIN || `http://localhost:${port}`

// Company info
export const company = {
  name: "ADERFIA Srl",
  brandName: "Pentolo®",
  vat: "04761680752",
  address: {
    street: "Via Matteotti, 6",
    zip: "73020",
    city: "Serrano",
    fraction: "Carpignano Salentino",
    province: "LE",
    country: "Italia",
  },
  email: "info@pentolo.com",
  phone: "+39 0422 1740639",
  socials: {
    instagram: "https://www.instagram.com/ilpentolo/",
    facebook: "https://www.facebook.com/il.pentolo/",
    website: "https://www.pentolo.com/",
  },
  privacyPolicy: "https://www.pentolo.com/privacy-policy/",
}
