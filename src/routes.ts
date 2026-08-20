import { projects } from './data/projects';
import type { SiteRoute } from './types';

export const SITE_ROUTES: readonly SiteRoute[] = [
  { path: '/', kind: 'home' },
  ...projects.map((project) => ({
    path: `/projects/${project.slug}/`,
    kind: 'project' as const,
    slug: project.slug,
  })),
];

export function routeForPath(pathname: string): SiteRoute {
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return SITE_ROUTES.find((route) => route.path === normalized) ?? SITE_ROUTES[0]!;
}

/** Neighbours wrap around, so the prev/next footer never dead-ends. */
export function neighbours(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return {
    previous: projects[(index - 1 + projects.length) % projects.length]!,
    next: projects[(index + 1) % projects.length]!,
  };
}
