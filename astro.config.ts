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