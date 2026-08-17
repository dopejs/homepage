// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages for `dopejs/homepage` serves at https://dopejs.github.io/homepage/.
// Both values are env-overridable so a custom domain only needs:
//   SITE=https://dopejs.dev BASE_PATH=/ pnpm build
const SITE = process.env.SITE ?? 'https://dopejs.github.io';
const BASE_PATH = process.env.BASE_PATH ?? '/homepage';

export default defineConfig({
  site: SITE,
  base: BASE_PATH,
  trailingSlash: 'ignore',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [sitemap({ i18n: { defaultLocale: 'en', locales: { en: 'en', zh: 'zh-CN' } } })],
  vite: {
    plugins: [tailwindcss()],
  },
});
