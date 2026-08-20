import { execFile } from 'node:child_process';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { promisify } from 'node:util';

const run = promisify(execFile);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'dist');
const serverOutput = path.join(root, '.ssr');

const SITE = process.env.SITE ?? 'https://dopejs.com';

function escapeAttribute(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
}

function embeddedJson(value) {
  return JSON.stringify(value).replaceAll('<', '\\u003c').replaceAll('-->', '--\\u003e');
}

function outputPathForRoute(route) {
  return route === '/' ? 'index.html' : `${route.replace(/^\/|\/$/gu, '')}/index.html`;
}

await rm(output, { recursive: true, force: true });
await rm(serverOutput, { recursive: true, force: true });

try {
  await run('pnpm', ['exec', 'vite', 'build'], { cwd: root });
  await run(
    'pnpm',
    ['exec', 'vite', 'build', '--ssr', 'src/ssr.tsx', '--outDir', '.ssr', '--emptyOutDir'],
    { cwd: root },
  );

  const [{ render, metaForRoute, SITE_ROUTES }, template] = await Promise.all([
    import(pathToFileURL(path.join(serverOutput, 'ssr.js')).href),
    readFile(path.join(output, 'index.html'), 'utf8'),
  ]);

  for (const route of SITE_ROUTES) {
    const rendered = render(route);
    const { title, description } = metaForRoute(route);
    const canonical = `${SITE}${route.path}`;
    const html = template
      .replace('<title>dopejs</title>', `<title>${escapeAttribute(title)}</title>`)
      .replace(
        /<meta name="description" content="[^"]*" \/?>/u,
        `<meta name="description" content="${escapeAttribute(description)}">`,
      )
      .replace('</head>', `  <link rel="canonical" href="${canonical}" />\n  </head>`)
      .replace(
        '<div id="root"></div>',
        `<div id="root">${rendered}</div><script id="dopejs-route" type="application/json">${embeddedJson(route)}</script>`,
      );
    const target = path.join(output, outputPathForRoute(route.path));
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, html);
  }

  // The previous site had a URL per language. Those are gone now that the
  // language lives in the shared preference, so each one redirects to its
  // language-neutral route instead of 404ing.
  const LEGACY_LOCALES = ['zh', 'zh-tw', 'es', 'fr', 'de', 'ru', 'he', 'ar', 'ja', 'ko'];
  for (const locale of LEGACY_LOCALES) {
    for (const route of SITE_ROUTES) {
      const target = `${route.path}`;
      const legacy = route.path === '/' ? `/${locale}/` : `/${locale}${route.path}`;
      const file = path.join(output, `${legacy.replace(/^\/|\/$/gu, '')}/index.html`);
      await mkdir(path.dirname(file), { recursive: true });
      await writeFile(
        file,
        `<!doctype html>\n<html lang="en"><head><meta charset="utf-8">\n<link rel="canonical" href="${SITE}${target}">\n<meta http-equiv="refresh" content="0; url=${target}">\n<title>Redirecting…</title>\n<script>location.replace(${JSON.stringify(target)} + location.hash);</script>\n</head><body><a href="${target}">${SITE}${target}</a></body></html>\n`,
      );
    }
  }

  const urls = SITE_ROUTES.map(
    (route) => `  <url><loc>${SITE}${route.path}</loc></url>`,
  ).join('\n');
  await writeFile(
    path.join(output, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  );

  process.stdout.write(
    `site built: ${String(SITE_ROUTES.length)} static routes, ${String(SITE_ROUTES.length * LEGACY_LOCALES.length)} legacy redirects\n`,
  );
} finally {
  await rm(serverOutput, { recursive: true, force: true });
}
