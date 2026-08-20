import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

import type { SiteLocale } from '../locales';

interface Props {
  readonly locale: SiteLocale;
  readonly command: string;
  readonly label?: string;
  /** Filename shown in the window bar; defaults to the label or a shell name. */
  readonly file?: string;
}

/** The dark terminal card the other dopejs sites use for install commands. */
export function CommandBlock({ locale, command, label, file }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(command);
    } catch {
      return; // Clipboard blocked; the command stays selectable as text.
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="min-w-0">
      {label !== undefined && <p className="mono-label mb-2">{label}</p>}
      <div className="overflow-hidden rounded-xl border border-line bg-code">
        <div className="flex items-center gap-3 border-b border-white/10 px-3.5 py-2">
          <span className="flex gap-1.5" aria-hidden="true">
            <i className="size-2.5 rounded-full bg-[#ff5f57]" />
            <i className="size-2.5 rounded-full bg-[#febc2e]" />
            <i className="size-2.5 rounded-full bg-[#28c840]" />
          </span>
          <span className="flex-1 truncate text-center font-mono text-[0.7rem] text-white/40" dir="ltr">
            {file ?? 'shell'}
          </span>
          <button
            type="button"
            onClick={() => void copy()}
            className="rounded-md p-1 text-white/45 transition-colors hover:text-white"
            aria-label={copied ? locale.ui['projects.copied'] : locale.ui['projects.copy']}
            title={copied ? locale.ui['projects.copied'] : locale.ui['projects.copy']}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>
        {/* Shell commands are LTR in every locale, including RTL pages. */}
        <pre
          dir="ltr"
          className="overflow-x-auto px-4 py-3 text-start font-mono text-xs leading-6 text-code-fg"
        >
          <code>
            <span className="text-accent-solid">$ </span>
            {command}
          </code>
        </pre>
      </div>
    </div>
  );
}
