# dopejs homepage

The website for [dopejs](https://github.com/dopejs) — a static, bilingual (English / 中文) landing
page listing the organization's open source projects.

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

## Content

All project copy lives in [`src/data/projects.ts`](src/data/projects.ts), one entry per repository
with `en` / `zh` strings side by side. UI chrome (nav, headings, buttons) lives in
[`src/i18n/ui.ts`](src/i18n/ui.ts). Adding a project means adding one object; adding a language means
adding a key to `ui`, a locale to `astro.config.mjs`, and a page under `src/pages/<lang>/`.

Status labels (`stable` / `active` / `early` / `design`) are deliberately conservative — they should
reflect what a reader can rely on today, not what the project aims to be. Keep them in sync when a
repository's README changes.

## Deploy

Pushing to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds
and publishes to GitHub Pages. Enable it once in **Settings → Pages → Build and deployment →
Source: GitHub Actions**.

The site is served from `https://dopejs.github.io/homepage/`, so the build sets `base: /homepage`.
Both values come from environment variables:

| Variable    | Default                     | Purpose                            |
| ----------- | --------------------------- | ---------------------------------- |
| `SITE`      | `https://dopejs.github.io`  | Absolute URL used for canonical/OG |
| `BASE_PATH` | `/homepage`                 | Path prefix for all internal links |

To move to a custom domain: set `SITE` to the domain and `BASE_PATH` to `/` in the workflow, add a
`public/CNAME` file containing the domain, update the sitemap URL in `public/robots.txt`, and
configure the domain under **Settings → Pages**.

## Structure

```
src/
  components/   Header, Footer, Home (shared page body), ProjectCard
  data/         projects.ts (project registry), site.ts (org/repo URLs)
  i18n/         ui.ts (strings), utils.ts (locale detection, base-aware paths)
  layouts/      Base.astro (head, hreflang, OG, skip link)
  pages/        index.astro (en), zh/index.astro (zh)
  styles/       global.css (Tailwind theme + base layer)
```
