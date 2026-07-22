import { useEffect, useMemo, useState } from 'react';
import { X, Code2, Sparkles } from 'lucide-react';
import FormatSelector from './FormatSelector';
import CodeOutput from './CodeOutput';
import FooterStats from './FooterStats';

export default function CodeModal({
  isOpen,
  onClose,
  exportFormat,
  setExportFormat,
  formattedCode = '',
  optStats,
  handleDownload,
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const stats = useMemo(() => {
    if (!formattedCode) return { lines: 0, chars: 0, size: '0 B' };
    const lines = formattedCode.split('\n').length;
    const chars = formattedCode.length;
    const bytes = new Blob([formattedCode]).size;
    const size = bytes > 1024 ? `${(bytes / 1024).toFixed(1)} KB` : `${bytes} B`;
    return { lines, chars, size };
  }, [formattedCode]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formattedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = formattedCode;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md transition-opacity" onClick={onClose} aria-hidden="true" />
      <div className="relative flex flex-col w-full max-w-3xl max-h-[85vh] rounded-2xl shadow-2xl overflow-hidden border border-[var(--border)] bg-[var(--bg-elevated)] transition-all duration-200 ease-out scale-100">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--border)] bg-[var(--bg-base)]/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500">
              <Code2 className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">Code & Export Options</h2>
              <p className="text-[11px] text-[var(--text-muted)]">Copy formatted snippet or download raw asset</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-[var(--text-muted)] border border-[var(--border)] rounded-md">ESC</span>
            <button onClick={onClose} aria-label="Close dialog" className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Format Selector */}
        <div className="flex items-center justify-between gap-2 px-5 py-2.5 border-b border-[var(--border)] bg-[var(--bg-elevated)] overflow-x-auto no-scrollbar">
          <FormatSelector exportFormat={exportFormat} setExportFormat={setExportFormat} />
          {exportFormat === 'opt_svg' && optStats && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
              <Sparkles className="h-3 w-3" />
              <span>-{optStats.reduction} reduced</span>
            </div>
          )}
        </div>

        <CodeOutput formattedCode={formattedCode} handleCopy={handleCopy} copied={copied} />
        <FooterStats stats={stats} handleDownload={handleDownload} handleCopy={handleCopy} copied={copied} />
      </div>
    </div>
  );
}
