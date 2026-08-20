import type { ProjectStatus } from '../data/projects';

/** Badge colouring per status, tuned for both themes. */
export const statusTone: Record<ProjectStatus, string> = {
  stable: 'border-accent/40 text-accent',
  active: 'border-sky-600/40 text-sky-700 dark:border-sky-400/40 dark:text-sky-300',
  early: 'border-amber-600/40 text-amber-700 dark:border-amber-400/40 dark:text-amber-300',
  design: 'border-line text-muted',
};

export function statusKey(status: ProjectStatus) {
  return `status.${status}` as const;
}
