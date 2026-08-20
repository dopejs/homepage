import { useState, type ReactNode } from 'react';

import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { ProjectDetail } from './components/ProjectDetail';
import { getProject } from './data/projects';
import { writeLanguagePreference } from './language-preference';
import { localeForPath } from './locales';
import { neighbours } from './routes';
import type { SiteRoute } from './types';

interface AppProps {
  readonly route: SiteRoute;
  readonly initialLocalePath: string;
}

export function App({ route, initialLocalePath }: AppProps): ReactNode {
  const [localePath, setLocalePath] = useState(initialLocalePath);
  const locale = localeForPath(localePath);

  const changeLocale = (path: string): void => {
    const next = localeForPath(path);
    writeLanguagePreference(next.path);
    setLocalePath(next.path);
    document.documentElement.lang = next.lang;
    document.documentElement.dir = next.dir ?? 'ltr';
  };

  let content: ReactNode;
  if (route.kind === 'project' && route.slug !== undefined) {
    const project = getProject(route.slug);
    if (project === undefined) throw new Error(`unknown project route ${route.path}`);
    const { previous, next } = neighbours(project.slug);
    content = <ProjectDetail locale={locale} project={project} previous={previous} next={next} />;
  } else {
    content = <Home locale={locale} />;
  }

  return (
    <div dir={locale.dir ?? 'ltr'}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-50 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-ink"
      >
        {locale.ui['nav.skip']}
      </a>
      <Header locale={locale} onLocaleChange={changeLocale} />
      <main id="main">{content}</main>
      <Footer locale={locale} />
    </div>
  );
}
