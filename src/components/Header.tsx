import { LanguageMenu } from './LanguageMenu';
import { ORG_URL } from '../data/site';
import type { SiteLocale } from '../locales';

interface Props {
  readonly locale: SiteLocale;
  readonly onLocaleChange: (path: string) => void;
}

export function Header({ locale, onLocaleChange }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-ink/80 backdrop-blur">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <a href="/" className="group flex shrink-0 items-center gap-2.5">
          <img src="/logo.svg" alt="" aria-hidden="true" className="size-7 rounded-[6px] transition-transform duration-200 group-hover:rotate-[-4deg]" />
          <span className="font-mono text-base font-semibold tracking-tight">dopejs</span>
        </a>

        <nav className="flex items-center gap-1 text-sm" aria-label="Primary">
          {/* The in-page links are hidden on narrow screens: the sections they point
              at are the whole page, and keeping them overflows a 390px viewport. */}
          <a href="/#projects" className="hidden rounded px-3 py-2 text-muted transition-colors hover:text-fg sm:inline-block">
            {locale.ui['nav.projects']}
          </a>
          <a href="/#about" className="hidden rounded px-3 py-2 text-muted transition-colors hover:text-fg sm:inline-block">
            {locale.ui['nav.about']}
          </a>
          <a href={ORG_URL} rel="noopener noreferrer" target="_blank" className="rounded px-2 py-2 text-muted transition-colors hover:text-fg sm:px-3">
            {locale.ui['nav.github']}
          </a>
          <div className="ms-1 sm:ms-2">
            <LanguageMenu locale={locale} onChange={onLocaleChange} />
          </div>
        </nav>
      </div>
    </header>
  );
}
