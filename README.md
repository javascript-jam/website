# website

The JavaScript Jam website built with Astro and deployed on Edgio

The new and improved [JavaScript Jam](https://www.javascriptjam.com/) website built with Astro and deployed on Edgio 🚀

## Outline

- [Sitemap](#sitemap)
- [Configuration](#configuration)
  - [Astro Configuration](#astro-configuration)
  - [Site Configuration](#site-configuration)
  - [Site Meta](#site-meta)
- [Layout](#layout)
  - [Base Layout](#base-layout)
  - [Base Head Component](#base-head-component)

## Sitemap

```
.
├── LICENSE
├── README.md
├── astro.config.ts
├── package.json
├── tsconfig.json
└── src
    ├── components
    │   ├── BaseHead.astro
    │   ├── Footer.astro
    │   ├── NavBar.astro
    │   └── Subscribe.astro
    ├── data
    │   └── siteMeta.ts
    ├── env.d.ts
    ├── layouts
    │   └── Base.astro
    └── pages
        ├── about.astro
        ├── composability.astro
        ├── index.astro
        ├── newsletter.astro
        └── videos.astro
```

## Configuration

### Astro Configuration

<details>
  <summary>Click to see <code>astro.config.ts</code> code:</summary>

```ts
// astro.config.ts

import { defineConfig, sharpImageService } from "astro/config"
import sitemap from "@astrojs/sitemap"
import prefetch from "@astrojs/prefetch"
import remarkUnwrapImages from "remark-unwrap-images"

export default defineConfig({
	site: "https://javascriptjam.com/",
	markdown: {
		remarkPlugins: [remarkUnwrapImages],
		shikiConfig: {
			theme: "dracula",
      wrap: true,
		},
	},
	experimental: {
		assets: true,
	},
	image: {
		service: sharpImageService(),
	},
	integrations: [
		sitemap(),
		prefetch(),
	],
	compressHTML: true,
	vite: {
		optimizeDeps: {
			exclude: ["@resvg/resvg-js"],
		},
	},
})
```

</details>

### Site Metadata

<details>
  <summary>Click to see <code>src/data/siteMeta.ts</code> code:</summary>

```ts
// src/data/siteMeta.ts

interface SiteConfig {
	author: string
	canonicalURL: string
	title: string
	description: string
	lang: string
	ogLocale: string
	ogImage: string
	date: {
		locale: string | string[] | undefined
		options: Intl.DateTimeFormatOptions
	}
}

export const siteConfig: SiteConfig = {
	author: "https://raw.githubusercontent.com/ajcwebdev/ajcwebdev/main/assets/Headshot-crop.jpg",
	canonicalURL: "https://javascriptjam.com",
	title: "JavaScript Jam by Edgio",
	description: "The podcast, newsletter, and community for frontend and full-stack developers. Presented by Edgio.",
	lang: "en-US",
	ogLocale: "en_US",
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
```
</details>

### Site Meta

<details>
  <summary>Click to see <code>src/data/siteMeta.ts</code> code:</summary>

```ts
// src/data/siteMeta.ts

type SiteMeta = {
	canonicalURL: string
	title: string
	description?: string
	ogImage?: string | undefined
	datePublished: string | undefined
}

export type { SiteMeta }
```

</details>

## Layout

### Base Layout

<details>
  <summary>Click to see <code>src/layouts/Base.astro</code> code:</summary>

```astro
---
// src/layouts/Base.astro

import type { SiteMeta } from "@/data/siteMeta"
import BaseHead from "@/components/BaseHead"
import NavBar from "@/components/NavBar"
import Footer from "@/components/Footer"
import Subscribe from "@/components/Subscribe"
import { siteConfig } from "@/data/siteMeta"

interface Props {
	meta: SiteMeta
}

const {
	meta: {
    canonicalURL,
    title,
    description = siteConfig.description,
    ogImage,
    datePublished
  },
} = Astro.props
---

<html lang={siteConfig.lang}>
	<head>
		<BaseHead
      canonicalURL={canonicalURL}
      title={title}
      description={description}
      ogImage={ogImage}
      datePublished={datePublished}
    />
	</head>
	<body>
    <NavBar />
		<main>
			<slot />
		</main>
    <Subscribe />
    <Footer />
	</body>
</html>
```

</details>

<details>
  <summary>Click to see <code></code> code:</summary>
  
</details>

### Base Head Component

<details>
  <summary>Click to see <code>src/components/BaseHead.astro</code> code:</summary>
  
</details>

```astro
---
// src/components/BaseHead.astro

import type { SiteMeta } from "@/data/siteMeta"
import { siteConfig } from "@/data/siteMeta"

type Props = SiteMeta

const {
	canonicalURL, title, description, ogImage, datePublished
} = Astro.props

const titleSeparator = "•"
const siteTitle = `${title} ${titleSeparator} ${siteConfig.title}`
const socialImageURL = new URL(ogImage ? ogImage : "/social-card.png", Astro.url).href
---

<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />

<link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="icon" href="/icon.svg" type="image/svg+xml" />
<link rel="manifest" href="/manifest.webmanifest" />
<link rel="canonical" href={canonicalURL} />

<title>{siteTitle}</title>

<meta name="title" content={siteTitle} />
<meta name="description" content={description} />
<meta name="author" content={siteConfig.author} />

<meta property="og:type" content={datePublished ? "article" : "website"} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:url" content={canonicalURL} />
<meta property="og:site_name" content={siteConfig.title} />
<meta property="og:locale" content={siteConfig.ogLocale} />
<meta property="og:image" content={socialImageURL} />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
{
	datePublished && (
		<>
			<meta property="article:author" content={siteConfig.author} />
			<meta property="article:published_time" content={datePublished} />
		</>
	)
}

<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content={canonicalURL} />
<meta property="twitter:title" content={title} />
<meta property="twitter:description" content={description} />
<meta property="twitter:image" content={socialImageURL} />

<link rel="alternate" type="application/rss+xml" title={siteConfig.title} href="/rss.xml" />
```