import type { Project } from '../data/projects';

interface Props {
  readonly project: Project;
  readonly size?: number;
}

/**
 * Projects that ship a mark use it; the rest get a monogram tile in the site
 * accent, so a card row stays aligned without inventing a brand for them.
 */
export function ProjectLogo({ project, size = 32 }: Props) {
  if (project.logo !== undefined) {
    return (
      <img
        src={`/logos/${project.logo}`}
        alt=""
        aria-hidden="true"
        width={size}
        height={size}
        className="shrink-0 rounded-[7px] object-contain"
        style={{ width: size, height: size }}
        loading="lazy"
        decoding="async"
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className="grid shrink-0 place-items-center rounded-[7px] bg-accent/90 font-mono font-bold text-ink"
      style={{ width: size, height: size, fontSize: Math.round(size * 0.5) }}
    >
      {project.name.charAt(0).toUpperCase()}
    </span>
  );
}
