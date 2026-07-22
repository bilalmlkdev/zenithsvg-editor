import ThemeToggle from './ThemeToggle';
import { FaXTwitter } from 'react-icons/fa6';
import { FiGithub } from 'react-icons/fi';

export default function TopBar({ theme, setTheme, resolved }) {
  return (
    <header className="flex items-center justify-between h-12 px-4 shrink-0 z-20 rounded-full bg-[var(--bg-overlay)] backdrop-blur-xl w-full max-w-[500px] mx-auto overflow-visible">
      {/* Brand */}
      <div className="flex items-center gap-1.5">
        <div className="flex h-5 w-5 rotate-180 items-center justify-center" aria-hidden="true">
          <svg
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5.5 w-5.5 fill-purple-600"
            role="img"
            aria-label="PathCraft logo"
          >
            <path d="M487.83 319.44 295.63 36.88a48 48 0 0 0-79.26 0L24.17 319.44A47.1 47.1 0 0 0 41.1 387.57L233.3 490.32a48.05 48.05 0 0 0 45.4 0L470.9 387.57a47.1 47.1 0 0 0 16.93-68.13Zm-431.26 41a16.12 16.12 0 0 1-8-10.38 16.8 16.8 0 0 1 2.37-13.62L232.66 69.26c2.18-3.21 7.34-1.72 7.34 2.13v374c0 5.9-6.54 9.63-11.87 6.78Z" />
          </svg>
        </div>
        <span className="font-medium text-lg tracking-tight text-[var(--text-primary)]">
          PathCraft
        </span>
      </div>

      {/* External links & theme toggle */}
      <nav className="flex items-center gap-2.5" aria-label="External links and theme toggle">
        <a
          href="https://x.com/bilalmlkdev"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow on X (Twitter)"
          className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          <FaXTwitter size={19} />
        </a>
        <a
          href="https://github.com/byllzz"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View GitHub profile"
          className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          <FiGithub size={18} />
        </a>
        <div className="h-4 w-px bg-[var(--border)] mx-1" aria-hidden="true" />
        <ThemeToggle theme={theme} setTheme={setTheme} resolved={resolved} />
      </nav>
    </header>
  );
}
