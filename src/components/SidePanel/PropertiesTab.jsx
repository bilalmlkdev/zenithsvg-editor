import { Sliders, Palette } from 'lucide-react';
import { COLOR_PALETTES } from '../../constants/presets';

const cardBase = 'rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-3 shadow-sm transition-all hover:border-purple-500/30';
const sectionTitle = 'text-[11px] font-medium tracking-tight text-[var(--text-muted)] mb-3 flex items-center justify-between';

export default function PropertiesTab({
  strokeColor, setStrokeColor,
  fillColor, setFillColor,
  strokeWidth, setStrokeWidth,
  strokeLinecap, setStrokeLinecap,
  strokeLinejoin, setStrokeLinejoin,
  strokeDasharray, setStrokeDasharray,
  strokeDashoffset, setStrokeDashoffset,
}) {
  return (
    <div className="space-y-6 animate-in fade-in duration-150 no-scrollbar ">
      <div>
        <div className={sectionTitle}>
          <span>Stroke & Fill</span>
          <Sliders className="h-3.5 w-3.5" />
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <div className={cardBase + ' flex items-center gap-2.5'}>
            <input
              type="color"
              value={strokeColor}
              onChange={e => setStrokeColor(e.target.value)}
              className="h-7 w-7 cursor-pointer bg-transparent border-0 rounded-lg shrink-0"
            />
            <div className="min-w-0 flex-1">
              <p className="text-[9px] font-bold text-[var(--text-muted)] uppercase">Stroke</p>
              <p className="text-xs font-semibold text-[var(--text-primary)] truncate">
                {strokeColor}
              </p>
            </div>
          </div>
          <div className={cardBase + ' flex items-center gap-2.5'}>
            <input
              type="color"
              value={fillColor === 'none' ? '#ffffff' : fillColor}
              onChange={e => setFillColor(e.target.value)}
              className="h-7 w-7 cursor-pointer bg-transparent border-0 rounded-lg shrink-0"
            />
            <div className="min-w-0 flex-1 flex items-center justify-between">
              <div>
                <p className="text-[9px] font-bold text-[var(--text-muted)] uppercase">Fill</p>
                <p className="text-xs font-semibold text-[var(--text-primary)] truncate">
                  {fillColor}
                </p>
              </div>
              {fillColor !== 'none' && (
                <button
                  onClick={() => setFillColor('none')}
                  className="text-[9px] text-rose-500 hover:underline font-bold"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className={sectionTitle}>
          <span>Stroke Geometry</span>
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-bold text-[var(--text-primary)]">
            <span>Thickness</span>
            <span className="text-purple-500">{strokeWidth}px</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="16"
            step="0.5"
            value={strokeWidth}
            onChange={e => setStrokeWidth(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-[var(--border)] rounded-lg appearance-none cursor-pointer accent-purple-600"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[var(--text-primary)]">Line Caps</label>
          <div className="grid grid-cols-3 gap-1.5">
            {['round', 'butt', 'square'].map(cap => (
              <button
                key={cap}
                onClick={() => setStrokeLinecap(cap)}
                className={`py-1.5 rounded-lg text-xs font-semibold capitalize border transition ${strokeLinecap === cap ? 'border-purple-600 bg-purple-600 text-white shadow-sm' : 'border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
              >
                {cap}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[var(--text-primary)]">Line Joins</label>
          <div className="grid grid-cols-3 gap-1.5">
            {['round', 'miter', 'bevel'].map(join => (
              <button
                key={join}
                onClick={() => setStrokeLinejoin(join)}
                className={`py-1.5 rounded-lg text-xs font-semibold capitalize border transition ${strokeLinejoin === join ? 'border-purple-600 bg-purple-600 text-white shadow-sm' : 'border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
              >
                {join}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] font-bold">
              <span>Dash Array</span>
              <span className="text-purple-500">{strokeDasharray}</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              step="1"
              value={strokeDasharray}
              onChange={e => setStrokeDasharray(parseInt(e.target.value))}
              className="w-full h-1.5 bg-[var(--border)] rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] font-bold">
              <span>Dash Offset</span>
              <span className="text-purple-500">{strokeDashoffset}</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              step="1"
              value={strokeDashoffset}
              onChange={e => setStrokeDashoffset(parseInt(e.target.value))}
              className="w-full h-1.5 bg-[var(--border)] rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
          </div>
        </div>
      </div>

      <div className="space-y-3 pt-4 border-t border-[var(--border)]">
        <div className={sectionTitle}>
          <span className="flex items-center gap-1.5">
            <Palette className="h-3.5 w-3.5 text-purple-500" /> Color Swatches
          </span>
        </div>
        {COLOR_PALETTES.map(palette => (
          <div key={palette.name} className="space-y-1.5">
            <span className="text-[10px] text-[var(--text-muted)] font-semibold uppercase">
              {palette.name}
            </span>
            <div className="flex gap-1.5">
              {palette.colors.map(c => (
                <button
                  key={c}
                  onClick={() => setStrokeColor(c)}
                  className="h-6 w-full rounded-lg border border-[var(--border)] hover:scale-110 transition-transform hover:ring-2 hover:ring-purple-500/50"
                  style={{ backgroundColor: c }}
                  title={c}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
