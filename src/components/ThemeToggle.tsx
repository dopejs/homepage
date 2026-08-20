import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const STORAGE_KEY = 'dopejs-theme';

/** Mirrors the toggle on the other dopejs sites: same key, same data-theme. */
export function ThemeToggle({ label }: { readonly label: string }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.dataset.theme === 'dark');
  }, []);

  const toggle = (): void => {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? 'dark' : 'light';
    document
      .querySelector<HTMLMetaElement>('meta[name="theme-color"]')
      ?.setAttribute('content', next ? '#0b0d0a' : '#fbfcff');
    try {
      localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light');
    } catch {
      // Persistence can be blocked by browser policy; the toggle still works.
    }
  };

  return (
    <button type="button" onClick={toggle} className="chip px-2" aria-label={label} title={label}>
      {dark ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}
