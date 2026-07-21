import React, { useState } from 'react';
import {
  Sliders, Code, Eye, Sparkles, Copy, Check, Upload,
  ZoomIn, ZoomOut, Grid, ChevronRight
} from 'lucide-react';

const DEFAULT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`;

export default function App() {
  const [rawSvg, setRawSvg] = useState(DEFAULT_SVG);
  const [strokeColor, setStrokeColor] = useState('#818cf8');
  const [fillColor, setFillColor] = useState('none');
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [strokeLinecap, setStrokeLinecap] = useState('round');
  const [strokeLinejoin, setStrokeLinejoin] = useState('round');
  const [isAnimated, setIsAnimated] = useState(false);
  const [activeView, setActiveView] = useState('canvas');
  const [zoom, setZoom] = useState(100);
  const [gridStyle, setGridStyle] = useState('dots');
  const [copied, setCopied] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const getProcessedSvg = () => {
    let svg = rawSvg;
    svg = svg.replace(/stroke="[^"]*"/g, `stroke="${strokeColor}"`);
    svg = svg.replace(/fill="[^"]*"/g, `fill="${fillColor}"`);
    svg = svg.replace(/stroke-width="[^"]*"/g, `stroke-width="${strokeWidth}"`);
    svg = svg.replace(/stroke-linecap="[^"]*"/g, `stroke-linecap="${strokeLinecap}"`);
    svg = svg.replace(/stroke-linejoin="[^"]*"/g, `stroke-linejoin="${strokeLinejoin}"`);

    if (!svg.includes('stroke=')) svg = svg.replace('<svg', `<svg stroke="${strokeColor}"`);
    if (!svg.includes('fill=')) svg = svg.replace('<svg', `<svg fill="${fillColor}"`);
    if (!svg.includes('stroke-width=')) svg = svg.replace('<svg', `<svg stroke-width="${strokeWidth}"`);

    return svg;
  };

  const processedSvg = getProcessedSvg();

  const handleCopy = () => {
    navigator.clipboard.writeText(processedSvg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = (event) => setRawSvg(event.target.result);
      reader.readAsText(file);
    }
  };

  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-black text-zinc-100 font-sans selection:bg-indigo-500 selection:text-white antialiased">
      {/* Floating Top Navigation Island */}
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
            <Code className="h-3.5 w-3.5" /> Code
          </button>
        </div>

        <div className="h-4 w-[1px] bg-zinc-800" />

        <label className="flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-indigo-400 cursor-pointer transition">
          <Upload className="h-3.5 w-3.5" /> Import
          <input type="file" accept=".svg" onChange={handleFileUpload} className="hidden" />
        </label>
      </header>

      {/* Main Spatial Stage */}
      <main className="relative flex-1 flex items-center justify-center bg-black overflow-hidden">
        {/* Grid Background Overlay */}
        <div
          className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
            gridStyle === 'dots'
              ? 'bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px]'
              : gridStyle === 'grid'
              ? 'bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:32px_32px]'
              : 'opacity-0'
          }`}
        />

        {/* Viewport Floating Controls */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2 rounded-xl border border-zinc-800/80 bg-zinc-950/70 p-1.5 backdrop-blur-md">
          <button
            onClick={() => setGridStyle(gridStyle === 'dots' ? 'grid' : gridStyle === 'grid' ? 'none' : 'dots')}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition"
            title="Toggle Canvas Grid Pattern"
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

        {/* Dynamic Workspace Content */}
        {activeView === 'canvas' ? (
          <div
            className="relative flex items-center justify-center transition-all duration-300"
            style={{ transform: `scale(${zoom / 100})` }}
          >
            <div className="group relative flex h-96 w-96 items-center justify-center rounded-3xl border border-zinc-800/90 bg-zinc-950/90 p-12 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:border-zinc-700">
              <div
                className="absolute inset-0 rounded-3xl opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-30 pointer-events-none"
                style={{ backgroundColor: strokeColor }}
              />

              <style>
                {isAnimated ? `
                  @keyframes pathDraw {
                    0% { stroke-dasharray: 1000; stroke-dashoffset: 1000; }
                    100% { stroke-dasharray: 1000; stroke-dashoffset: 0; }
                  }
                  .pathcraft-animated path, .pathcraft-animated line, .pathcraft-animated polyline, .pathcraft-animated circle, .pathcraft-animated rect {
                    animation: pathDraw 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate;
                  }
                ` : ''}
              </style>

              <div
                className={`relative z-10 h-full w-full flex items-center justify-center ${isAnimated ? 'pathcraft-animated' : ''}`}
                dangerouslySetInnerHTML={{ __html: processedSvg }}
              />
            </div>
          </div>
        ) : (
          <div className="w-full max-w-3xl rounded-2xl border border-zinc-800 bg-zinc-950/90 p-6 shadow-2xl backdrop-blur-xl z-10">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-zinc-800 text-xs font-mono text-zinc-400">
              <span>Processed SVG Export Code</span>
              <span className="text-indigo-400 font-semibold">Ready to Use</span>
            </div>
            <pre className="text-xs font-mono text-indigo-200 overflow-x-auto p-4 bg-zinc-900/60 rounded-xl border border-zinc-800/80 max-h-[28rem] whitespace-pre-wrap leading-relaxed">
              {processedSvg}
            </pre>
          </div>
        )}

        {/* Floating Action Dock */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 rounded-2xl border border-zinc-800/90 bg-zinc-950/90 p-2 backdrop-blur-xl shadow-2xl">
          <button
            onClick={() => setIsAnimated(!isAnimated)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              isAnimated ? 'bg-indigo-600 text-white shadow-lg ring-2 ring-indigo-400/50' : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            <Sparkles className="h-4 w-4" /> {isAnimated ? 'Stop Motion' : 'Animate Path'}
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-zinc-100 to-zinc-300 px-5 py-2 text-xs font-bold text-zinc-950 shadow-md hover:from-white hover:to-zinc-200 active:scale-95 transition"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied!' : 'Copy SVG'}
          </button>
        </div>
      </main>

      {/* Collapsible Floating Right Inspector */}
      <aside className={`relative z-20 flex h-full transition-all duration-300 ${sidebarOpen ? 'w-80' : 'w-12'}`}>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -left-3 top-1/2 -translate-y-1/2 z-40 flex h-7 w-7 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white shadow-lg transition"
        >
          <ChevronRight className={`h-4 w-4 transition-transform duration-300 ${sidebarOpen ? 'rotate-0' : 'rotate-180'}`} />
        </button>

        {sidebarOpen && (
          <div className="w-full border-l border-zinc-800/80 bg-zinc-950/95 p-5 backdrop-blur-xl overflow-y-auto space-y-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-2">
                <Sliders className="h-4 w-4 text-indigo-400" /> Vector Properties
              </h3>

              <div className="space-y-2 mb-6">
                <label className="text-xs font-semibold text-zinc-300">Raw Input</label>
                <textarea
                  value={rawSvg}
                  onChange={(e) => setRawSvg(e.target.value)}
                  rows={3}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900/80 p-2.5 font-mono text-[11px] text-zinc-300 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
                />
              </div>

              <div className="space-y-2 mb-5">
                <div className="flex justify-between text-xs font-medium text-zinc-300">
                  <span>Stroke Thickness</span>
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

              <div className="grid grid-cols-2 gap-3 mb-5">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">Stroke</label>
                  <div className="flex items-center gap-2 bg-zinc-900 p-2 rounded-xl border border-zinc-800">
                    <input
                      type="color"
                      value={strokeColor}
                      onChange={(e) => setStrokeColor(e.target.value)}
                      className="h-6 w-6 rounded-lg cursor-pointer border-0 bg-transparent"
                    />
                    <span className="text-xs font-mono text-zinc-300 uppercase">{strokeColor}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">Fill</label>
                  <div className="flex items-center gap-2 bg-zinc-900 p-2 rounded-xl border border-zinc-800">
                    <input
                      type="color"
                      value={fillColor === 'none' ? '#000000' : fillColor}
                      onChange={(e) => setFillColor(e.target.value)}
                      className="h-6 w-6 rounded-lg cursor-pointer border-0 bg-transparent"
                    />
                    <span className="text-xs font-mono text-zinc-300">{fillColor}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-5">
                <label className="block text-xs font-medium text-zinc-300">Line Cap</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {['butt', 'round', 'square'].map((cap) => (
                    <button
                      key={cap}
                      onClick={() => setStrokeLinecap(cap)}
                      className={`rounded-lg py-1.5 text-xs font-mono capitalize transition border ${
                        strokeLinecap === cap
                          ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400 font-bold'
                          : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      {cap}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-medium text-zinc-300">Line Join</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {['miter', 'round', 'bevel'].map((join) => (
                    <button
                      key={join}
                      onClick={() => setStrokeLinejoin(join)}
                      className={`rounded-lg py-1.5 text-xs font-mono capitalize transition border ${
                        strokeLinejoin === join
                          ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400 font-bold'
                          : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      {join}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
