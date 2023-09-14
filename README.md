# website

The JavaScript Jam website built with Astro and deployed on Edgio

The new and improved [JavaScript Jam](https://www.javascriptjam.com/) website built with Astro and deployed on Edgio 🚀

## Outline

- [Sitemap](#sitemap)
  - [Local Development](#local-development)
  - [Deploy](#deploy)
- [Configuration](#configuration)
  - [Astro Configuration](#astro-configuration)
  - [Site Configuration](#site-configuration)
  - [Site Meta](#site-meta)
- [Layout](#layout)
  - [Base Layout](#base-layout)
  - [Base Head Component](#base-head-component)
- [Resources](#resources)
  - [Other Astro Examples](#other-astro-examples)

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
    │   ├── Topics.astro
    │   ├── NavBar.astro
    │   └── Subscribe.astro
    ├── data
    │   └── index.ts
    ├── env.d.ts
    ├── layouts
    │   └── BasePage.astro
    ├── pages
    │   ├── about.astro
    │   ├── composability.astro
    │   ├── index.astro
    │   ├── newsletter.astro
    │   ├── testimonials.astro
    │   └── videos.astro
    └── styles
        └── global.css
```

### Local Development

```bash
npm i
npm run dev
```

Open [localhost:3000](http://localhost:3000).

## Configuration

### Astro Configuration

<details>
  <summary>Click to see <code>astro.config.ts</code> code:</summary>

```ts
// astro.config.mjs

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
// src/data/index.ts

interface SiteConfig {
  canonicalURL: string
  title: string
  description?: string
  author?: string
  lang?: string
  ogLocale?: string
  ogImage?: string | undefined
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
```

</details>

## Layout

### Base Layout

<details>
  <summary>Click to see <code>src/layouts/BasePage.astro</code> code:</summary>

```astro
---
// src/layouts/BasePage.astro

import BaseHead from "@/components/BaseHead"
import NavBar from "@/components/NavBar"
import Footer from "@/components/Footer"
import type { SiteConfig } from "@/data"
import { siteConfig } from "@/data"

type Props = {
  meta: SiteConfig
}

const {
  meta: {
    canonicalURL, title, description, ogImage, datePublished
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

  <body class="home-template">
    <NavBar />
    <main>
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

</details>

### Base Head Component

<details>
  <summary>Click to see <code>src/components/BaseHead.astro</code> code:</summary>

```astro
---
// src/components/BaseHead.astro

import { siteConfig } from "@/data"

const {
  canonicalURL, title, description, ogImage, datePublished
} = Astro.props

const siteTitle = `${title} "•" ${siteConfig.title}`
const socialImageURL = new URL(ogImage ? ogImage : "/social-card.png", Astro.url).href
---

<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />

<!-- Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-PTJ6FXEPPC"></script>
<link href="https://www.javascriptjam.com/webmentions/receive/" rel="webmention">

<!-- Styling -->
<link rel="stylesheet" type="text/css" href="/styles/global.css">
<link rel="stylesheet" href="https://www.javascriptjam.com/assets/css/styles.css?v=ddffdea251">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tocbot/4.10.0/tocbot.css" />
<link rel="stylesheet" href="https://www.javascriptjam.com/assets/css/lite-yt-embed.css?v=ddffdea251" />
<style>
  :root {
    --color-light-bg: #F8FAFC;
    --home-slant-height: 50rem;
  }
</style>

<link rel="icon" href="https://www.javascriptjam.com/content/images/size/w256h256/2022/12/606218911befc219510548a5_Group-prdgoddib2bq9zz774x1gaf1ueywnogxq9fm05jabk-1.png" type="image/png">
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

</details>

## Resources

### Other Astro Examples

- [Astro Paper](https://github.com/satnaing/astro-paper)
- [Astro Theme Cactus](https://github.com/chrismwilliams/astro-theme-cactus)
- [Astro Sendit](https://github.com/CloudCannon/sendit-astro-template)
