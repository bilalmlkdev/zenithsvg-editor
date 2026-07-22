import { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Monitor, Check } from 'lucide-react';

const OPTIONS = [
  { id: 'light',  label: 'Light',  icon: Sun     },
  { id: 'dark',   label: 'Dark',   icon: Moon    },
  { id: 'system', label: 'System', icon: Monitor },
];

function CurrentIcon({ theme, resolved }) {
  if (theme === 'system') return <Monitor className="h-5 w-5" />;
  if (resolved === 'dark') return <Moon className="h-5 w-5" />;
  return <Sun className="h-5 w-5" />;
}

export default function ThemeToggle({ theme, setTheme, resolved }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(o => !o)} className="flex" title="Toggle theme">
        <CurrentIcon theme={theme} resolved={resolved} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-36 rounded-xl border shadow-xl overflow-hidden bg-white border-zinc-200 dark:bg-zinc-900 dark:border-zinc-700 z-50">
          {OPTIONS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => {
                setTheme(id);
                setOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium transition-colors ${
                theme === id
                  ? 'text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-950/40'
                  : 'text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-800'
              }`}
            >
              <span className="flex items-center gap-2">
                <Icon className="h-3.5 w-3.5" />
                {label}
              </span>
              {theme === id && <Check className="h-3 w-3" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
