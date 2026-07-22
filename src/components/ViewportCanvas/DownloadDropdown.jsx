import { useState, useRef, useEffect } from 'react';
import { Download, ChevronDown } from 'lucide-react';
import { svgToPngDataUrl, createIcoBlob, triggerDownload } from '../../utils/exportHelpers';

export default function DownloadDropdown({ processedSvg }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    if (open) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const handleDownloadSvg = () => {
    const blob = new Blob([processedSvg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    triggerDownload(url, 'pathcraft-icon.svg');
    URL.revokeObjectURL(url);
    setOpen(false);
  };

  const handleDownloadPng = async () => {
    try {
      const dataUrl = await svgToPngDataUrl(processedSvg);
      triggerDownload(dataUrl, 'pathcraft-icon.png');
    } catch (err) { console.error('PNG export failed:', err); }
    setOpen(false);
  };

  const handleDownloadIco = async () => {
    try {
      const pngDataUrl = await svgToPngDataUrl(processedSvg);
      const icoBlob = await createIcoBlob(pngDataUrl);
      const url = URL.createObjectURL(icoBlob);
      triggerDownload(url, 'pathcraft-icon.ico');
      URL.revokeObjectURL(url);
    } catch (err) { console.error('ICO export failed:', err); }
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)} className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition text-[var(--text-secondary)] hover:text-indigo-500 hover:bg-[var(--bg-surface)]">
        <Download className="h-3 w-3" />
        <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute right-0 bottom-full mt-2 w-36 rounded-xl border border-[var(--border)] bg-[var(--bg-overlay)] backdrop-blur-xl shadow-xl overflow-hidden z-50">
          <button onClick={handleDownloadSvg} className="w-full text-left px-3 py-2 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] hover:text-indigo-500 transition flex items-center gap-2">
            <span className="text-[10px] font-mono text-purple-500">.svg</span> SVG
          </button>
          <button onClick={handleDownloadPng} className="w-full text-left px-3 py-2 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] hover:text-indigo-500 transition flex items-center gap-2">
            <span className="text-[10px] font-mono text-purple-500">.png</span> PNG
          </button>
          <button onClick={handleDownloadIco} className="w-full text-left px-3 py-2 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] hover:text-indigo-500 transition flex items-center gap-2">
            <span className="text-[10px] font-mono text-purple-500">.ico</span> ICO
          </button>
        </div>
      )}
    </div>
  );
}
