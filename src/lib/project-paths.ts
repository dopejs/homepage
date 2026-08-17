import type { Project } from '../data/projects';

/**
 * One static route per project, with neighbours wrapped around so the
 * prev/next footer never dead-ends. Shared by both locale routes.
 */
export function buildProjectPaths(projects: Project[]) {
  return projects.map((project, index) => ({
    params: { slug: project.slug },
    props: {
      project,
      prev: projects[(index - 1 + projects.length) % projects.length]!,
      next: projects[(index + 1) % projects.length]!,
    },
  }));
}
