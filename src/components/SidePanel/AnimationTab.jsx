import { Clock, Repeat, Pause, Play } from 'lucide-react';
import { ANIMATION_TYPES, EASING_OPTIONS } from '../../constants/animations';

const sectionTitle = 'text-[11px] font-medium tracking-tight text-[var(--text-muted)] mb-3 flex items-center justify-between';
const inputBase = 'w-full rounded-md border border-[var(--border)] bg-[var(--bg-surface)] px-3 py-2 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition ';

export default function AnimationTab({
  animType, setAnimType,
  animDuration, setAnimDuration,
  animEasing, setAnimEasing,
  animDelay, setAnimDelay,
  isPlaying, setIsPlaying,
}) {
  return (
    <div className="space-y-6 animate-in fade-in duration-150 no-scrollbar">
      <div className="flex items-center justify-between bg-[var(--bg-surface)] p-3 rounded-xl border border-[var(--border)]">
        <div>
          <p className="text-xs font-bold text-[var(--text-primary)]">Live Motion Preview</p>
          <p className="text-[10px] text-[var(--text-muted)]">Toggle animation playback</p>
        </div>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white transition active:scale-95 ${isPlaying ? 'bg-amber-600 hover:bg-amber-500' : 'bg-purple-600 hover:bg-purple-500'}`}
        >
          {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>

      <div className="space-y-3">
        <div className={sectionTitle}>
          <span>Animation Style</span>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {ANIMATION_TYPES.map(({ id, label, icon: Icon, desc }) => {
            const isActive = animType === id;
            return (
              <button
                key={id}
                onClick={() => {
                  setAnimType(id);
                  setIsPlaying(true);
                }}
                className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all ${isActive ? 'border-purple-600 bg-purple-500/10 text-purple-500 shadow-sm' : 'border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-purple-500/30'}`}
              >
                <div
                  className={`p-2 rounded-lg shrink-0 ${isActive ? 'bg-purple-600 text-white' : 'bg-[var(--bg-elevated)] text-[var(--text-muted)]'}`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[var(--text-primary)]">{label}</p>
                  <p className="text-[10px] text-[var(--text-muted)] mt-0.5">{desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-[var(--border)]">
        <div className={sectionTitle}>
          <span>Timing & Easing</span>
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-bold text-[var(--text-primary)]">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-purple-500" /> Duration
            </span>
            <span className="text-purple-500">{animDuration}s</span>
          </div>
          <input
            type="range"
            min="0.2"
            max="8"
            step="0.1"
            value={animDuration}
            onChange={e => setAnimDuration(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-[var(--border)] rounded-lg appearance-none cursor-pointer accent-purple-600"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-bold text-[var(--text-primary)]">
            <span className="flex items-center gap-1.5">
              <Repeat className="h-3.5 w-3.5 text-purple-500" /> Loop Delay
            </span>
            <span className="text-purple-500">{animDelay}s</span>
          </div>
          <input
            type="range"
            min="0"
            max="5"
            step="0.2"
            value={animDelay}
            onChange={e => setAnimDelay(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-[var(--border)] rounded-lg appearance-none cursor-pointer accent-purple-600"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[var(--text-primary)]">Easing Curve</label>
          <select
            value={animEasing}
            onChange={e => setAnimEasing(e.target.value)}
            className={inputBase + ' font-sans cursor-pointer'}
          >
            {EASING_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
