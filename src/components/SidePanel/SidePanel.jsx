import { useState } from 'react';
import UploadTab from './UploadTab';
import PropertiesTab from './PropertiesTab';
import AnimationTab from './AnimationTab';
import LibraryTab from './LibraryTab';
import SavedTab from './SavedTab';

export default function SidePanel({
  activeTab,
  panelOpen,
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
  strokeDasharray,
  setStrokeDasharray,
  strokeDashoffset,
  setStrokeDashoffset,
  animType,
  setAnimType,
  animDuration,
  setAnimDuration,
  animEasing,
  setAnimEasing,
  animDelay,
  setAnimDelay,
  isPlaying,
  setIsPlaying,
  savedProjects,
  onLoadProject,
  onDeleteProject,
  onProcessFile,
}) {
  const [svgUrl, setSvgUrl] = useState('');
  const [isFetchingUrl, setIsFetchingUrl] = useState(false);

  if (!panelOpen) return null;

  const handlePrettifySvg = () => {
    if (!rawSvg) return;
    try {
      const formatted = rawSvg.replace(/></g, '>\n<').trim();
      setRawSvg(formatted);
    } catch {}
  };

  const handleFetchUrl = async (e) => {
    e.preventDefault();
    if (!svgUrl.trim()) return;
    setIsFetchingUrl(true);
    try {
      const res = await fetch(svgUrl);
      const text = await res.text();
      if (text.includes('<svg')) {
        setRawSvg(text);
        setSvgUrl('');
      } else {
        alert('URL did not return a valid SVG file.');
      }
    } catch {
      alert('Failed to fetch SVG from URL. Check CORS restrictions or URL validity.');
    } finally {
      setIsFetchingUrl(false);
    }
  };

  return (
    <div
      className={`w-80 h-full shrink-0 z-20 border-r border-[var(--border)] bg-[var(--canvas-bg)] flex flex-col ${
        panelOpen ? 'rounded-tr-2xl rounded-br-2xl' : ''
      }`}
    >
      {/* Sticky Header */}
      <div className="sticky top-1 z-10  px-5 py-4 border-b border-[var(--border)]">
        <h1 className="text-lg font-medium tracking-tight text-[var(--text-primary)]">ZenithSVG</h1>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 py-4 mt-3.5 space-y-6 no-scrollbar">
        {activeTab === 'upload' && (
          <UploadTab
            rawSvg={rawSvg}
            setRawSvg={setRawSvg}
            onProcessFile={onProcessFile}
            svgUrl={svgUrl}
            setSvgUrl={setSvgUrl}
            isFetchingUrl={isFetchingUrl}
            handleFetchUrl={handleFetchUrl}
            handlePrettifySvg={handlePrettifySvg}
          />
        )}

        {activeTab === 'properties' && (
          <PropertiesTab
            strokeColor={strokeColor}
            setStrokeColor={setStrokeColor}
            fillColor={fillColor}
            setFillColor={setFillColor}
            strokeWidth={strokeWidth}
            setStrokeWidth={setStrokeWidth}
            strokeLinecap={strokeLinecap}
            setStrokeLinecap={setStrokeLinecap}
            strokeLinejoin={strokeLinejoin}
            setStrokeLinejoin={setStrokeLinejoin}
            strokeDasharray={strokeDasharray}
            setStrokeDasharray={setStrokeDasharray}
            strokeDashoffset={strokeDashoffset}
            setStrokeDashoffset={setStrokeDashoffset}
          />
        )}

        {activeTab === 'animation' && (
          <AnimationTab
            animType={animType}
            setAnimType={setAnimType}
            animDuration={animDuration}
            setAnimDuration={setAnimDuration}
            animEasing={animEasing}
            setAnimEasing={setAnimEasing}
            animDelay={animDelay}
            setAnimDelay={setAnimDelay}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        )}

        {activeTab === 'library' && <LibraryTab setRawSvg={setRawSvg} />}

        {activeTab === 'saved' && (
          <SavedTab
            savedProjects={savedProjects}
            onLoadProject={onLoadProject}
            onDeleteProject={onDeleteProject}
          />
        )}
      </div>
    </div>
  );
}
