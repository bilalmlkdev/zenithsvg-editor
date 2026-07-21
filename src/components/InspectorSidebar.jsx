
import {
  ChevronRight, Sliders, Sparkles, Grid2X2, Activity, Flame, RotateCw, Clock
} from 'lucide-react';
import { PRESETS } from '../constants/presets';

export default function InspectorSidebar({
  sidebarOpen,
  setSidebarOpen,
  activeTab,
  setActiveTab,
  rawSvg,
  setRawSvg,
  strokeWidth,
  setStrokeWidth,
  strokeColor,
  setStrokeColor,
  fillColor,
  setFillColor,
  strokeLinecap,
  setStrokeLinecap,
  strokeLinejoin,
  setStrokeLinejoin,
  animType,
  setAnimType,
  animDuration,
  setAnimDuration,
  animEasing,
  setAnimEasing,
  setIsPlaying
}) {
  return (
    <aside className={`relative z-20 flex h-full transition-all duration-300 ${sidebarOpen ? 'w-80' : 'w-12'}`}>
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute -left-3 top-1/2 -translate-y-1/2 z-40 flex h-7 w-7 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white shadow-lg transition"
      >
        <ChevronRight className={`h-4 w-4 transition-transform duration-300 ${sidebarOpen ? 'rotate-0' : 'rotate-180'}`} />
      </button>

      {sidebarOpen && (
        <div className="w-full border-l border-zinc-800/80 bg-zinc-950/95 p-5 backdrop-blur-xl overflow-y-auto space-y-6">
          {/* Tab Navigation */}
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

          {/* Properties Tab */}
          {activeTab === 'properties' && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">Raw Input</label>
                <textarea
                  value={rawSvg}
                  onChange={(e) => setRawSvg(e.target.value)}
                  rows={3}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900/80 p-2.5 font-mono text-[11px] text-zinc-300 focus:border-indigo-500 focus:outline-none resize-none"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-zinc-300 mb-1">
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

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-zinc-900 p-2 rounded-xl border border-zinc-800 flex items-center gap-2">
                  <input
                    type="color"
                    value={strokeColor}
                    onChange={(e) => setStrokeColor(e.target.value)}
                    className="h-6 w-6 cursor-pointer border-0 bg-transparent"
                  />
                  <span className="text-xs font-mono uppercase">{strokeColor}</span>
                </div>
                <div className="bg-zinc-900 p-2 rounded-xl border border-zinc-800 flex items-center gap-2">
                  <input
                    type="color"
                    value={fillColor === 'none' ? '#000000' : fillColor}
                    onChange={(e) => setFillColor(e.target.value)}
                    className="h-6 w-6 cursor-pointer border-0 bg-transparent"
                  />
                  <span className="text-xs font-mono">{fillColor}</span>
                </div>
              </div>

              <div className="space-y-1.5">
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

              <div className="space-y-1.5">
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

          {/* Animation Tab */}
          {activeTab === 'animation' && (
            <div className="space-y-5">
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
                        className={`flex items-center gap-2 p-2 rounded-xl border text-xs transition ${
                          animType === mode.id
                            ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400 font-bold'
                            : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700'
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" /> {mode.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-zinc-300 mb-1">
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-indigo-400" /> Duration</span>
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

              <div className="space-y-1.5">
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

          {/* Presets Tab */}
          {activeTab === 'presets' && (
            <div className="grid grid-cols-2 gap-3">
              {PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => setRawSvg(preset.svg)}
                  className="flex flex-col items-center p-3 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:border-indigo-500 transition group"
                >
                  <div
                    className="h-7 w-7 text-zinc-300 group-hover:text-indigo-400 transition"
                    dangerouslySetInnerHTML={{ __html: preset.svg }}
                  />
                  <span className="text-[11px] font-medium text-zinc-400 mt-2 group-hover:text-zinc-200">{preset.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </aside>
  );
}
