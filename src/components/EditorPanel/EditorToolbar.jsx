import {
  FiFolder,
  FiDownload,
  FiSave,
  FiColumns,
  FiSettings,
  FiFilePlus,
  FiCode, // new icon for format
} from "react-icons/fi";
import { useRef } from "react";
import EditorSettings from "./EditorSettings";

export default function EditorToolbar({
  fileInputRef,
  onNew,
  onOpen,
  onDownloadSVG,
  onDownloadPNG,
  onSave, // now expects (projectName) and formats internally
  onFormat, // new prop
  dropdownOpen,
  setDropdownOpen,
  layoutDropdownOpen,
  setLayoutDropdownOpen,
  layoutMode,
  setLayoutMode,
  settingsOpen,
  setSettingsOpen,
  saveDropdownOpen,
  setSaveDropdownOpen,
  projectName,
  setProjectName,
  fontSize,
  setFontSize,
  tabSize,
  setTabSize,
  renderWhitespace,
  setRenderWhitespace,
  wordWrap,
  setWordWrap,
  minimap,
  setMinimap,
  lineNumbers,
  setLineNumbers,
  autoClosingBrackets,
  setAutoClosingBrackets,
  smoothScrolling,
  setSmoothScrolling,
}) {
  return (
    <div className="h-8 flex items-center gap-1 px-2 border-b border-gray-200 dark:border-gray-700 bg-gray-100/80 dark:bg-black shrink-0">
      <button
        onClick={onNew}
        className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded transition-colors"
      >
        <FiFilePlus className="w-3.5 h-3.5 stroke-[1.5]" /> New
      </button>
      <button
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded transition-colors"
      >
        <FiFolder className="w-3.5 h-3.5 stroke-[1.5]" /> Open
        <input
          type="file"
          accept=".svg"
          ref={fileInputRef}
          onChange={onOpen}
          className="hidden"
        />
      </button>

      {/* Download dropdown */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded transition-colors"
        >
          <FiDownload className="w-3.5 h-3.5 stroke-[1.5]" /> Download
        </button>
        {dropdownOpen && (
          <div className="absolute top-full left-0 mt-1 w-36 bg-white dark:bg-black shadow-lg rounded-md border border-gray-200 dark:border-gray-700 z-20">
            <button
              onClick={onDownloadSVG}
              className="block w-full text-left px-4 py-2 text-xs hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              Download as SVG
            </button>
            <button
              onClick={onDownloadPNG}
              className="block w-full text-left px-4 py-2 text-xs hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              Download as PNG
            </button>
          </div>
        )}
      </div>

      {/* Save dropdown – uses onSave which now auto‑formats */}
      <div className="relative">
        <button
          onClick={() => setSaveDropdownOpen(!saveDropdownOpen)}
          className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded transition-colors"
        >
          <FiSave className="w-3.5 h-3.5 stroke-[1.5]" /> Save
        </button>
        {saveDropdownOpen && (
          <div className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-black shadow-lg rounded-md border border-gray-200 dark:border-gray-700 z-30 p-3">
            <div className="space-y-2">
              <label className="block text-[10px] font-semibold text-gray-600 dark:text-gray-400">
                Project Name
              </label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name"
                className="w-full px-2 py-1 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-orange-500"
                autoFocus
              />
              <button
                onClick={() => {
                  if (!projectName.trim()) {
                    alert("Please enter a project name.");
                    return;
                  }
                  onSave(projectName); // this will auto‑format and save
                  setSaveDropdownOpen(false);
                  setProjectName("");
                }}
                className="w-full py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium rounded transition-colors"
              >
                Save Project (Auto‑format)
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Format button – manual format */}
      <button
        onClick={onFormat}
        className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded transition-colors"
        title="Format code with Prettier"
      >
        <FiCode className="w-3.5 h-3.5 stroke-[1.5]" /> Format
      </button>

      {/* Layout dropdown */}
      <div className="relative ml-auto">
        <button
          onClick={() => {
            setLayoutDropdownOpen(!layoutDropdownOpen);
            setSettingsOpen(false);
          }}
          className="p-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded transition-colors"
          title="Layout Views"
        >
          <FiColumns className="w-4 h-4 stroke-[1.5]" />
        </button>
        {layoutDropdownOpen && (
          <div className="absolute right-0 top-full mt-1 w-40 bg-white dark:bg-black shadow-xl rounded-lg border border-gray-200 dark:border-gray-700 z-30 p-1.5 space-y-1 text-xs">
            <div className="px-2 py-1 font-bold text-gray-400 uppercase text-[10px] tracking-wider border-b border-gray-100 dark:border-gray-800">
              View Layout
            </div>
            <button
              onClick={() => {
                setLayoutMode("show-both");
                setLayoutDropdownOpen(false);
              }}
              className={`w-full text-left px-2.5 py-1.5 rounded flex items-center justify-between ${
                layoutMode === "show-both"
                  ? "bg-orange-500 text-white font-semibold"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <span>Show Both</span>
              {layoutMode === "show-both" && (
                <span className="text-[10px]">✓</span>
              )}
            </button>
            <button
              onClick={() => {
                setLayoutMode("hide-preview");
                setLayoutDropdownOpen(false);
              }}
              className={`w-full text-left px-2.5 py-1.5 rounded flex items-center justify-between ${
                layoutMode === "hide-preview"
                  ? "bg-orange-500 text-white font-semibold"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <span>Hide Preview</span>
              {layoutMode === "hide-preview" && (
                <span className="text-[10px]">✓</span>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Settings gear + dropdown */}
      <div className="relative">
        <button
          onClick={() => {
            setSettingsOpen(!settingsOpen);
            setLayoutDropdownOpen(false);
          }}
          className="p-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded transition-colors"
          title="Editor Settings"
        >
          <FiSettings className="w-4 h-4 stroke-[1.5]" />
        </button>
        {settingsOpen && (
          <EditorSettings
            fontSize={fontSize}
            setFontSize={setFontSize}
            tabSize={tabSize}
            setTabSize={setTabSize}
            renderWhitespace={renderWhitespace}
            setRenderWhitespace={setRenderWhitespace}
            wordWrap={wordWrap}
            setWordWrap={setWordWrap}
            minimap={minimap}
            setMinimap={setMinimap}
            lineNumbers={lineNumbers}
            setLineNumbers={setLineNumbers}
            autoClosingBrackets={autoClosingBrackets}
            setAutoClosingBrackets={setAutoClosingBrackets}
            smoothScrolling={smoothScrolling}
            setSmoothScrolling={setSmoothScrolling}
            onClose={() => setSettingsOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
