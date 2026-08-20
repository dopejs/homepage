import { ui, type UIStrings } from './i18n/ui';
import type { Lang } from './i18n/config';

/**
 * Site locales, in the shape the other dopejs sites use.
 *
 * `path` doubles as the internal key and as the value matched against the
 * shared `dopejs_locale` cookie, so it is a BCP 47 tag rather than a URL
 * segment: routes on this site are language-neutral and the language is
 * resolved on the client.
 */
export interface SiteLocale {
  /** BCP 47 tag; the default locale uses an empty path, as on the other sites. */
  readonly path: string;
  /** Written to `<html lang>` and stored in the cross-subdomain cookie. */
  readonly lang: string;
  readonly dir?: 'rtl';
  /** Name shown in the language menu, in that language. */
  readonly label: string;
  /** Key into the translated project copy and UI strings. */
  readonly copyKey: Lang;
  readonly ui: UIStrings;
}

export const SITE_LOCALES: readonly SiteLocale[] = [
  { path: '', lang: 'en', label: 'English', copyKey: 'en', ui: ui.en },
  { path: 'zh-Hans', lang: 'zh-Hans', label: '简体中文', copyKey: 'zh', ui: ui.zh },
  { path: 'zh-Hant', lang: 'zh-Hant', label: '繁體中文', copyKey: 'zh-tw', ui: ui['zh-tw'] },
  { path: 'es', lang: 'es', label: 'Español', copyKey: 'es', ui: ui.es },
  { path: 'fr', lang: 'fr', label: 'Français', copyKey: 'fr', ui: ui.fr },
  { path: 'de', lang: 'de', label: 'Deutsch', copyKey: 'de', ui: ui.de },
  { path: 'ru', lang: 'ru', label: 'Русский', copyKey: 'ru', ui: ui.ru },
  { path: 'he', lang: 'he', dir: 'rtl', label: 'עברית', copyKey: 'he', ui: ui.he },
  { path: 'ar', lang: 'ar', dir: 'rtl', label: 'العربية', copyKey: 'ar', ui: ui.ar },
  { path: 'ja', lang: 'ja', label: '日本語', copyKey: 'ja', ui: ui.ja },
  { path: 'ko', lang: 'ko', label: '한국어', copyKey: 'ko', ui: ui.ko },
];

export function localeForPath(path: string): SiteLocale {
  return (
    SITE_LOCALES.find((locale) => locale.path === path) ??
    SITE_LOCALES.find((locale) => locale.path === '')!
  );
}

/**
 * Display type is the sans stack in every locale, as on the other dopejs sites.
 * Kept as a function because the components ask for it per locale and a future
 * locale may need a different stack.
 */
export function displayFont(_locale: SiteLocale): string {
  return 'font-sans';
}
