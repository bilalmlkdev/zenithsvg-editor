import { Upload, Globe, Code2, Wand2 } from 'lucide-react';

const inputBase = 'w-full rounded-md border border-[var(--border)] bg-[var(--bg-surface)] px-3 py-2 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition ';

export default function UploadTab({
  rawSvg,
  setRawSvg,
  onProcessFile,
  svgUrl,
  setSvgUrl,
  isFetchingUrl,
  handleFetchUrl,
  handlePrettifySvg,
}) {
  return (
    <div className="space-y-5 animate-in fade-in duration-150 no-scrollbar">
      <div>
        <div className="text-[11px] font-medium tracking-tight text-[var(--text-muted)] mb-3 flex items-center justify-between">
          <span>Import SVG Source</span>
          <span className="text-[10px] text-purple-500">Vector Mode</span>
        </div>
        <label className="flex flex-col items-center justify-center gap-2.5 rounded-xl p-6 cursor-pointer transition-all border-2 border-dashed border-[var(--border)] bg-[var(--bg-surface)] hover:border-purple-500 hover:bg-purple-500/5 group text-center">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-purple-500/10 text-purple-500 group-hover:scale-110 transition-transform">
            <Upload className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-[var(--text-primary)]">
              Click to upload or drag & drop
            </p>
            <p className="text-[10px] text-[var(--text-muted)] mt-0.5">Supports .svg files</p>
          </div>
          <input
            type="file"
            accept=".svg"
            onChange={e => e.target.files?.[0] && onProcessFile(e.target.files[0])}
            className="hidden"
          />
        </label>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
          <Globe className="h-3.5 w-3.5 text-purple-500" /> Remote URL
        </label>
        <form onSubmit={handleFetchUrl} className="flex gap-2">
          <input
            type="url"
            value={svgUrl}
            onChange={e => setSvgUrl(e.target.value)}
            placeholder="https://example.com/icon.svg"
            className={inputBase + ' flex-1'}
          />
          <button
            type="submit"
            disabled={isFetchingUrl}
            className="px-3 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition disabled:opacity-50"
          >
            {isFetchingUrl ? '...' : 'Load'}
          </button>
        </form>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
            <Code2 className="h-3.5 w-3.5 text-purple-500" /> Raw SVG Markup
          </label>
          <button
            type="button"
            onClick={handlePrettifySvg}
            className="text-[10px] text-purple-500 hover:underline flex items-center gap-1 font-semibold"
          >
            <Wand2 className="h-3 w-3" /> Prettify
          </button>
        </div>
        <textarea
          value={rawSvg}
          onChange={e => setRawSvg(e.target.value)}
          rows={8}
          placeholder="<svg xmlns=..."
          className={inputBase + ' resize-none leading-relaxed '}
        />
      </div>
    </div>
  );
}
