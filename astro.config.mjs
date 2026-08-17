// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages serves this repo on the verified custom domain dopejs.com, so the
// site lives at the root — no path prefix. Both values stay env-overridable:
//   SITE=https://dopejs.github.io BASE_PATH=/homepage pnpm build
const SITE = process.env.SITE ?? 'https://dopejs.com';
const BASE_PATH = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site: SITE,
  base: BASE_PATH,
  trailingSlash: 'ignore',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh', 'zh-tw', 'es', 'fr', 'de', 'ru', 'he', 'ar', 'ja', 'ko'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          zh: 'zh-CN',
          'zh-tw': 'zh-TW',
          es: 'es',
          fr: 'fr',
          de: 'de',
          ru: 'ru',
          he: 'he',
          ar: 'ar',
          ja: 'ja',
          ko: 'ko',
        },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
