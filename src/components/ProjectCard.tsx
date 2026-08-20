import { ArrowRight, ArrowUpRight } from 'lucide-react';

import { CommandBlock } from './CommandBlock';
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

export function ProjectCard({ locale, project, index }: Props) {
  const c = copy[locale.copyKey]?.[project.slug] ?? copy.en[project.slug]!;
  const href = `/projects/${project.slug}/`;
  // A command on the card reads as "this is how you get it", so only show one a
  // visitor can actually paste; checkout-only commands stay on the detail page.
  const primaryCommand = project.commands?.find((command) => command.kind !== 'dev');

  return (
    <article
      id={project.slug}
      className="group relative scroll-mt-24 rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-line-strong sm:p-8"
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="font-mono text-xs font-semibold text-accent" dir="ltr">
          {String(index + 1).padStart(2, '0')}
        </span>
        <ProjectLogo project={project} size={30} />
        <h3 className="text-xl font-bold tracking-tight">
          {/* Stretched link: the whole card is the target, inner links stay clickable via z-10. */}
          <a href={href} className="after:absolute after:inset-0 hover:text-accent">
            {project.name}
          </a>
        </h3>
        <span className={`rounded-full border px-2.5 py-0.5 font-mono text-[11px] ${statusTone[project.status]}`}>
          {locale.ui[statusKey(project.status)]}
        </span>
      </div>

      <p className="mt-4 text-lg font-medium">{c.tagline}</p>
      <p className="mt-2 max-w-3xl leading-relaxed text-muted">{c.summary}</p>

      {primaryCommand !== undefined && (
        <div className="relative z-10 mt-5">
          <CommandBlock locale={locale} command={primaryCommand.command} file={`${project.slug}.sh`} />
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
        <div className="flex flex-wrap gap-2">
          {project.languages.map((language) => (
            <span key={language} className="rounded-md border border-line px-2 py-0.5 font-mono text-[11px] text-muted">
              {language}
            </span>
          ))}
          {project.license !== null && (
            <span className="rounded-md border border-line px-2 py-0.5 font-mono text-[11px] text-muted">
              {project.license}
            </span>
          )}
        </div>

        <div className="relative z-10 ms-auto flex flex-wrap items-center gap-x-4 gap-y-2">
          {project.homepage !== undefined && (
            <a
              href={project.homepage}
              rel="noopener noreferrer"
              target="_blank"
              className="inline-flex items-center gap-1 text-muted transition-colors hover:text-fg"
            >
              {locale.ui['projects.homepage']}
              <ArrowUpRight size={14} />
            </a>
          )}
          <a
            href={project.repo}
            rel="noopener noreferrer"
            target="_blank"
            className="inline-flex items-center gap-1 text-muted transition-colors hover:text-fg"
          >
            {locale.ui['projects.repo']}
            <ArrowUpRight size={14} />
          </a>
          <a href={href} className="inline-flex items-center gap-1 font-semibold text-accent hover:underline">
            {locale.ui['projects.details']}
            <ArrowRight size={14} className="rtl:-scale-x-100" />
          </a>
        </div>
      </div>
    </article>
  );
}
