import { useState, useMemo } from 'react';
import { Search, Layers, Trash2 } from 'lucide-react';

const sectionTitle = 'text-[11px] font-medium tracking-tight text-[var(--text-muted)] mb-3 flex items-center justify-between';
const inputBase = 'w-full rounded-md border border-[var(--border)] bg-[var(--bg-surface)] px-3 py-2 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition ';

export default function SavedTab({
  savedProjects,
  onLoadProject,
  onDeleteProject,
}) {
  const [savedSearch, setSavedSearch] = useState('');

  const filteredSaved = useMemo(() => {
    return (savedProjects || []).filter(p =>
      p.name?.toLowerCase().includes(savedSearch.toLowerCase()) ||
      p.description?.toLowerCase().includes(savedSearch.toLowerCase())
    );
  }, [savedProjects, savedSearch]);

  return (
    <div className="space-y-5 animate-in fade-in duration-150 no-scrollbar">
      <div className={sectionTitle}>
        <span>Saved Projects</span>
        <span className="px-1.5 py-0.5 rounded-full bg-purple-500/10 text-purple-500 text-[10px]">
          {savedProjects.length}
        </span>
      </div>

      {savedProjects.length > 0 && (
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search saved icons..."
            value={savedSearch}
            onChange={e => setSavedSearch(e.target.value)}
            className={inputBase + ' pl-8'}
          />
        </div>
      )}

      {filteredSaved.length === 0 ? (
        <div className="text-center py-10 px-4 border border-dashed border-[var(--border)] rounded-2xl bg-[var(--bg-surface)]">
          <Layers className="h-8 w-8 text-[var(--text-muted)] mx-auto mb-2 opacity-50" />
          <p className="text-xs font-bold text-[var(--text-primary)]">No icons saved yet</p>
          <p className="text-[10px] text-[var(--text-muted)] mt-0.5">
            Save your creation from the canvas toolbar
          </p>
        </div>
      ) : (
        <div className="space-y-2 max-h-[65vh] overflow-y-auto pr-1">
          {filteredSaved.map(proj => (
            <div
              key={proj.id}
              className="flex items-center justify-between p-3 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] hover:border-purple-500/40 transition group gap-2"
            >
              <div
                onClick={() => onLoadProject(proj)}
                className="flex items-center gap-3 cursor-pointer min-w-0 flex-1"
              >
                <div
                  className="h-9 w-9 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] flex items-center justify-center shrink-0 p-1.5 text-[var(--text-primary)] group-hover:text-purple-500 transition"
                  dangerouslySetInnerHTML={{ __html: proj.svg || proj.rawSvg }}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-[var(--text-primary)] truncate group-hover:text-purple-500 transition">
                    {proj.name}
                  </p>
                  {proj.description && (
                    <p className="text-[10px] text-[var(--text-muted)] truncate mt-0.5">
                      {proj.description}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {proj.date && (
                  <span className="text-[9px] text-[var(--text-muted)]">{proj.date}</span>
                )}
                <button
                  onClick={e => {
                    e.stopPropagation();
                    onDeleteProject(proj.id);
                  }}
                  className="text-[var(--text-muted)] hover:text-rose-500 p-1.5 rounded-lg hover:bg-rose-500/10 transition"
                  title="Delete Project"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
