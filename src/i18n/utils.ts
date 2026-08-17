import { ui, defaultLang, type Lang, type UIKey } from './ui';

/** Reads the locale out of a URL like `/homepage/zh/`. Falls back to the default locale. */
export function getLangFromUrl(url: URL): Lang {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const path = url.pathname.startsWith(base) ? url.pathname.slice(base.length) : url.pathname;
  const [, segment] = path.split('/');
  return segment in ui ? (segment as Lang) : defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/**
 * Builds a base-aware path. `localePath('en', '/')` -> `/homepage/`,
 * `localePath('zh', '/')` -> `/homepage/zh/`.
 */
export function localePath(lang: Lang, path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const suffix = path === '/' ? '/' : path;
  return lang === defaultLang ? `${base}${suffix}` : `${base}/${lang}${suffix === '/' ? '/' : suffix}`;
}

/** The other locale — the language switch is a two-way toggle. */
export function otherLang(lang: Lang): Lang {
  return lang === 'en' ? 'zh' : 'en';
}
