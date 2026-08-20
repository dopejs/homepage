import { CommandBlock } from './CommandBlock';
import { ProjectLogo } from './ProjectLogo';
import { copy } from '../data/copy';
import type { Project } from '../data/projects';
import { statusKey, statusTone } from '../lib/status';
import { displayFont, type SiteLocale } from '../locales';

interface Props {
  readonly locale: SiteLocale;
  readonly project: Project;
  readonly previous: Project;
  readonly next: Project;
}

export function ProjectDetail({ locale, project, previous, next }: Props) {
  const c = copy[locale.copyKey]?.[project.slug] ?? copy.en[project.slug]!;
  const display = displayFont(locale);
  const commands = (project.commands ?? []).map((entry, index) => ({
    ...entry,
    label: c.commandLabels?.[index],
  }));

  return (
    <article className="wrap pt-12 pb-8 sm:pt-16">
      <a href="/#projects" className="mono-label transition-colors hover:text-accent">
        <span className="inline-block rtl:-scale-x-100">←</span> {locale.ui['project.back']}
      </a>

      <header className="mt-6 border-b border-line pb-10">
        <div className="flex flex-wrap items-center gap-3">
          <ProjectLogo project={project} size={44} />
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl" dir="ltr">
            {project.name}
          </h1>
          <span className={`rounded-full border px-2.5 py-0.5 font-mono text-xs ${statusTone[project.status]}`}>
            {locale.ui[statusKey(project.status)]}
          </span>
        </div>
        <p className={`mt-5 max-w-3xl text-xl leading-snug text-fg ${display}`}>{c.tagline}</p>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted">{c.summary}</p>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <a
            href={project.repo}
            rel="noopener noreferrer"
            target="_blank"
            className={`rounded-lg bg-accent-solid px-5 py-2.5 text-sm font-semibold text-accent-on transition-opacity hover:opacity-90 ${display}`}
          >
            {locale.ui['projects.repo']} ↗
          </a>
          {project.homepage !== undefined && (
            <a
              href={project.homepage}
              rel="noopener noreferrer"
              target="_blank"
              className={`rounded-xl border border-line bg-surface px-5 py-2.5 text-sm font-semibold transition-colors hover:border-line-strong ${display}`}
            >
              {locale.ui['projects.homepage']} ↗
            </a>
          )}
        </div>
      </header>

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-14">
        <div className="min-w-0">
          <section>
            <h2 className={`text-xl font-semibold tracking-tight ${display}`}>{locale.ui['project.overview']}</h2>
            <div className="mt-4 space-y-4">
              {c.body.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <h2 className={`text-xl font-semibold tracking-tight ${display}`}>{locale.ui['project.highlights']}</h2>
            <ul className="mt-4 space-y-3">
              {c.highlights.map((item) => (
                <li key={item.slice(0, 32)} className="flex gap-3 leading-relaxed text-muted">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {(commands.length > 0 || c.requirements !== undefined) && (
            <section className="mt-12">
              <h2 className={`text-xl font-semibold tracking-tight ${display}`}>{locale.ui['project.getStarted']}</h2>
              {c.requirements !== undefined && (
                <p className="mt-4 leading-relaxed text-muted">
                  <span className="text-fg">{locale.ui['project.requirements']}: </span>
                  {c.requirements}
                </p>
              )}
              {commands.length > 0 && (
                <div className="mt-5 space-y-5">
                  {commands.map((entry) => (
                    <CommandBlock key={entry.command} locale={locale} command={entry.command} label={entry.label} />
                  ))}
                </div>
              )}
            </section>
          )}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-line bg-surface p-6">
            <h2 className="mono-label">{locale.ui['project.facts']}</h2>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="text-muted">{locale.ui['project.facts.status']}</dt>
                <dd className="mt-1 text-fg">{locale.ui[statusKey(project.status)]}</dd>
              </div>
              <div>
                <dt className="text-muted">{locale.ui['project.facts.languages']}</dt>
                <dd className="mt-1 font-mono text-fg" dir="ltr">
                  {project.languages.join(' · ')}
                </dd>
              </div>
              <div>
                <dt className="text-muted">{locale.ui['project.facts.license']}</dt>
                <dd className="mt-1 font-mono text-fg">{project.license ?? locale.ui['project.facts.noLicense']}</dd>
                {c.licenseNote !== undefined && (
                  <dd className="mt-1 text-xs leading-relaxed text-muted">{c.licenseNote}</dd>
                )}
              </div>
            </dl>

            <h2 className="mono-label mt-7">{locale.ui['project.links']}</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href={project.repo} rel="noopener noreferrer" target="_blank" className="text-muted hover:text-accent">
                  {locale.ui['projects.repo']} ↗
                </a>
              </li>
              <li>
                <a href={`${project.repo}/issues`} rel="noopener noreferrer" target="_blank" className="text-muted hover:text-accent">
                  {locale.ui['project.issues']} ↗
                </a>
              </li>
              {project.hasReleases === true && (
                <li>
                  <a href={`${project.repo}/releases`} rel="noopener noreferrer" target="_blank" className="text-muted hover:text-accent">
                    {locale.ui['project.releases']} ↗
                  </a>
                </li>
              )}
              {project.homepage !== undefined && (
                <li>
                  <a href={project.homepage} rel="noopener noreferrer" target="_blank" className="text-muted hover:text-accent">
                    {locale.ui['projects.homepage']} ↗
                  </a>
                </li>
              )}
            </ul>
          </div>
        </aside>
      </div>

      <nav className="mt-16 grid gap-4 border-t border-line pt-8 sm:grid-cols-2" aria-label={locale.ui['projects.title']}>
        <a href={`/projects/${previous.slug}/`} className="rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-line-strong">
          <span className="mono-label">
            <span className="inline-block rtl:-scale-x-100">←</span> {locale.ui['project.prev']}
          </span>
          <span className="mt-2 block text-lg font-semibold" dir="ltr">
            {previous.name}
          </span>
        </a>
        <a href={`/projects/${next.slug}/`} className="rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-line-strong sm:text-end">
          <span className="mono-label">
            {locale.ui['project.next']} <span className="inline-block rtl:-scale-x-100">→</span>
          </span>
          <span className="mt-2 block text-lg font-semibold" dir="ltr">
            {next.name}
          </span>
        </a>
      </nav>
    </article>
  );
}
