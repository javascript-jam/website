interface SiteConfig {
  canonicalURL: string
  title: string
  description?: string
  author?: string
  lang?: string
  ogLocale?: string
  ogImage?: string
  datePublished?: string | undefined
  // date?: {
  //   locale: string | string[] | undefined
  //   options: Intl.DateTimeFormatOptions
  // }
}

const JSJAM_AUTHOR = "https://raw.githubusercontent.com/ajcwebdev/ajcwebdev/main/assets/Headshot-crop.jpg"
const JSJAM_CANONICAL_URL = "https://javascriptjam.com"
const JSJAM_TITLE = "JavaScript Jam by Edgio"
const JSJAM_DESCRIPTION = "JavaScript Jam is a podcast, newsletter, and weekly Twitter Space for frontend and fullstack JavaScript developers. Presented by Edgio."
const JSJAM_LANG = "en-US"
const JSJAM_OG_LOCALE = "en_US"
const JSJAM_OG_IMAGE = "https://www.javascriptjam.com/content/images/2023/05/1200-630-jsjam-by-edgio-banner-facebook.png"
// const JSJAM_DATE = {
// 	locale: "en-US",
// 	options: {
// 		day: "numeric",
// 		month: "numeric",
// 		year: "numeric",
// 	},
// }

export const siteConfig: SiteConfig = {
  author: JSJAM_AUTHOR,               // Use for meta property (components/BaseHead.astro L:31 + L:49) and generated satori png (pages/og-image/[slug].png.ts)
  canonicalURL: JSJAM_CANONICAL_URL,  // Meta property for constructing meta title property in components/BaseHead.astro L:11
  title: JSJAM_TITLE,                 // Meta property used as a default canonical URL meta property
  description: JSJAM_DESCRIPTION,     // Meta property used as a default description meta property
  lang: JSJAM_LANG,                   // HTML lang property in layouts/BasePage.astro L:18
  ogLocale: JSJAM_OG_LOCALE,          // Meta property in components/BaseHead.astro L:42
  ogImage: JSJAM_OG_IMAGE,            // Date.prototype.toLocaleDateString() parameters, found in utils/date.ts.
  // date: JSJAM_DATE,
}