import  { useState } from 'react';
import { Sliders, Code, Eye, Sparkles, Copy, Check, Upload } from 'lucide-react';

const DEFAULT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`;

export default function App() {
  const [rawSvg, setRawSvg] = useState(DEFAULT_SVG);
  const [strokeColor, setStrokeColor] = useState('#6366f1');
  const [fillColor, setFillColor] = useState('none');
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [strokeLinecap, setStrokeLinecap] = useState('round');
  const [strokeLinejoin, setStrokeLinejoin] = useState('round');
  const [isAnimated, setIsAnimated] = useState(false);
  const [activeTab, setActiveTab] = useState('preview');
  const [copied, setCopied] = useState(false);

  // Inject updated attributes into raw SVG
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

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = (event) => setRawSvg(event.target.result);
      reader.readAsText(file);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(processedSvg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-black text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <header className="flex h-14 items-center justify-between border-b border-zinc-800 bg-zinc-950/80 px-6 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 font-extrabold text-white shadow-lg shadow-indigo-500/20">
            P
          </div>
          <span className="font-bold text-lg tracking-tight text-white">PathCraft <span className="text-indigo-400 font-normal">Workbench</span></span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex rounded-lg bg-zinc-900 p-1 border border-zinc-800">
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-semibold transition ${
                activeTab === 'preview' ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Eye className="h-3.5 w-3.5" /> Preview
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-semibold transition ${
                activeTab === 'code' ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Code className="h-3.5 w-3.5" /> Code
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-lg bg-zinc-800 px-3 py-1.5 text-xs font-semibold text-zinc-200 hover:bg-zinc-700 active:scale-95 transition border border-zinc-700"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-80 border-r border-zinc-800 bg-zinc-950 p-5 overflow-y-auto space-y-6">
          {/* SVG Source Code Input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Raw SVG Code</label>
              <label className="text-xs text-indigo-400 hover:underline cursor-pointer flex items-center gap-1">
                <Upload className="h-3 w-3" /> Upload
                <input type="file" accept=".svg" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>
            <textarea
              value={rawSvg}
              onChange={(e) => setRawSvg(e.target.value)}
              rows={4}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900/90 p-2.5 font-mono text-xs text-zinc-300 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
              placeholder="Paste <svg> code here..."
            />
          </div>

          {/* Attributes Section */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
              <Sliders className="h-4 w-4 text-indigo-400" /> Attributes
            </h3>

            {/* Stroke Width Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium text-zinc-300">
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

            {/* Color Pickers */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">Stroke Color</label>
                <div className="flex items-center gap-2 bg-zinc-900 p-1.5 rounded-lg border border-zinc-800">
                  <input
                    type="color"
                    value={strokeColor}
                    onChange={(e) => setStrokeColor(e.target.value)}
                    className="h-6 w-6 rounded cursor-pointer border-0 bg-transparent"
                  />
                  <span className="text-xs font-mono text-zinc-300 uppercase">{strokeColor}</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">Fill Color</label>
                <div className="flex items-center gap-2 bg-zinc-900 p-1.5 rounded-lg border border-zinc-800">
                  <input
                    type="color"
                    value={fillColor === 'none' ? '#000000' : fillColor}
                    onChange={(e) => setFillColor(e.target.value)}
                    className="h-6 w-6 rounded cursor-pointer border-0 bg-transparent"
                  />
                  <span className="text-xs font-mono text-zinc-300">{fillColor}</span>
                </div>
              </div>
            </div>

            {/* Stroke Linecap */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-zinc-300">Stroke Linecap</label>
              <div className="grid grid-cols-3 gap-2">
                {['butt', 'round', 'square'].map((cap) => (
                  <button
                    key={cap}
                    onClick={() => setStrokeLinecap(cap)}
                    className={`rounded-md py-1 text-xs font-mono capitalize transition border ${
                      strokeLinecap === cap
                        ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                        : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    {cap}
                  </button>
                ))}
              </div>
            </div>

            {/* Stroke Linejoin */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-zinc-300">Stroke Linejoin</label>
              <div className="grid grid-cols-3 gap-2">
                {['miter', 'round', 'bevel'].map((join) => (
                  <button
                    key={join}
                    onClick={() => setStrokeLinejoin(join)}
                    className={`rounded-md py-1 text-xs font-mono capitalize transition border ${
                      strokeLinejoin === join
                        ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                        : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    {join}
                  </button>
                ))}
              </div>
            </div>

            {/* Animation Toggle */}
            <div className="pt-2 border-t border-zinc-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-300 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-indigo-400" /> Draw Animation
                </span>
                <button
                  onClick={() => setIsAnimated(!isAnimated)}
                  className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    isAnimated ? 'bg-indigo-600' : 'bg-zinc-800'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      isAnimated ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Canvas Area */}
        <section className="flex-1 flex flex-col items-center justify-center bg-black bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:20px_20px] p-8 relative overflow-auto">
          {activeTab === 'preview' ? (
            <div className="flex items-center justify-center h-80 w-80 rounded-2xl border border-zinc-800 bg-zinc-950/90 p-8 shadow-2xl backdrop-blur-xl transition-all relative">
              <style>
                {isAnimated ? `
                  @keyframes pathDraw {
                    0% { stroke-dasharray: 1000; stroke-dashoffset: 1000; }
                    100% { stroke-dasharray: 1000; stroke-dashoffset: 0; }
                  }
                  .pathcraft-animated path, .pathcraft-animated line, .pathcraft-animated polyline, .pathcraft-animated circle, .pathcraft-animated rect {
                    animation: pathDraw 2.5s ease-in-out infinite alternate;
                  }
                ` : ''}
              </style>
              <div
                className={`h-full w-full flex items-center justify-center ${isAnimated ? 'pathcraft-animated' : ''}`}
                dangerouslySetInnerHTML={{ __html: processedSvg }}
              />
            </div>
          ) : (
            <div className="w-full max-w-2xl rounded-xl border border-zinc-800 bg-zinc-950 p-4 shadow-xl">
              <div className="flex justify-between items-center mb-2 pb-2 border-b border-zinc-800 text-xs text-zinc-400 font-mono">
                <span>Clean Export Code</span>
                <span>SVG HTML</span>
              </div>
              <pre className="text-xs font-mono text-indigo-300 overflow-x-auto p-2 bg-zinc-900/50 rounded border border-zinc-800/80 max-h-96 whitespace-pre-wrap">
                {processedSvg}
              </pre>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
