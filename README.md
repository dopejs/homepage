<p align="center">
  <a href="https://dopejs.com">
    <img src="https://dopejs.com/logo-lockup.svg" alt="dopejs" width="420">
  </a>
</p>

# dopejs homepage

The website for [dopejs](https://github.com/dopejs) — a static, multilingual site listing the
organization's projects in 11 languages.

Built with [Astro](https://astro.build) 7 and Tailwind CSS 4. No client framework; the only client
JavaScript is a small copy-to-clipboard handler that degrades gracefully.

## Develop

Prerequisites: Node.js 22+, pnpm 10+.

```bash
pnpm install
pnpm dev        # http://localhost:4321/homepage/
pnpm check      # astro check — type/diagnostics gate, must stay at 0 errors
pnpm build      # static output in dist/
pnpm preview
```

> `astro check` requires TypeScript 6.x. TypeScript 7's native compiler does not yet expose the
> programmatic API the Astro language server uses, so the dependency is pinned to `^6` on purpose.

## Content and languages

Structural project metadata (slug, status, languages, license, repo, commands) lives in
[`src/data/projects.ts`](src/data/projects.ts). Translated prose lives per locale in
`src/data/copy/<locale>.ts`, and UI chrome in `src/i18n/ui/<locale>.ts`. English is the canonical
source for both — other locales are translations of it, and TypeScript enforces that every locale
defines every UI key.

Locales: `en` (root), `zh`, `zh-tw`, `es`, `fr`, `de`, `ru`, `he`, `ar`, `ja`, `ko`. Hebrew and
Arabic render RTL: `dir` comes from the locale registry and the layout uses logical properties
(`ms-*`, `text-start`), so no separate stylesheet is needed. Shell commands stay LTR everywhere.

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
  components/   Header, Footer, LanguageMenu, Home, ProjectCard, ProjectDetail, CommandBlock
  data/         projects.ts (metadata), site.ts (org/repo URLs), copy/<locale>.ts (prose)
  i18n/         config.ts (locale registry), ui/<locale>.ts (strings), utils.ts (paths, lookup)
  layouts/      Base.astro (head, dir, hreflang, OG, skip link)
  lib/          status.ts (badge tones), project-paths.ts (static paths + prev/next)
  pages/        index.astro + projects/[slug].astro (en), [lang]/… (every other locale)
  styles/       global.css (Tailwind theme + base layer)
```
