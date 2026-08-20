import { useEffect, useRef, useState } from 'react';
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
        className="flex cursor-pointer items-center gap-1.5 rounded border border-line px-2.5 py-1.5 text-xs whitespace-nowrap text-muted transition-colors hover:border-accent/60 hover:text-accent"
      >
        <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z" />
        </svg>
        <span>{locale.label}</span>
      </button>

      {open && (
        <ul className="absolute end-0 z-50 mt-2 max-h-[70vh] w-44 overflow-y-auto rounded-lg border border-line bg-surface p-1.5 shadow-xl shadow-black/40">
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
                className={`block w-full rounded px-3 py-1.5 text-start text-sm transition-colors hover:bg-surface-2 ${
                  candidate.path === locale.path ? 'text-accent' : 'text-muted hover:text-fg'
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
