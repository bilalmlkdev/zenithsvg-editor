

export default function ExportCodeView({ exportFormat, setExportFormat, formattedCode }) {
  return (
    <div className="w-full max-w-3xl rounded-2xl border border-zinc-800 bg-zinc-950/90 p-6 shadow-2xl backdrop-blur-xl z-10">
      <div className="flex justify-between items-center mb-4 pb-3 border-b border-zinc-800">
        <div className="flex gap-2">
          {[
            { id: 'svg', label: 'Raw SVG' },
            { id: 'jsx', label: 'React JSX' },
            { id: 'tailwind', label: 'Tailwind SVG' },
            { id: 'css_anim', label: 'Pure CSS Keyframes' },
            { id: 'datauri', label: 'Data URI' }
          ].map((fmt) => (
            <button
              key={fmt.id}
              onClick={() => setExportFormat(fmt.id)}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition ${
                exportFormat === fmt.id
                  ? 'bg-indigo-600 text-white font-bold shadow-sm'
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {fmt.label}
            </button>
          ))}
        </div>
        <span className="text-xs font-mono text-indigo-400 font-semibold">Production Ready</span>
      </div>

      <pre className="text-xs font-mono text-indigo-200 overflow-x-auto p-4 bg-zinc-900/60 rounded-xl border border-zinc-800/80 max-h-[26rem] whitespace-pre-wrap leading-relaxed">
        {formattedCode}
      </pre>
    </div>
  );
}
