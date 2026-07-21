
import { Eye, Code, Upload } from 'lucide-react';

export default function FloatingNav({ activeView, setActiveView, handleFileUpload }) {
  return (
    <header className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex h-12 items-center gap-6 rounded-full border border-zinc-800/80 bg-zinc-950/80 px-5 backdrop-blur-xl shadow-2xl">
      <div className="flex items-center gap-2.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 font-black text-xs text-white shadow-md shadow-indigo-500/20">
          P
        </div>
        <span className="font-bold text-sm tracking-tight text-white">PathCraft</span>
      </div>

      <div className="h-4 w-[1px] bg-zinc-800" />

      <div className="flex items-center gap-1 rounded-full bg-zinc-900/90 p-1 border border-zinc-800/80">
        <button
          onClick={() => setActiveView('canvas')}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all ${
            activeView === 'canvas' ? 'bg-indigo-600 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Eye className="h-3.5 w-3.5" /> Canvas
        </button>
        <button
          onClick={() => setActiveView('code')}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all ${
            activeView === 'code' ? 'bg-indigo-600 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Code className="h-3.5 w-3.5" /> Code & Motion
        </button>
      </div>

      <div className="h-4 w-[1px] bg-zinc-800" />

      <label className="flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-indigo-400 cursor-pointer transition">
        <Upload className="h-3.5 w-3.5" /> Import
        <input type="file" accept=".svg" onChange={handleFileUpload} className="hidden" />
      </label>
    </header>
  );
}
