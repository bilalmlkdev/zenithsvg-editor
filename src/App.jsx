import React, { useState } from 'react';
import {
  Sliders, Code, Eye, Sparkles, Copy, Check, Upload,
  ZoomIn, ZoomOut, Grid, ChevronRight, Grid2X2, Play,
  RotateCw, Activity, Flame, Clock
} from 'lucide-react';

const PRESETS = [
  {
    id: 'dollar',
    name: 'Currency',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`
  },
  {
    id: 'shield',
    name: 'Security Shield',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>`
  },
  {
    id: 'terminal',
    name: 'Developer Terminal',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>`
  },
  {
    id: 'zap',
    name: 'Energy Pulse',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`
  },
  {
    id: 'globe',
    name: 'Global Network',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`
  },
  {
    id: 'cpu',
    name: 'Core Processor',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="12" height="12" x="6" y="6" rx="2"/><path d="M15 2v4M9 2v4M15 18v4M9 18v4M2 15h4M2 9h4M18 15h4M18 9h4"/></svg>`
  }
];

export default function App() {
  const [rawSvg, setRawSvg] = useState(PRESETS[0].svg);
  const [strokeColor, setStrokeColor] = useState('#818cf8');
  const [fillColor, setFillColor] = useState('none');
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [strokeLinecap, setStrokeLinecap] = useState('round');
  const [strokeLinejoin, setStrokeLinejoin] = useState('round');

  // Animation Studio States
  const [animType, setAnimType] = useState('draw'); // 'draw' | 'pulse' | 'spin' | 'breathe' | 'none'
  const [animDuration, setAnimDuration] = useState(2.5);
  const [animEasing, setAnimEasing] = useState('cubic-bezier(0.4, 0, 0.2, 1)');
  const [isPlaying, setIsPlaying] = useState(false);

  const [activeView, setActiveView] = useState('canvas');
  const [zoom, setZoom] = useState(100);
  const [gridStyle, setGridStyle] = useState('dots');
  const [copied, setCopied] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState('properties');

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

  const processFile = (file) => {
    if (file && (file.type === 'image/svg+xml' || file.name.endsWith('.svg'))) {
      const reader = new FileReader();
      reader.onload = (event) => setRawSvg(event.target.result);
      reader.readAsText(file);
    }
  };

  const handleFileUpload = (e) => {
    processFile(e.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  // Generate Keyframe Styles dynamically based on Animation Studio settings
  const getAnimationCSS = () => {
    if (!isPlaying || animType === 'none') return '';

    if (animType === 'draw') {
      return `
        @keyframes pcDraw {
          0% { stroke-dasharray: 1000; stroke-dashoffset: 1000; }
          100% { stroke-dasharray: 1000; stroke-dashoffset: 0; }
        }
        .pc-animated path, .pc-animated line, .pc-animated polyline, .pc-animated circle, .pc-animated rect {
          animation: pcDraw ${animDuration}s ${animEasing} infinite alternate;
        }
      `;
    }

    if (animType === 'pulse') {
      return `
        @keyframes pcPulse {
          0% { filter: drop-shadow(0 0 2px ${strokeColor}); opacity: 0.7; }
          100% { filter: drop-shadow(0 0 18px ${strokeColor}); opacity: 1; }
        }
        .pc-animated {
          animation: pcPulse ${animDuration}s ${animEasing} infinite alternate;
        }
      `;
    }

    if (animType === 'spin') {
      return `
        @keyframes pcSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .pc-animated {
          animation: pcSpin ${animDuration}s ${animEasing} infinite;
          transform-origin: center;
        }
      `;
    }

    if (animType === 'breathe') {
      return `
        @keyframes pcBreathe {
          0% { transform: scale(0.85); }
          100% { transform: scale(1.1); }
        }
        .pc-animated {
          animation: pcBreathe ${animDuration}s ${animEasing} infinite alternate;
          transform-origin: center;
        }
      `;
    }

    return '';
  };

  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-black text-zinc-100 font-sans selection:bg-indigo-500 selection:text-white antialiased">
      {/* Dynamic Animation Stylesheet Injection */}
      <style>{getAnimationCSS()}</style>

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
      <main
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className="relative flex-1 flex items-center justify-center bg-black overflow-hidden"
      >
        {isDragging && (
          <div className="absolute inset-4 z-50 flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-indigo-500 bg-indigo-950/40 backdrop-blur-md transition-all">
            <Upload className="h-12 w-12 text-indigo-400 animate-bounce mb-2" />
            <p className="text-sm font-bold text-white">Drop SVG File Here</p>
            <p className="text-xs text-indigo-300">Imports instantly into workbench</p>
          </div>
        )}

        {/* Grid Overlay */}
        <div
          className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
            gridStyle === 'dots'
              ? 'bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px]'
              : gridStyle === 'grid'
              ? 'bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:32px_32px]'
              : 'opacity-0'
          }`}
        />

        {/* Viewport Controls */}
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

        {/* Canvas Display */}
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

              <div
                className={`relative z-10 h-full w-full flex items-center justify-center ${isPlaying ? 'pc-animated' : ''}`}
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
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              isPlaying ? 'bg-indigo-600 text-white shadow-lg ring-2 ring-indigo-400/50' : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            <Play className={`h-4 w-4 ${isPlaying ? 'fill-white' : ''}`} /> {isPlaying ? 'Pause Motion' : 'Play Motion'}
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

      {/* Collapsible Right Inspector */}
      <aside className={`relative z-20 flex h-full transition-all duration-300 ${sidebarOpen ? 'w-80' : 'w-12'}`}>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -left-3 top-1/2 -translate-y-1/2 z-40 flex h-7 w-7 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white shadow-lg transition"
        >
          <ChevronRight className={`h-4 w-4 transition-transform duration-300 ${sidebarOpen ? 'rotate-0' : 'rotate-180'}`} />
        </button>

        {sidebarOpen && (
          <div className="w-full border-l border-zinc-800/80 bg-zinc-950/95 p-5 backdrop-blur-xl overflow-y-auto space-y-6">
            {/* Navigation Tabs */}
            <div className="flex border-b border-zinc-800 pb-2 gap-2">
              <button
                onClick={() => setActiveTab('properties')}
                className={`flex items-center gap-1.5 pb-2 text-xs font-bold transition border-b-2 ${
                  activeTab === 'properties' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Sliders className="h-3.5 w-3.5" /> Properties
              </button>
              <button
                onClick={() => setActiveTab('animation')}
                className={`flex items-center gap-1.5 pb-2 text-xs font-bold transition border-b-2 ${
                  activeTab === 'animation' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" /> Animation
              </button>
              <button
                onClick={() => setActiveTab('presets')}
                className={`flex items-center gap-1.5 pb-2 text-xs font-bold transition border-b-2 ${
                  activeTab === 'presets' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Grid2X2 className="h-3.5 w-3.5" /> Presets
              </button>
            </div>

            {activeTab === 'properties' && (
              <div>
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
            )}

            {activeTab === 'animation' && (
              <div className="space-y-5">
                {/* Motion Mode Selector */}
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-2">Motion Mode</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'draw', label: 'Path Draw', icon: Activity },
                      { id: 'pulse', label: 'Glow Pulse', icon: Flame },
                      { id: 'spin', label: '360 Rotate', icon: RotateCw },
                      { id: 'breathe', label: 'Breathe Scale', icon: Sparkles }
                    ].map((mode) => {
                      const Icon = mode.icon;
                      return (
                        <button
                          key={mode.id}
                          onClick={() => {
                            setAnimType(mode.id);
                            setIsPlaying(true);
                          }}
                          className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs transition ${
                            animType === mode.id
                              ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400 font-bold'
                              : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700'
                          }`}
                        >
                          <Icon className="h-4 w-4" /> {mode.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Duration Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium text-zinc-300">
                    <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-indigo-400" /> Speed / Duration</span>
                    <span className="text-indigo-400 font-mono">{animDuration}s</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="6"
                    step="0.1"
                    value={animDuration}
                    onChange={(e) => setAnimDuration(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                </div>

                {/* Easing Curve Selector */}
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-zinc-300">Easing Curve</label>
                  <div className="grid grid-cols-1 gap-1.5">
                    {[
                      { label: 'Smooth Bezier', value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
                      { label: 'Ease In-Out', value: 'ease-in-out' },
                      { label: 'Linear Speed', value: 'linear' }
                    ].map((ease) => (
                      <button
                        key={ease.value}
                        onClick={() => setAnimEasing(ease.value)}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-mono transition border ${
                          animEasing === ease.value
                            ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400 font-bold'
                            : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700'
                        }`}
                      >
                        {ease.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'presets' && (
              <div className="space-y-3">
                <p className="text-xs text-zinc-400 mb-2">Select a vector preset to load into canvas:</p>
                <div className="grid grid-cols-2 gap-3">
                  {PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => setRawSvg(preset.svg)}
                      className="flex flex-col items-center justify-center p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:border-indigo-500 hover:bg-zinc-900 transition group"
                    >
                      <div
                        className="h-8 w-8 text-zinc-300 group-hover:text-indigo-400 transition"
                        dangerouslySetInnerHTML={{ __html: preset.svg }}
                      />
                      <span className="text-[11px] font-medium text-zinc-400 mt-2 group-hover:text-zinc-200">{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </aside>
    </div>
  );
}
