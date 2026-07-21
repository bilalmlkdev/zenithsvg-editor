import { useState } from 'react';
import { PRESETS } from './constants/presets';
import { processSvgMarkup, generateAnimationCSS } from './utils/svgProcessors';
import FloatingNav from './components/FloatingNav';
import ViewportCanvas from './components/ViewportCanvas';
import ExportCodeView from './components/ExportCodeView';
import DockControls from './components/DockControls';
import InspectorSidebar from './components/InspectorSidebar';
import { Upload } from 'lucide-react';

export default function App() {
  const [rawSvg, setRawSvg] = useState(PRESETS[0].svg);
  const [strokeColor, setStrokeColor] = useState('#818cf8');
  const [fillColor, setFillColor] = useState('none');
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [strokeLinecap, setStrokeLinecap] = useState('round');
  const [strokeLinejoin, setStrokeLinejoin] = useState('round');

  const [animType, setAnimType] = useState('draw');
  const [animDuration, setAnimDuration] = useState(2.5);
  const [animEasing, setAnimEasing] = useState('cubic-bezier(0.4, 0, 0.2, 1)');
  const [isPlaying, setIsPlaying] = useState(false);

  const [exportFormat, setExportFormat] = useState('svg');
  const [activeView, setActiveView] = useState('canvas');
  const [zoom, setZoom] = useState(100);
  const [gridStyle, setGridStyle] = useState('dots');
  const [copied, setCopied] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState('properties');

  const processedSvg = processSvgMarkup(rawSvg, {
    strokeColor, fillColor, strokeWidth, strokeLinecap, strokeLinejoin
  });

  const animCSS = generateAnimationCSS({ isPlaying: true, animType, animDuration, animEasing, strokeColor });

  const getFormattedCode = () => {
    if (exportFormat === 'svg') return processedSvg;
    if (exportFormat === 'jsx') {
      const jsxBody = processedSvg
        .replace(/stroke-width=/g, 'strokeWidth=')
        .replace(/stroke-linecap=/g, 'strokeLinecap=')
        .replace(/stroke-linejoin=/g, 'strokeLinejoin=');
      return `import React from 'react';\n\nexport const VectorIcon = (props) => (\n  ${jsxBody}\n);`;
    }
    if (exportFormat === 'tailwind') {
      return processedSvg.replace('<svg', `<svg className="w-6 h-6 text-indigo-400 stroke-2"`);
    }
    if (exportFormat === 'css_anim') {
      return `/* Keyframes stylesheet */\n${animCSS}`;
    }
    if (exportFormat === 'datauri') {
      return `data:image/svg+xml;utf8,${encodeURIComponent(processedSvg)}`;
    }
    return processedSvg;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getFormattedCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([processedSvg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pathcraft-icon.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const processFile = (file) => {
    if (file && (file.type === 'image/svg+xml' || file.name.endsWith('.svg'))) {
      const reader = new FileReader();
      reader.onload = (e) => setRawSvg(e.target.result);
      reader.readAsText(file);
    }
  };

  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-black text-zinc-100 font-sans selection:bg-indigo-500 selection:text-white antialiased">
      <style>{generateAnimationCSS({ isPlaying, animType, animDuration, animEasing, strokeColor })}</style>

      <FloatingNav
        activeView={activeView}
        setActiveView={setActiveView}
        handleFileUpload={(e) => processFile(e.target.files[0])}
      />

      <main
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          if (e.dataTransfer.files?.[0]) processFile(e.dataTransfer.files[0]);
        }}
        className="relative flex-1 flex items-center justify-center bg-black overflow-hidden"
      >
        {isDragging && (
          <div className="absolute inset-4 z-50 flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-indigo-500 bg-indigo-950/40 backdrop-blur-md transition-all">
            <Upload className="h-12 w-12 text-indigo-400 animate-bounce mb-2" />
            <p className="text-sm font-bold text-white">Drop SVG File Here</p>
          </div>
        )}

        {activeView === 'canvas' ? (
          <ViewportCanvas
            zoom={zoom}
            setZoom={setZoom}
            gridStyle={gridStyle}
            setGridStyle={setGridStyle}
            processedSvg={processedSvg}
            strokeColor={strokeColor}
            isPlaying={isPlaying}
          />
        ) : (
          <ExportCodeView
            exportFormat={exportFormat}
            setExportFormat={setExportFormat}
            formattedCode={getFormattedCode()}
          />
        )}

        <DockControls
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          handleDownload={handleDownload}
          handleCopy={handleCopy}
          copied={copied}
        />
      </main>

      <InspectorSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        rawSvg={rawSvg}
        setRawSvg={setRawSvg}
        strokeWidth={strokeWidth}
        setStrokeWidth={setStrokeWidth}
        strokeColor={strokeColor}
        setStrokeColor={setStrokeColor}
        fillColor={fillColor}
        setFillColor={setFillColor}
        strokeLinecap={strokeLinecap}
        setStrokeLinecap={setStrokeLinecap}
        strokeLinejoin={strokeLinejoin}
        setStrokeLinejoin={setStrokeLinejoin}
        animType={animType}
        setAnimType={setAnimType}
        animDuration={animDuration}
        setAnimDuration={setAnimDuration}
        animEasing={animEasing}
        setAnimEasing={setAnimEasing}
        setIsPlaying={setIsPlaying}
      />
    </div>
  );
}
