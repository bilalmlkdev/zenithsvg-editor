
import { Grid, ZoomIn, ZoomOut } from 'lucide-react';

export default function ViewportCanvas({
  zoom,
  setZoom,
  gridStyle,
  setGridStyle,
  processedSvg,
  strokeColor,
  isPlaying
}) {
  return (
    <>
      {/* Background Grid Pattern */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
          gridStyle === 'dots'
            ? 'bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px]'
            : gridStyle === 'grid'
            ? 'bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:32px_32px]'
            : 'opacity-0'
        }`}
      />

      {/* Viewport Control Bar */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2 rounded-xl border border-zinc-800/80 bg-zinc-950/70 p-1.5 backdrop-blur-md">
        <button
          onClick={() => setGridStyle(gridStyle === 'dots' ? 'grid' : gridStyle === 'grid' ? 'none' : 'dots')}
          className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition"
          title="Toggle Grid Style"
        >
          <Grid className="h-4 w-4" />
        </button>
        <div className="h-3 w-[1px] bg-zinc-800" />
        <button
          onClick={() => setZoom(Math.max(50, zoom - 25))}
          className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition"
        >
          <ZoomOut className="h-4 w-4" />
        </button>
        <span className="text-[11px] font-mono text-zinc-400 px-1">{zoom}%</span>
        <button
          onClick={() => setZoom(Math.min(200, zoom + 25))}
          className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition"
        >
          <ZoomIn className="h-4 w-4" />
        </button>
      </div>

      {/* Render Canvas */}
      <div
        className="relative flex items-center justify-center transition-all duration-300"
        style={{ transform: `scale(${zoom / 100})` }}
      >
        <div className="group relative flex h-96 w-96 items-center justify-center rounded-3xl border border-zinc-800/90 bg-zinc-950/90 p-12 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:border-zinc-700">
          <div
            className="absolute inset-0 rounded-3xl opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-30 pointer-events-none"
            style={{ backgroundColor: strokeColor }}
          />
          <div
            className={`relative z-10 h-full w-full flex items-center justify-center ${isPlaying ? 'pc-animated' : ''}`}
            dangerouslySetInnerHTML={{ __html: processedSvg }}
          />
        </div>
      </div>
    </>
  );
}
