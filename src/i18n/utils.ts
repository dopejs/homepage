import { ui, type UIKey } from './ui';
import { defaultLang, getLocale, isLang, type Lang } from './config';
import { copy } from '../data/copy';
import type { ProjectCopy } from '../data/copy/types';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Reads the locale out of a URL like `/zh-tw/projects/dcode/`. */
export function getLangFromUrl(url: URL): Lang {
  const path = url.pathname.startsWith(BASE) ? url.pathname.slice(BASE.length) : url.pathname;
  const [, segment = ''] = path.split('/');
  return isLang(segment) && segment !== defaultLang ? segment : defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang]?.[key] ?? ui[defaultLang][key];
  };
}

/**
 * Builds a base-aware, locale-prefixed path. The default locale has no prefix:
 * `localePath('en', '/projects/dcode/')` -> `/projects/dcode/`
 * `localePath('ja', '/projects/dcode/')` -> `/ja/projects/dcode/`
 */
export function localePath(lang: Lang, path = '/'): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return lang === defaultLang ? `${BASE}${normalized}` : `${BASE}/${lang}${normalized}`;
}

/** Project prose for a locale, falling back to English per project. */
export function projectCopy(lang: Lang, slug: string): ProjectCopy {
  return copy[lang]?.[slug] ?? copy[defaultLang][slug]!;
}

/** Class for display type — monospace spaces CJK/Arabic/Hebrew glyphs badly. */
export function displayFont(lang: Lang): string {
  return getLocale(lang).monoDisplay ? 'font-mono' : 'font-sans';
}

export { defaultLang, getLocale, isLang };
export type { Lang };
