import { Check, Copy } from 'lucide-react';

export default function CodeOutput({ formattedCode, handleCopy, copied }) {
  return (
    <div className="relative flex-1 min-h-[220px] max-h-[500px] bg-[var(--bg-surface)] overflow-hidden flex flex-col">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[var(--text-secondary)] bg-[var(--bg-elevated)]/80 hover:bg-[var(--bg-elevated)] border border-[var(--border)] backdrop-blur-md transition-all active:scale-95 shadow-sm"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-500" />
            <span className="text-emerald-500 font-semibold">Copied</span>
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" />
            <span>Copy</span>
          </>
        )}
      </button>
      <div className="flex-1 overflow-auto p-4 scrollbar-thin">
        <pre className="font-mono text-xs leading-relaxed text-purple-600 dark:text-purple-300 whitespace-pre-wrap break-all select-all">
          <code>{formattedCode}</code>
        </pre>
      </div>
    </div>
  );
}
