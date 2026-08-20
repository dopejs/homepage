import { ProjectCard } from './ProjectCard';
import { projects } from '../data/projects';
import { ORG_URL } from '../data/site';
import { displayFont, type SiteLocale } from '../locales';

export function Home({ locale }: { readonly locale: SiteLocale }) {
  const display = displayFont(locale);

  return (
    <>
      <section className="wrap pt-20 pb-16 sm:pt-28 sm:pb-24">
        <p className="mono-label">{locale.ui['hero.eyebrow']}</p>
        <h1 className={`mt-5 max-w-3xl text-4xl leading-[1.15] font-semibold tracking-tight sm:text-6xl ${display}`}>
          {locale.ui['hero.title']}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{locale.ui['hero.body']}</p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            className={`rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-ink transition-opacity hover:opacity-90 ${display}`}
          >
            {locale.ui['hero.cta.projects']}
          </a>
          <a
            href={ORG_URL}
            rel="noopener noreferrer"
            target="_blank"
            className={`rounded-lg border border-line px-5 py-2.5 text-sm text-fg transition-colors hover:border-accent/60 hover:text-accent ${display}`}
          >
            {locale.ui['hero.cta.github']} ↗
          </a>
          <span className="ms-1 font-mono text-sm text-muted/80">
            {projects.length} {locale.ui['hero.count']}
          </span>
        </div>
      </section>

      <section id="projects" className="wrap scroll-mt-20">
        <div className="border-t border-line/70 pt-12">
          <h2 className={`text-2xl font-semibold tracking-tight sm:text-3xl ${display}`}>{locale.ui['projects.title']}</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">{locale.ui['projects.lead']}</p>
        </div>

        {/* grid-cols-1 so the implicit column is minmax(0,1fr): otherwise the
            nowrap install command widens every card past the viewport. */}
        <div className="mt-10 grid grid-cols-1 gap-5">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} locale={locale} project={project} index={index} />
          ))}
        </div>
      </section>

      <section id="about" className="wrap mt-24 scroll-mt-20">
        <div className="rounded-xl border border-line bg-surface/60 p-8 sm:p-12">
          <h2 className={`text-2xl font-semibold tracking-tight ${display}`}>{locale.ui['about.title']}</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">{locale.ui['about.body']}</p>
          <a
            href={ORG_URL}
            rel="noopener noreferrer"
            target="_blank"
            className={`mt-6 inline-block text-sm text-accent hover:underline ${display}`}
          >
            {locale.ui['about.cta']} ↗
          </a>
        </div>
      </section>
    </>
  );
}
