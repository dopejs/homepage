import { useEffect, useRef, useState } from 'react';
import { Globe } from 'lucide-react';

import { SITE_LOCALES, type SiteLocale } from '../locales';

interface Props {
  readonly locale: SiteLocale;
  readonly onChange: (path: string) => void;
}

export function LanguageMenu({ locale, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: Event): void => {
      if (event instanceof KeyboardEvent && event.key !== 'Escape') return;
      if (event.type === 'click' && root.current?.contains(event.target as Node) === true) return;
      setOpen(false);
    };
    document.addEventListener('click', close);
    document.addEventListener('keydown', close);
    return () => {
      document.removeEventListener('click', close);
      document.removeEventListener('keydown', close);
    };
  }, [open]);

  return (
    <div className="relative" ref={root}>
      <button
        type="button"
        aria-expanded={open}
        aria-label={locale.ui['nav.language']}
        onClick={() => setOpen((value) => !value)}
        className="chip"
      >
        <Globe size={15} />
        <span className="hidden sm:inline">{locale.label}</span>
      </button>

      {/* No `dir` on the entries: it would right-align the Hebrew and Arabic
          endonyms inside an otherwise left-aligned menu. */}
      {open && (
        <ul className="absolute end-0 z-50 mt-2 max-h-[70vh] w-44 overflow-y-auto rounded-xl border border-line bg-surface p-1.5 shadow-xl shadow-black/10">
          {SITE_LOCALES.map((candidate) => (
            <li key={candidate.lang}>
              <button
                type="button"
                lang={candidate.lang}
                aria-current={candidate.path === locale.path ? 'true' : undefined}
                onClick={() => {
                  onChange(candidate.path);
                  setOpen(false);
                }}
                className={`block w-full rounded-lg px-3 py-1.5 text-start text-sm transition-colors hover:bg-surface-2 ${
                  candidate.path === locale.path ? 'font-semibold text-accent' : 'text-muted hover:text-fg'
                }`}
              >
                {candidate.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
