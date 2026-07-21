import React, { useState } from 'react';
import { Sliders, Code, Eye, Sparkles, Download, Copy, Check } from 'lucide-react';

const DEFAULT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`;

export default function App() {
  const [svgCode, setSvgCode] = useState(DEFAULT_SVG);
  const [strokeColor, setStrokeColor] = useState('#6366f1');
  const [fillColor, setFillColor] = useState('transparent');
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [strokeLinecap, setStrokeLinecap] = useState('round');
  const [strokeLinejoin, setStrokeLinejoin] = useState('round');
  const [isAnimated, setIsAnimated] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(svgCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-900 text-slate-100 font-sans">
      {/* Header */}
      <header className="flex h-14 items-center justify-between border-b border-slate-800 bg-slate-900/60 px-6 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 font-extrabold text-white shadow-lg shadow-indigo-500/30">
            P
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-100">PathCraft <span className="text-indigo-400 font-normal">Workbench</span></span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:bg-slate-700 active:scale-95"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex flex-1 overflow-hidden">
        {/* Left Sidebar: Controls */}
        <aside className="w-80 border-r border-slate-800 bg-slate-900/40 p-5 overflow-y-auto space-y-6">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <Sliders className="h-4 w-4 text-indigo-400" /> Attributes
            </h3>

            {/* Stroke Width */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-xs font-medium text-slate-300">
                <span>Stroke Width</span>
                <span className="text-indigo-400 font-mono">{strokeWidth}px</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="10"
                step="0.5"
                value={strokeWidth}
                onChange={(e) => setStrokeWidth(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            {/* Stroke & Fill Color Pickers */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Stroke Color</label>
                <div className="flex items-center gap-2 bg-slate-800/80 p-1.5 rounded-lg border border-slate-700">
                  <input
                    type="color"
                    value={strokeColor}
                    onChange={(e) => setStrokeColor(e.target.value)}
                    className="h-6 w-6 rounded cursor-pointer border-0 bg-transparent"
                  />
                  <span className="text-xs font-mono text-slate-300">{strokeColor}</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Fill Color</label>
                <div className="flex items-center gap-2 bg-slate-800/80 p-1.5 rounded-lg border border-slate-700">
                  <input
                    type="color"
                    value={fillColor === 'transparent' ? '#000000' : fillColor}
                    onChange={(e) => setFillColor(e.target.value)}
                    className="h-6 w-6 rounded cursor-pointer border-0 bg-transparent"
                  />
                  <span className="text-xs font-mono text-slate-300">{fillColor}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Center Canvas Preview */}
        <section className="flex-1 flex flex-col items-center justify-center bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] bg-slate-950 p-8 relative">
          <div className="flex items-center justify-center h-72 w-72 rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl transition-all">
            <div
              className="h-full w-full flex items-center justify-center"
              style={{ color: strokeColor }}
              dangerouslySetInnerHTML={{ __html: svgCode }}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
