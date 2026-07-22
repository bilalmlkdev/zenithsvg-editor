import { useState, useMemo } from 'react';
import { Search, Boxes } from 'lucide-react';
import { PRESETS } from '../../constants/presets';

const sectionTitle = 'text-[11px] font-medium tracking-tight text-[var(--text-muted)] mb-3 flex items-center justify-between';
const inputBase = 'w-full rounded-md border border-[var(--border)] bg-[var(--bg-surface)] px-3 py-2 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition ';

export default function LibraryTab({ setRawSvg }) {
  const [presetSearch, setPresetSearch] = useState('');

  const filteredPresets = useMemo(() => {
    return PRESETS.filter(p => p.name.toLowerCase().includes(presetSearch.toLowerCase()));
  }, [presetSearch]);

  return (
    <div className="space-y-5 animate-in fade-in duration-150 no-scrollbar">
      <div className={sectionTitle}>
        <span>Vector Library</span>
        <Boxes className="h-3.5 w-3.5" />
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[var(--text-muted)]" />
        <input
          type="text"
          placeholder="Search templates..."
          value={presetSearch}
          onChange={e => setPresetSearch(e.target.value)}
          className={inputBase + ' pl-8'}
        />
      </div>
      <div className="grid grid-cols-2 gap-2.5 max-h-[60vh] overflow-y-auto pr-1">
        {filteredPresets.map(p => (
          <button
            key={p.id}
            onClick={() => setRawSvg(p.svg)}
            className="flex flex-col items-center justify-center p-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] hover:border-purple-500 hover:bg-purple-500/5 transition group"
          >
            <div
              className="h-8 w-8 text-[var(--text-primary)] group-hover:text-purple-500 group-hover:scale-110 transition-transform"
              dangerouslySetInnerHTML={{ __html: p.svg }}
            />
            <span className="text-[11px] font-semibold text-[var(--text-muted)] group-hover:text-[var(--text-primary)] mt-2 truncate w-full text-center">
              {p.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
