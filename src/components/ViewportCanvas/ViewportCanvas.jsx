import { Grid, ZoomIn, ZoomOut } from 'lucide-react';
import Toolbar from './Toolbar';

export default function ViewportCanvas({
  zoom,
  setZoom,
  gridStyle,
  setGridStyle,
  processedSvg,
  isPlaying,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onQuickSave,
  onOpenCodeModal,
  setIsPlaying,
}) {
  return (
    <div className="relative flex-1 h-full flex items-center justify-center overflow-hidden bg-[var(--canvas-bg)] rounded-2xl shadow-6xl backdrop-blur-2xl">
      {/* Grid background */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
          gridStyle === 'dots' ? 'opacity-100' : gridStyle === 'grid' ? 'opacity-100' : 'opacity-0'
        }`}
        style={
          gridStyle === 'dots'
            ? { backgroundImage: 'radial-gradient(var(--border) 1px, transparent 1px)', backgroundSize: '7px 7px' }
            : gridStyle === 'grid'
            ? { backgroundImage: 'linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)', backgroundSize: '12px 12px' }
            : {}
        }
      />

      {/* Floating Toolbar */}
      <Toolbar
        canUndo={canUndo} onUndo={onUndo}
        canRedo={canRedo} onRedo={onRedo}
        isPlaying={isPlaying} setIsPlaying={setIsPlaying}
        onOpenCodeModal={onOpenCodeModal}
        onQuickSave={onQuickSave}
        processedSvg={processedSvg}
      />

      {/* Grid & Zoom controls */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2 rounded-xl p-1.5 border border-[var(--border)] bg-[var(--bg-overlay)] backdrop-blur-md">
        <button onClick={() => setGridStyle(gridStyle === 'dots' ? 'grid' : gridStyle === 'grid' ? 'none' : 'dots')} className="p-1.5 rounded-lg transition text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]" title="Toggle Grid">
          <Grid className="h-4 w-4" />
        </button>
        <div className="h-3 w-px bg-[var(--border)]" />
        <button onClick={() => setZoom(Math.max(50, zoom - 25))} className="p-1.5 rounded-lg transition text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]">
          <ZoomOut className="h-4 w-4" />
        </button>
        <span className="text-[11px] font-mono text-[var(--text-muted)] w-8 text-center">{zoom}%</span>
        <button onClick={() => setZoom(Math.min(200, zoom + 25))} className="p-1.5 rounded-lg transition text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]">
          <ZoomIn className="h-4 w-4" />
        </button>
      </div>

      {/* SVG preview */}
      <div className="relative flex items-center justify-center transition-transform duration-300" style={{ transform: `scale(${zoom / 100})` }}>
        <div className="group relative flex h-66 w-66 items-center justify-center rounded-3xl p-12">
          <div className={`relative z-10 h-full w-full flex items-center justify-center ${isPlaying ? 'pc-animated' : ''}`} dangerouslySetInnerHTML={{ __html: processedSvg }} />
        </div>
      </div>
    </div>
  );
}
