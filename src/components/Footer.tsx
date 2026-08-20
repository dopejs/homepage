import { ORG_URL, SITE_REPO_URL } from '../data/site';
import type { SiteLocale } from '../locales';

export function Footer({ locale }: { readonly locale: SiteLocale }) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-line py-10">
      <div className="wrap flex flex-col gap-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono">© {year} {locale.ui['footer.rights']}</p>
        <div className="flex flex-col gap-1 sm:items-end">
          <p>
            <a href={SITE_REPO_URL} rel="noopener noreferrer" target="_blank" className="hover:text-fg">
              {locale.ui['footer.built']}
            </a>
            <span className="px-2 text-line" aria-hidden="true">·</span>
            <a href={ORG_URL} rel="noopener noreferrer" target="_blank" className="hover:text-fg">
              github.com/dopejs
            </a>
          </p>
          <p className="text-xs text-faint">{locale.ui['footer.translations']}</p>
        </div>
      </div>
    </footer>
  );
}
