import { Undo2, Redo2, Play, Pause, Code, BookmarkPlus } from 'lucide-react';
import DownloadDropdown from './DownloadDropdown';

export default function Toolbar({
  canUndo, onUndo,
  canRedo, onRedo,
  isPlaying, setIsPlaying,
  onOpenCodeModal,
  onQuickSave,
  processedSvg,
}) {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-2 rounded-full border border-[var(--border)] bg-[var(--bg-overlay)] backdrop-blur-xl shadow-md z-30">
      {/* Undo */}
      <button
        onClick={onUndo}
        disabled={!canUndo}
        title="Undo (Ctrl+Z)"
        className={`p-1.5 rounded-full transition ${canUndo ? 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]' : 'text-[var(--text-muted)] cursor-not-allowed opacity-40'}`}
      >
        <Undo2 className="h-4 w-4" />
      </button>
      <button
        onClick={onRedo}
        disabled={!canRedo}
        title="Redo (Ctrl+Y)"
        className={`p-1.5 rounded-full transition ${canRedo ? 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]' : 'text-[var(--text-muted)] cursor-not-allowed opacity-40'}`}
      >
        <Redo2 className="h-4 w-4" />
      </button>
      <div className="h-4 w-px bg-[var(--border)]" />

      {/* Play/Pause */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${isPlaying ? 'bg-purple-600 text-white shadow-sm shadow-indigo-500/30 hover:bg-purple-500' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'}`}
      >
        {isPlaying ? <Pause className="h-3 w-3 fill-white" /> : <Play className="h-3 w-3" />}
        {isPlaying ? 'Pause' : 'Play'}
      </button>

      {/* Code & Motion */}
      <button
        onClick={onOpenCodeModal}
        className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition text-[var(--text-secondary)] hover:bg-[var(--bg-surface)]"
      >
        <Code className="h-3 w-3" /> Code & Motion
      </button>

      {/* Save */}
      <button
        onClick={onQuickSave}
        title="Save to Browser Storage"
        className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition text-[var(--text-secondary)] hover:bg-[var(--bg-surface)]"
      >
        <BookmarkPlus className="h-3 w-3" /> Save
      </button>

      {/* Download Dropdown */}
      <DownloadDropdown processedSvg={processedSvg} />
    </div>
  );
}
