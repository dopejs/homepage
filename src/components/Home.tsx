import { ArrowRight, ArrowUpRight } from 'lucide-react';

import { HeroVisual } from './HeroVisual';
import { ProjectCard } from './ProjectCard';
import { projects } from '../data/projects';
import { ORG_URL } from '../data/site';
import { displayFont, type SiteLocale } from '../locales';

export function Home({ locale }: { readonly locale: SiteLocale }) {
  const display = displayFont(locale);

  return (
    <>
      <section className="wrap grid items-center gap-12 pt-16 pb-14 lg:grid-cols-[minmax(0,1fr)_360px] lg:pt-24 lg:pb-20">
        <div>
          <p className="mono-label text-accent">{locale.ui['hero.eyebrow']}</p>
          <p className={`mt-5 text-4xl leading-none font-extrabold tracking-tight text-accent sm:text-5xl ${display}`}>
            DopeJs
          </p>
          <h1
            className={`mt-2 max-w-2xl text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-[3.25rem] ${display}`}
          >
            {locale.ui['hero.title']}
          </h1>
          <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-muted">{locale.ui['hero.body']}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className={`inline-flex items-center gap-2 rounded-xl bg-accent-solid px-5 py-2.5 text-sm font-semibold text-accent-on transition-opacity hover:opacity-90 ${display}`}
            >
              {locale.ui['hero.cta.projects']}
              <ArrowRight size={16} className="rtl:-scale-x-100" />
            </a>
            <a
              href={ORG_URL}
              rel="noopener noreferrer"
              target="_blank"
              className={`inline-flex items-center rounded-xl border border-line bg-surface px-5 py-2.5 text-sm font-semibold transition-colors hover:border-line-strong ${display}`}
            >
              {locale.ui['hero.cta.github']}
            </a>
            <span className="ms-1 font-mono text-sm text-faint">
              {projects.length} {locale.ui['hero.count']}
            </span>
          </div>
        </div>

        <HeroVisual />
      </section>

      <section id="projects" className="wrap scroll-mt-20 pb-4">
        <div className="border-t border-line pt-12">
          <h2 className={`text-2xl font-bold tracking-tight sm:text-3xl ${display}`}>{locale.ui['projects.title']}</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">{locale.ui['projects.lead']}</p>
        </div>

        {/* One bordered container with internal dividers, as on the other
            dopejs sites; the trailing cell keeps the last row from ending in a
            gap and points at the rest of the organisation. */}
        <div className="mt-8 grid grid-cols-1 overflow-hidden rounded-2xl border border-line sm:grid-cols-2 lg:grid-cols-3 [&>*]:border-b [&>*]:border-line [&>*:last-child]:border-b-0 sm:[&>*]:border-e sm:[&>*:nth-child(2n)]:border-e-0 sm:[&>*:nth-child(n+5)]:border-b-0 lg:[&>*:nth-child(2n)]:border-e lg:[&>*:nth-child(3n)]:border-e-0 lg:[&>*:nth-child(n+4)]:border-b-0">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} locale={locale} project={project} index={index} />
          ))}
          <a
            href={ORG_URL}
            rel="noopener noreferrer"
            target="_blank"
            className="group flex flex-col justify-center gap-2 bg-surface p-6 text-muted transition-colors hover:bg-surface-2 sm:p-7"
          >
            <span className="inline-flex items-center gap-1.5 font-semibold">
              {locale.ui['about.cta']}
              <ArrowUpRight size={16} />
            </span>
            <span className="font-mono text-[11px] text-faint">github.com/dopejs</span>
          </a>
        </div>
      </section>

      <section id="about" className="wrap mt-20 scroll-mt-20">
        <div className="rounded-2xl border border-line bg-surface p-8 sm:p-12">
          <h2 className={`text-2xl font-bold tracking-tight ${display}`}>{locale.ui['about.title']}</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">{locale.ui['about.body']}</p>
          <a
            href={ORG_URL}
            rel="noopener noreferrer"
            target="_blank"
            className={`mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline ${display}`}
          >
            {locale.ui['about.cta']}
            <ArrowRight size={15} className="rtl:-scale-x-100" />
          </a>
        </div>
      </section>
    </>
  );
}
