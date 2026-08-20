import { useState } from 'react';
import type { SiteLocale } from '../locales';

interface Props {
  readonly locale: SiteLocale;
  readonly command: string;
  readonly label?: string;
}

export function CommandBlock({ locale, command, label }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(command);
    } catch {
      return; // Clipboard blocked (insecure context or denied permission).
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="min-w-0">
      {label !== undefined && <p className="mono-label mb-2">{label}</p>}
      <div className="flex items-stretch gap-2">
        {/* Shell commands are LTR in every locale, including RTL pages. */}
        <code
          dir="ltr"
          className="min-w-0 flex-1 overflow-x-auto rounded-lg border border-line bg-ink/70 px-3 py-2 text-start font-mono text-xs leading-6 whitespace-nowrap text-fg/80"
        >
          {command}
        </code>
        <button
          type="button"
          onClick={() => void copy()}
          className="shrink-0 rounded-lg border border-line px-3 font-mono text-xs text-muted transition-colors hover:border-accent/60 hover:text-accent"
        >
          {copied ? locale.ui['projects.copied'] : locale.ui['projects.copy']}
        </button>
      </div>
    </div>
  );
}
