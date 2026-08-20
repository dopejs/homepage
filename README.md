<p align="center">
  <a href="https://dopejs.com">
    <img src="https://dopejs.com/logo-lockup.svg" alt="dopejs" width="420">
  </a>
</p>

# dopejs homepage

The website for [dopejs](https://github.com/dopejs) — a static, multilingual site listing the
organization's projects in 11 languages.

Built with React 19, Vite and Tailwind CSS 4, on the same architecture as the other dopejs sites:
routes are language-neutral and pre-rendered to static HTML, every translation ships in the bundle,
and the visitor's language is resolved on the client from the shared preference.

## Develop

Prerequisites: Node.js 22+, pnpm 10+.

```bash
pnpm install
pnpm dev        # http://localhost:4321/homepage/
pnpm check      # astro check — type/diagnostics gate, must stay at 0 errors
pnpm build      # static output in dist/
pnpm preview
```

`pnpm build` runs the client build, then an SSR build, then renders each route to static HTML with
its route descriptor embedded, and finally writes the sitemap and the legacy locale redirects.

## Content and languages

Structural project metadata (slug, status, languages, license, repo, commands) lives in
[`src/data/projects.ts`](src/data/projects.ts). Translated prose lives per locale in
`src/data/copy/<locale>.ts`, and UI chrome in `src/i18n/ui/<locale>.ts`. English is the canonical
source for both — other locales are translations of it, and TypeScript enforces that every locale
defines every UI key.

Locales live in [`src/locales.ts`](src/locales.ts), keyed by BCP 47 tag: `en` (default), `zh-Hans`,
`zh-Hant`, `es`, `fr`, `de`, `ru`, `he`, `ar`, `ja`, `ko`. Hebrew and Arabic render RTL: `dir` comes
from the registry and the layout uses logical properties (`ms-*`, `text-start`), so no separate
stylesheet is needed. Shell commands stay LTR everywhere.

## Language preference

There are no per-language URLs. [`src/language-preference.ts`](src/language-preference.ts) resolves
the language from `localStorage["dopejs.locale"]`, then the `dopejs_locale` cookie, then
`navigator.languages`. Choosing a language writes both, and the cookie is set on `Domain=dopejs.com`,
so the choice follows the visitor across dopejs.com, kura.dopejs.com, pingo.dopejs.com and the rest.
The file is a port of the one in the Pingo site; the cookie name, storage key and BCP 47 values are
the shared contract between the sites, so change them everywhere at once or not at all.

The trade-off is deliberate and worth knowing: without JavaScript, or for a crawler, every route
serves its default-locale HTML, and there are no hreflang alternates to index. The previous
per-language URLs (`/zh/`, `/ja/projects/kura/`, …) now redirect to their language-neutral route.

> **Translations are machine-generated and have not been reviewed by native speakers.** The footer
> says so on every page. Replacing any locale file with a reviewed translation is a drop-in change —
> no code touches needed.

Adding a language: add an entry to [`src/i18n/config.ts`](src/i18n/config.ts), a UI file under
`src/i18n/ui/`, a copy file under `src/data/copy/`, register both in the respective `index.ts`, and
add the locale to `astro.config.mjs`. Routes, hreflang, the sitemap and the language menu are all
derived from the registry.

Adding a project: one object in `src/data/projects.ts` plus one entry per locale copy file.

Status labels (`stable` / `active` / `early` / `design`) are deliberately conservative — they should
reflect what a reader can rely on today, not what the project aims to be. Keep them in sync when a
repository's README changes.

## Deploy

Pushing to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds
and publishes to GitHub Pages (Settings → Pages → Source: GitHub Actions).

The site is served from the custom domain **https://dopejs.com**, so it lives at the root and needs
no path prefix. Configuration comes from environment variables set in the workflow:

| Variable    | Value in CI          | Purpose                            |
| ----------- | -------------------- | ---------------------------------- |
| `SITE`      | `https://dopejs.com` | Absolute URL used for canonical/OG |
| `BASE_PATH` | `/`                  | Path prefix for all internal links |

[`public/CNAME`](public/CNAME) pins the domain so an Actions deploy cannot reset it. If the site ever
moves back to `dopejs.github.io/homepage/`, set `SITE=https://dopejs.github.io` and
`BASE_PATH=/homepage`, delete `public/CNAME`, and update the sitemap URL in `public/robots.txt`.

## Structure

```
src/
  App.tsx              route + locale state, header/footer shell
  main.tsx             client entry: resolves the language, hydrates or renders
  ssr.tsx              server entry: render(route) and metaForRoute(route)
  routes.ts            the six language-neutral routes, and prev/next neighbours
  locales.ts           locale registry (path, lang, dir, label, ui strings)
  language-preference.ts   shared localStorage + cross-subdomain cookie
  components/          Header, Footer, LanguageMenu, Home, ProjectCard, ProjectDetail, ...
  data/                projects.ts (metadata), site.ts (URLs), copy/<locale>.ts (prose)
  i18n/ui/<locale>.ts  interface strings
  styles.css           Tailwind theme + base layer
scripts/build-site.mjs  static build: client, SSR, HTML per route, sitemap, redirects
```
