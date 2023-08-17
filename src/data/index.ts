export type SiteMeta = {
  canonicalURL: string
  title: string
  description?: string
  ogImage?: string | undefined
  datePublished: string | undefined
}

export interface SiteConfig {
  canonicalURL: string
  title: string
  description?: string
  author?: string
  lang?: string
  ogLocale?: string
  ogImage?: string
  datePublished?: string | undefined
  date?: {
    locale: string | string[] | undefined
    options: Intl.DateTimeFormatOptions
  }
}

export const siteConfig: SiteConfig = {
	// Used as both a meta property (src/components/BaseHead.astro L:31 + L:49) & the generated satori png (src/pages/og-image/[slug].png.ts)
	author: "https://raw.githubusercontent.com/ajcwebdev/ajcwebdev/main/assets/Headshot-crop.jpg",
	
	// Meta property used to construct the meta title property, found in src/components/BaseHead.astro L:11
	canonicalURL: "https://javascriptjam.com",
	
	// Meta property used as a default canonical URL meta property
	title: "JavaScript Jam by Edgio",
	
	// Meta property used as a default description meta property
	description: "The podcast, newsletter, and community for frontend and full-stack developers. Presented by Edgio.",
	// description: "JavaScript Jam is a podcast, newsletter, and weekly Twitter Space for frontend and fullstack JavaScript developers. Presented by Edgio.",

	// HTML lang property, found in src/layouts/BasePage.astro L:18
	lang: "en-US",

	// Meta property, found in src/components/BaseHead.astro L:42
	ogLocale: "en_US",

	// Date.prototype.toLocaleDateString() parameters, found in src/utils/date.ts.
	ogImage: "https://www.javascriptjam.com/content/images/2023/05/1200-630-jsjam-by-edgio-banner-facebook.png",

	date: {
		locale: "en-US",
		options: {
			day: "numeric",
			month: "short",
			year: "numeric",
		},
	},
}