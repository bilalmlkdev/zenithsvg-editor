import { FORMATS } from '../../constants/formats';

export default function FormatSelector({ exportFormat, setExportFormat }) {
  return (
    <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--bg-surface)] border border-[var(--border)]">
      {FORMATS.map((fmt) => {
        const active = exportFormat === fmt.id;
        return (
          <button
            key={fmt.id}
            onClick={() => setExportFormat(fmt.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
              active
                ? 'bg-purple-600 text-white shadow-sm font-bold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]'
            }`}
          >
            {fmt.label}
          </button>
        );
      })}
    </div>
  );
}
