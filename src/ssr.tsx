import { renderToString } from 'react-dom/server';

import { App } from './App';
import { copy } from './data/copy';
import { getProject } from './data/projects';
import { ui } from './i18n/ui';
import { SITE_ROUTES } from './routes';
import type { SiteRoute } from './types';

export { SITE_ROUTES };

/** Renders one route in the default locale for the static HTML. */
export function render(route: SiteRoute): string {
  return renderToString(<App route={route} initialLocalePath="" />);
}

/**
 * Head metadata, in the default locale: routes are language-neutral and the
 * visitor's language is applied on the client from the shared preference.
 */
export function metaForRoute(route: SiteRoute): { title: string; description: string } {
  if (route.kind === 'home' || route.slug === undefined) {
    return { title: ui.en['site.title'], description: ui.en['site.description'] };
  }
  const project = getProject(route.slug);
  const text = copy.en[route.slug];
  return {
    title: `${project?.name ?? route.slug} — dopejs`,
    description: text?.tagline ?? ui.en['site.description'],
  };
}
