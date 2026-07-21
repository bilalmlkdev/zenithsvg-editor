
import { Play, Download, Check, Copy } from 'lucide-react';

export default function DockControls({
  isPlaying,
  setIsPlaying,
  handleDownload,
  handleCopy,
  copied
}) {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 rounded-2xl border border-zinc-800/90 bg-zinc-950/90 p-2 backdrop-blur-xl shadow-2xl">
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
          isPlaying ? 'bg-indigo-600 text-white shadow-lg ring-2 ring-indigo-400/50' : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
        }`}
      >
        <Play className={`h-4 w-4 ${isPlaying ? 'fill-white' : ''}`} /> {isPlaying ? 'Pause' : 'Play Motion'}
      </button>

      <button
        onClick={handleDownload}
        className="flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2 text-xs font-bold text-zinc-300 hover:bg-zinc-800 transition"
      >
        <Download className="h-4 w-4" /> Export File
      </button>

      <button
        onClick={handleCopy}
        className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-zinc-100 to-zinc-300 px-5 py-2 text-xs font-bold text-zinc-950 shadow-md hover:from-white hover:to-zinc-200 active:scale-95 transition"
      >
        {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
        {copied ? 'Copied!' : 'Copy Code'}
      </button>
    </div>
  );
}
