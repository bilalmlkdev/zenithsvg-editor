import { FileText, Download, Copy, Check } from 'lucide-react';

export default function FooterStats({ stats, handleDownload, handleCopy, copied }) {
  return (
    <div className="flex items-center justify-between px-5 py-3 border-t border-[var(--border)] bg-[var(--bg-base)]">
      <div className="flex items-center gap-3 text-[11px] font-mono text-[var(--text-muted)]">
        <span className="flex items-center gap-1">
          <FileText className="h-3 w-3" />
          {stats.lines} lines
        </span>
        <span>•</span>
        <span>{stats.size}</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={handleDownload}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-[var(--border)] bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] text-[var(--text-primary)] transition-all active:scale-95"
        >
          <Download className="h-3.5 w-3.5" />
          <span>Download File</span>
        </button>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all active:scale-95 ${
            copied
              ? 'bg-emerald-600 hover:bg-emerald-700'
              : 'bg-purple-600 hover:bg-purple-500 shadow-md shadow-purple-600/20'
          }`}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
