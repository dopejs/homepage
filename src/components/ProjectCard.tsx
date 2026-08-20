import { ArrowRight } from 'lucide-react';

import { ProjectLogo } from './ProjectLogo';
import { copy } from '../data/copy';
import type { Project } from '../data/projects';
import { statusKey, statusTone } from '../lib/status';
import type { SiteLocale } from '../locales';

interface Props {
  readonly locale: SiteLocale;
  readonly project: Project;
  readonly index: number;
}

/**
 * One cell of the projects grid. Install commands live on the detail page: a
 * `curl … | sh` line cannot wrap inside a grid cell without either overflowing
 * or shrinking every other column.
 */
export function ProjectCard({ locale, project, index }: Props) {
  const c = copy[locale.copyKey]?.[project.slug] ?? copy.en[project.slug]!;

  return (
    <a
      id={project.slug}
      href={`/projects/${project.slug}/`}
      className="group flex scroll-mt-24 flex-col gap-4 border-line bg-surface p-6 transition-colors hover:bg-surface-2 sm:p-7"
    >
      <div className="flex items-start justify-between gap-3">
        <ProjectLogo project={project} size={52} />
        <span className="mono-label pt-1 text-accent">{String(index + 1).padStart(2, '0')}</span>
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <h3 className="text-xl font-bold tracking-tight group-hover:text-accent">{project.name}</h3>
        <span className={`rounded-full border px-2 py-0.5 font-mono text-[10px] ${statusTone[project.status]}`}>
          {locale.ui[statusKey(project.status)]}
        </span>
      </div>

      <p className="text-[0.95rem] leading-relaxed text-muted">{c.tagline}</p>

      <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 pt-2 text-sm">
        <span className="flex flex-wrap items-center gap-1.5" dir="ltr">
          {project.languages.map((language) => (
            <span
              key={language}
              className="rounded-md border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted"
            >
              {language}
            </span>
          ))}
          {project.license !== null && (
            <span className="rounded-md border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted">
              {project.license}
            </span>
          )}
        </span>
        <span className="ms-auto inline-flex items-center gap-1 font-semibold text-accent">
          {locale.ui['projects.details']}
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" />
        </span>
      </div>
    </a>
  );
}
