 import { useState } from 'react';
import { Upload } from 'lucide-react';
import { PRESETS } from './constants/presets';
import { processSvgMarkup, generateAnimationCSS, optimizeSvgMarkup } from './utils/svgProcessors';
import { useTheme } from './hooks/useTheme';
import { useSvgState } from './hooks/useSvgState';
import { useAnimationState } from './hooks/useAnimationState';
import { useHistory } from './hooks/useHistory';
import { useSavedProjects } from './hooks/useSavedProjects';
import LeftRail from './components/LeftRail';
import SidePanel from './components/SidePanel';
import TopBar from './components/TopBar';
import ViewportCanvas from './components/ViewportCanvas';
import CodeModal from './components/CodeModal';
import SaveModal from './components/SaveModal';

export default function App() {
  const { theme, setTheme, resolved } = useTheme();

  // SVG state
  const svgState = useSvgState(PRESETS[0].svg);
  const {
    rawSvg, setRawSvg,
    strokeColor, setStrokeColor,
    fillColor, setFillColor,
    strokeWidth, setStrokeWidth,
    strokeLinecap, setStrokeLinecap,
    strokeLinejoin, setStrokeLinejoin,
    strokeDasharray, setStrokeDasharray,
    strokeDashoffset, setStrokeDashoffset,
  } = svgState;

  // Animation state
  const animState = useAnimationState();
  const {
    animType, setAnimType,
    animDuration, setAnimDuration,
    animEasing, setAnimEasing,
    animDelay, setAnimDelay,
    isPlaying, setIsPlaying,
  } = animState;

  // History (undo/redo)
  const initialState = { rawSvg, strokeColor, fillColor, strokeWidth, strokeLinecap, strokeLinejoin, strokeDasharray, strokeDashoffset, animType, animDuration, animEasing, animDelay };
  const { pushHistory, undo, redo, canUndo, canRedo } = useHistory(initialState);

  // Saved projects
  const { savedProjects, saveProject, deleteProject } = useSavedProjects();

  // UI state
  const [activeTab, setActiveTab] = useState('upload');
  const [panelOpen, setPanelOpen] = useState(true);
  const [zoom, setZoom] = useState(100);
  const [gridStyle, setGridStyle] = useState('dots');
  const [isDragging, setIsDragging] = useState(false);
  const [exportFormat, setExportFormat] = useState('svg');
  const [codeModalOpen, setCodeModalOpen] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);

  // Helper to get current state snapshot
  const getCurrentState = () => ({
    rawSvg, strokeColor, fillColor, strokeWidth, strokeLinecap, strokeLinejoin,
    strokeDasharray, strokeDashoffset, animType, animDuration, animEasing, animDelay,
  });

  // History‑aware setters
  const setWithHistory = (key, value) => {
    const newState = { ...getCurrentState(), [key]: value };
    switch (key) {
      case 'rawSvg': setRawSvg(value); break;
      case 'strokeColor': setStrokeColor(value); break;
      case 'fillColor': setFillColor(value); break;
      case 'strokeWidth': setStrokeWidth(value); break;
      default: break;
    }
    pushHistory(newState);
  };

  const applyStateSnapshot = (s) => {
    if (!s) return;
    if (s.rawSvg !== undefined) setRawSvg(s.rawSvg);
    if (s.strokeColor !== undefined) setStrokeColor(s.strokeColor);
    if (s.fillColor !== undefined) setFillColor(s.fillColor);
    if (s.strokeWidth !== undefined) setStrokeWidth(s.strokeWidth);
    if (s.strokeLinecap !== undefined) setStrokeLinecap(s.strokeLinecap);
    if (s.strokeLinejoin !== undefined) setStrokeLinejoin(s.strokeLinejoin);
    if (s.strokeDasharray !== undefined) setStrokeDasharray(s.strokeDasharray);
    if (s.strokeDashoffset !== undefined) setStrokeDashoffset(s.strokeDashoffset);
    if (s.animType !== undefined) setAnimType(s.animType);
    if (s.animDuration !== undefined) setAnimDuration(s.animDuration);
    if (s.animEasing !== undefined) setAnimEasing(s.animEasing);
    if (s.animDelay !== undefined) setAnimDelay(s.animDelay);
  };

  const handleUndo = () => { const state = undo(); if (state) applyStateSnapshot(state); };
  const handleRedo = () => { const state = redo(); if (state) applyStateSnapshot(state); };

  // Process SVG
  const processedSvg = processSvgMarkup(rawSvg, {
    strokeColor, fillColor, strokeWidth, strokeLinecap, strokeLinejoin,
    strokeDasharray, strokeDashoffset,
  });
  const optStats = optimizeSvgMarkup(processedSvg);
  const animCSS = generateAnimationCSS({
    isPlaying, animType, animDuration, animEasing, animDelay, strokeColor,
  });

  // Code generation
  const getFormattedCode = () => {
    if (exportFormat === 'svg') return processedSvg;
    if (exportFormat === 'opt_svg') return optStats.optimized;
    if (exportFormat === 'jsx') {
      const jsxBody = processedSvg
        .replace(/stroke-width=/g, 'strokeWidth=')
        .replace(/stroke-linecap=/g, 'strokeLinecap=')
        .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
        .replace(/stroke-dasharray=/g, 'strokeDasharray=')
        .replace(/stroke-dashoffset=/g, 'strokeDashoffset=');
      return `import React from 'react';\n\nexport const VectorIcon = (props) => (\n  ${jsxBody}\n);`;
    }
    if (exportFormat === 'tailwind') return processedSvg.replace('<svg', `<svg className="w-6 h-6 text-indigo-400 stroke-2"`);
    if (exportFormat === 'css_anim') return `/* Keyframes stylesheet */\n${animCSS}`;
    if (exportFormat === 'datauri') return `data:image/svg+xml;utf8,${encodeURIComponent(processedSvg)}`;
    return processedSvg;
  };

  const handleDownload = () => {
    const blob = new Blob([exportFormat === 'opt_svg' ? optStats.optimized : processedSvg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement('a'), { href: url, download: 'pathcraft-icon.svg' });
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSaveProject = ({ name, description, date }) => {
    saveProject({
      name, description, date,
      rawSvg, strokeColor, fillColor, strokeWidth, strokeLinecap, strokeLinejoin,
      strokeDasharray, strokeDashoffset, animType, animDuration, animEasing, animDelay,
      svg: processedSvg,
    });
  };

  const processFile = (file) => {
    if (file && (file.type === 'image/svg+xml' || file.name.endsWith('.svg'))) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const svg = e.target.result;
        setRawSvg(svg);
        pushHistory({ ...getCurrentState(), rawSvg: svg });
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen font-poppins antialiased bg-[var(--bg-base)] text-[var(--text-primary)] py-5">
      <style>{animCSS}</style>

      <div className="relative bottom-2.5 z-30">
        <TopBar theme={theme} setTheme={setTheme} resolved={resolved} />
      </div>

      <div className="flex flex-1 min-h-0 w-full max-w-[1310px] mx-auto overflow-hidden">
        <LeftRail
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          panelOpen={panelOpen}
          setPanelOpen={setPanelOpen}
        />

        <SidePanel
          activeTab={activeTab}
          panelOpen={panelOpen}
          rawSvg={rawSvg}
          setRawSvg={v => setWithHistory('rawSvg', v)}
          strokeWidth={strokeWidth}
          setStrokeWidth={v => setWithHistory('strokeWidth', v)}
          strokeColor={strokeColor}
          setStrokeColor={v => setWithHistory('strokeColor', v)}
          fillColor={fillColor}
          setFillColor={v => setWithHistory('fillColor', v)}
          strokeLinecap={strokeLinecap}
          setStrokeLinecap={setStrokeLinecap}
          strokeLinejoin={strokeLinejoin}
          setStrokeLinejoin={setStrokeLinejoin}
          strokeDasharray={strokeDasharray}
          setStrokeDasharray={setStrokeDasharray}
          strokeDashoffset={strokeDashoffset}
          setStrokeDashoffset={setStrokeDashoffset}
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
          savedProjects={savedProjects}
          onLoadProject={applyStateSnapshot}
          onDeleteProject={deleteProject}
          onProcessFile={processFile}
        />

        <div className="flex flex-col flex-1 min-w-0 overflow-hidden ml-2">
          <div
            className="relative flex-1"
            onDragOver={e => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={e => {
              e.preventDefault();
              setIsDragging(false);
            }}
            onDrop={e => {
              e.preventDefault();
              setIsDragging(false);
              if (e.dataTransfer.files?.[0]) processFile(e.dataTransfer.files[0]);
            }}
          >
            {isDragging && (
              <div className="absolute inset-4 z-50 flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-indigo-500 bg-indigo-50/80 dark:bg-indigo-950/40 backdrop-blur-md">
                <Upload className="h-12 w-12 text-indigo-500 animate-bounce mb-2" />
                <p className="text-sm font-bold text-[var(--text-primary)]">Drop SVG File Here</p>
              </div>
            )}
            <ViewportCanvas
              zoom={zoom}
              setZoom={setZoom}
              gridStyle={gridStyle}
              setGridStyle={setGridStyle}
              processedSvg={processedSvg}
              isPlaying={isPlaying}
              canUndo={canUndo}
              canRedo={canRedo}
              onUndo={handleUndo}
              onRedo={handleRedo}
              onQuickSave={() => setSaveModalOpen(true)}
              onOpenCodeModal={() => setCodeModalOpen(true)}
              setIsPlaying={setIsPlaying}
            />
          </div>
        </div>
      </div>

      <CodeModal
        isOpen={codeModalOpen}
        onClose={() => setCodeModalOpen(false)}
        exportFormat={exportFormat}
        setExportFormat={setExportFormat}
        formattedCode={getFormattedCode()}
        optStats={optStats}
        handleDownload={handleDownload}
      />

      <SaveModal
        isOpen={saveModalOpen}
        onClose={() => setSaveModalOpen(false)}
        onSave={handleSaveProject}
      />
    </div>
  );
}
