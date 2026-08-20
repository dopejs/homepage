import type { Project } from '../data/projects';

interface Props {
  readonly project: Project;
  readonly size?: number;
}

/**
 * Projects that ship a mark use it; the rest get a monogram tile in the site
 * accent, so a card row stays aligned without inventing a brand for them.
 * Marks drawn for dark surfaces would vanish on the light theme, so projects
 * that publish both variants render both and let CSS pick.
 */
export function ProjectLogo({ project, size = 32 }: Props) {
  const style = { width: size, height: size };

  if (project.logo === undefined) {
    return (
      <span
        aria-hidden="true"
        className="grid shrink-0 place-items-center rounded-[7px] bg-accent-solid font-mono font-bold text-accent-on"
        style={{ ...style, fontSize: Math.round(size * 0.5) }}
      >
        {project.name.charAt(0).toUpperCase()}
      </span>
    );
  }

  const image = (file: string, className: string) => (
    <img
      src={`/logos/${file}`}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      className={`shrink-0 rounded-[7px] object-contain ${className}`}
      style={style}
      loading="lazy"
      decoding="async"
    />
  );

  if (project.logoLight === undefined) return image(project.logo, '');
  return (
    <>
      {image(project.logoLight, 'dark:hidden')}
      {image(project.logo, 'hidden dark:block')}
    </>
  );
}
