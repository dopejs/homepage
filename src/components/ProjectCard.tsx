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
      className="group relative scroll-mt-24 rounded-xl border border-line bg-surface/60 p-6 transition-colors hover:border-accent/30 hover:bg-surface-2/60 sm:p-8"
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="font-mono text-xs text-muted/70" dir="ltr">
          {String(index + 1).padStart(2, '0')}
        </span>
        <ProjectLogo project={project} size={30} />
        <h3 className="font-mono text-xl font-semibold tracking-tight">
          {/* Stretched link: the whole card is the target, inner links stay clickable via z-10. */}
          <a href={href} className="after:absolute after:inset-0 hover:text-accent">
            {project.name}
          </a>
        </h3>
        <span className={`rounded-full border px-2.5 py-0.5 font-mono text-[11px] ${statusTone[project.status]}`}>
          {locale.ui[statusKey(project.status)]}
        </span>
      </div>

      <p className="mt-4 text-lg text-fg/90">{c.tagline}</p>
      <p className="mt-3 max-w-3xl leading-relaxed text-muted">{c.summary}</p>

      {primaryCommand !== undefined && (
        <div className="relative z-10 mt-5">
          <CommandBlock locale={locale} command={primaryCommand.command} />
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
        <div className="flex flex-wrap gap-2">
          {project.languages.map((language) => (
            <span key={language} className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-muted">
              {language}
            </span>
          ))}
          {project.license !== null && (
            <span className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-muted">
              {project.license}
            </span>
          )}
        </div>

        <div className="relative z-10 ms-auto flex flex-wrap items-center gap-x-4 gap-y-2">
          {project.homepage !== undefined && (
            <a href={project.homepage} rel="noopener noreferrer" target="_blank" className="text-muted transition-colors hover:text-accent">
              {locale.ui['projects.homepage']} ↗
            </a>
          )}
          <a href={project.repo} rel="noopener noreferrer" target="_blank" className="text-muted transition-colors hover:text-accent">
            {locale.ui['projects.repo']} ↗
          </a>
          <a href={href} className="text-accent hover:underline">
            {locale.ui['projects.details']} <span className="inline-block rtl:-scale-x-100">→</span>
          </a>
        </div>
      </div>
    </article>
  );
}
