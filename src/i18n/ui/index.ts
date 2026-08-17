import { en, type UIKey, type UIStrings } from './en';
import { zh } from './zh';
import { zhTW } from './zh-tw';
import { es } from './es';
import { fr } from './fr';
import { de } from './de';
import { ru } from './ru';
import { he } from './he';
import { ar } from './ar';
import { ja } from './ja';
import { ko } from './ko';
import type { Lang } from '../config';

export type { UIKey, UIStrings };

export const ui: Record<Lang, UIStrings> = {
  en,
  zh,
  'zh-tw': zhTW,
  es,
  fr,
  de,
  ru,
  he,
  ar,
  ja,
  ko,
};
