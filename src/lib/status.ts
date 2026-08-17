import type { ProjectStatus } from '../data/projects';

/** Badge colouring per status — shared by the project card and the detail page. */
export const statusTone: Record<ProjectStatus, string> = {
  stable: 'border-accent/40 text-accent',
  active: 'border-sky-400/40 text-sky-300',
  early: 'border-amber-400/40 text-amber-300',
  design: 'border-line text-muted',
};

export function statusKey(status: ProjectStatus) {
  return `status.${status}` as const;
}
