import { projects } from '../data/projects';

/** Orbit rings with the projects as satellites, echoing the other dopejs sites. */
export function HeroVisual() {
  const satellites = projects.slice(0, 4).map((project) => project.name);

  return (
    <div className="relative mx-auto hidden aspect-square w-full max-w-[360px] lg:block" aria-hidden="true">
      <span className="absolute inset-0 rounded-full border border-line" />
      <span className="absolute inset-[13%] rounded-full border border-line" />
      <span className="absolute inset-[26%] rounded-full border border-dashed border-line" />
      <span className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle_at_50%_45%,var(--color-accent-dim),transparent_65%)]" />

      <div className="absolute top-1/2 left-1/2 grid size-[104px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-3xl border border-line bg-surface shadow-lg shadow-black/5">
        <img src="/logo.svg" alt="" width={64} height={64} className="rounded-xl" />
      </div>

      {satellites.map((name, index) => {
        const position = [
          'top-[6%] left-1/2 -translate-x-1/2',
          'top-1/2 right-[2%] -translate-y-1/2',
          'bottom-[6%] left-1/2 -translate-x-1/2',
          'top-1/2 left-[2%] -translate-y-1/2',
        ][index];
        return (
          <span
            key={name}
            className={`absolute ${position} rounded-full border border-line bg-surface px-2.5 py-1 font-mono text-[0.68rem] tracking-wide text-muted shadow-sm shadow-black/5`}
          >
            {name}
          </span>
        );
      })}
    </div>
  );
}
