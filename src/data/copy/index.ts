import type { Lang } from '../../i18n/config';
import type { ProjectCopyMap } from './types';
import { en } from './en';
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

export const copy: Record<Lang, ProjectCopyMap> = {
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
