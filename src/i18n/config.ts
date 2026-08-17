/**
 * Locale registry. Adding a language means: an entry here, a UI file under
 * `src/i18n/ui/`, and a project-copy file under `src/data/copy/`. Everything
 * else (routes, hreflang, sitemap, the language menu) is derived from this.
 */
export interface LocaleConfig {
  /** URL segment and internal key. The default locale has no segment. */
  code: string;
  /** Value for the <html lang> attribute and hreflang. */
  htmlLang: string;
  /** Endonym, shown in the language menu. */
  label: string;
  dir: 'ltr' | 'rtl';
  /**
   * Whether display type (h1/h2, buttons) may use the monospace stack.
   * Monospace fonts space CJK, Arabic and Hebrew glyphs badly, so those
   * locales fall back to the sans stack for headings.
   */
  monoDisplay: boolean;
}

export const locales = [
  { code: 'en', htmlLang: 'en', label: 'English', dir: 'ltr', monoDisplay: true },
  { code: 'zh', htmlLang: 'zh-CN', label: '简体中文', dir: 'ltr', monoDisplay: false },
  { code: 'zh-tw', htmlLang: 'zh-TW', label: '繁體中文', dir: 'ltr', monoDisplay: false },
  { code: 'es', htmlLang: 'es', label: 'Español', dir: 'ltr', monoDisplay: true },
  { code: 'fr', htmlLang: 'fr', label: 'Français', dir: 'ltr', monoDisplay: true },
  { code: 'de', htmlLang: 'de', label: 'Deutsch', dir: 'ltr', monoDisplay: true },
  { code: 'ru', htmlLang: 'ru', label: 'Русский', dir: 'ltr', monoDisplay: true },
  { code: 'he', htmlLang: 'he', label: 'עברית', dir: 'rtl', monoDisplay: false },
  { code: 'ar', htmlLang: 'ar', label: 'العربية', dir: 'rtl', monoDisplay: false },
  { code: 'ja', htmlLang: 'ja', label: '日本語', dir: 'ltr', monoDisplay: false },
  { code: 'ko', htmlLang: 'ko', label: '한국어', dir: 'ltr', monoDisplay: false },
] as const satisfies readonly LocaleConfig[];

export type Lang = (typeof locales)[number]['code'];

export const defaultLang: Lang = 'en';
export const localeCodes = locales.map((l) => l.code) as Lang[];

const byCode = new Map(locales.map((l) => [l.code as Lang, l as LocaleConfig]));

export function getLocale(lang: Lang): LocaleConfig {
  return byCode.get(lang) ?? byCode.get(defaultLang)!;
}

export function isLang(value: string): value is Lang {
  return byCode.has(value as Lang);
}
