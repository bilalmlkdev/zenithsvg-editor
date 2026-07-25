import React, { useState, useEffect } from "react";
import {
  Copy,
  Download,
  Upload,
  RotateCcw,
  RotateCw,
  Settings,
  Maximize2,
  X,
  AlertCircle,
} from "lucide-react";
import Editor from "@monaco-editor/react";
import { initialSvg } from "../data/svgs";

const CenterPanel = ({ code, setCode }) => {
  // Undo/Redo Logic
  const [history, setHistory] = useState([initialSvg]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // UI Popups State
  const [showDimensions, setShowDimensions] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Validation State
  const [svgError, setSvgError] = useState(null);

  // Cursor / Line Position State
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });

  // Dimensions State
  const [svgWidth, setSvgWidth] = useState("400");
  const [svgHeight, setSvgHeight] = useState("400");

  // Practical Editor & SVG Settings State
  const [editorSettings, setEditorSettings] = useState({
    wordWrap: true,
    fontSize: 14,
    tabSize: 2,
    removeComments: true,
    removeMetadata: true,
    minify: false,
  });

  // Extract dimensions from SVG code on load or change
  useEffect(() => {
    const widthMatch = code.match(/width="([^"]*)"/);
    const heightMatch = code.match(/height="([^"]*)"/);
    if (widthMatch) setSvgWidth(widthMatch[1].replace(/px$/, ""));
    if (heightMatch) setSvgHeight(heightMatch[1].replace(/px$/, ""));
  }, [code]);

  // Validate that code is strictly SVG
  const validateSvg = (value) => {
    const trimmed = value.trim();
    if (trimmed === "") {
      setSvgError("Editor is empty.");
      return;
    }
    const hasSvgTag = /<svg[\s\S]*?>[\s\S]*?<\/svg>/i.test(trimmed);
    if (!hasSvgTag) {
      setSvgError("Invalid format: Editor only supports valid SVG code.");
    } else {
      setSvgError(null);
    }
  };

  const handleChange = (newCode) => {
    setCode(newCode);
    validateSvg(newCode);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newCode);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  // Live update dimensions in SVG code
  const handleDimensionChange = (type, value) => {
    if (type === "width") {
      setSvgWidth(value);
      const updated = code.includes("width=")
        ? code.replace(/width="[^"]*"/, `width="${value}"`)
        : code.replace("<svg", `<svg width="${value}"`);
      handleChange(updated);
    } else {
      setSvgHeight(value);
      const updated = code.includes("height=")
        ? code.replace(/height="[^"]*"/, `height="${value}"`)
        : code.replace("<svg", `<svg height="${value}"`);
      handleChange(updated);
    }
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      const prevCode = history[historyIndex - 1];
      setCode(prevCode);
      validateSvg(prevCode);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      const nextCode = history[historyIndex + 1];
      setCode(nextCode);
      validateSvg(nextCode);
    }
  };

  const clearEditor = () => {
    setCode("");
    setHistory([""]);
    setHistoryIndex(0);
    setSvgError("Editor is empty.");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "icon.svg";
    a.click();
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#1e1e1e] relative overflow-hidden">
      {/* Toolbar */}
      <div className="h-12 flex items-center justify-between px-4 border-b border-[#333] bg-[#252526] relative z-20">
        <div className="flex items-center gap-2">
          {/* Dimensions Button & Popup */}
          <div className="relative">
            <button
              onClick={() => {
                setShowDimensions(!showDimensions);
                setShowSettings(false);
              }}
              className="flex items-center gap-1.5 bg-[#333] hover:bg-[#444] text-gray-300 px-2.5 py-1 rounded text-xs transition"
            >
              <Maximize2 size={12} />
              <span>
                {svgWidth}px x {svgHeight}px
              </span>
            </button>

            {/* Dimensions Popup Box */}
            {showDimensions && (
              <div className="absolute top-10 left-0 z-50 bg-[#252526] border border-[#444] rounded-lg shadow-2xl p-4 w-64 text-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                    Dimensions
                  </span>
                  <button
                    onClick={() => setShowDimensions(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X size={14} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-gray-400 block mb-1">
                      W
                    </label>
                    <input
                      type="number"
                      value={svgWidth}
                      onChange={(e) =>
                        handleDimensionChange("width", e.target.value)
                      }
                      className="w-full bg-[#1e1e1e] border border-[#444] rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-400 block mb-1">
                      H
                    </label>
                    <input
                      type="number"
                      value={svgHeight}
                      onChange={(e) =>
                        handleDimensionChange("height", e.target.value)
                      }
                      className="w-full bg-[#1e1e1e] border border-[#444] rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <span className="text-xs text-gray-400 ml-1 font-mono">
            Line {cursorPos.line}:{cursorPos.col}
          </span>
          <div className="h-4 w-[1px] bg-gray-600 mx-1"></div>
          <button
            onClick={undo}
            disabled={historyIndex === 0}
            className="text-gray-400 hover:text-white disabled:opacity-40"
          >
            <RotateCcw size={14} />
          </button>
          <button
            onClick={redo}
            disabled={historyIndex === history.length - 1}
            className="text-gray-400 hover:text-white disabled:opacity-40"
          >
            <RotateCw size={14} />
          </button>
        </div>

        {/* Right Toolbar Actions */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-green-400 bg-[#1e1e1e] border border-green-900/50 px-2 py-1 rounded font-mono">
            SVG Validated
          </span>
          <button
            onClick={() => {
              setShowSettings(true);
              setShowDimensions(false);
            }}
            className="text-gray-400 hover:text-white p-1 rounded transition bg-[#333] hover:bg-[#444]"
          >
            <Settings size={16} />
          </button>
          <button
            onClick={clearEditor}
            className="text-gray-400 hover:text-red-400 text-xs ml-1 px-2 py-1"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Settings Modal Contained Inside CenterPanel Inset */}
      {showSettings && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-[2px] flex items-center justify-center p-4">
          <div className="bg-[#252526] border border-[#444] rounded-xl shadow-2xl w-full max-w-md p-6 text-gray-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#333] mb-4">
              <h3 className="text-sm font-bold tracking-wider text-white uppercase flex items-center gap-2">
                <Settings size={16} className="text-orange-500" /> Editor & SVG
                Settings
              </h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Word Wrap Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-white block">
                    Word Wrap
                  </span>
                  <span className="text-gray-400 text-[10px]">
                    Wrap long lines automatically
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={editorSettings.wordWrap}
                  onChange={(e) =>
                    setEditorSettings({
                      ...editorSettings,
                      wordWrap: e.target.checked,
                    })
                  }
                  className="rounded bg-[#1e1e1e] border-gray-600 text-orange-600 focus:ring-0 w-4 h-4 cursor-pointer"
                />
              </div>

              {/* Tab Size */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-white block">Tab Size</span>
                  <span className="text-gray-400 text-[10px]">
                    Spaces per indentation level
                  </span>
                </div>
                <select
                  value={editorSettings.tabSize}
                  onChange={(e) =>
                    setEditorSettings({
                      ...editorSettings,
                      tabSize: Number(e.target.value),
                    })
                  }
                  className="bg-[#1e1e1e] border border-[#444] text-white rounded px-2 py-1 focus:outline-none focus:border-orange-500"
                >
                  <option value={2}>2 spaces</option>
                  <option value={4}>4 spaces</option>
                </select>
              </div>

              {/* Font Size */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-white block">
                    Font Size
                  </span>
                  <span className="text-gray-400 text-[10px]">
                    Editor text size in pixels
                  </span>
                </div>
                <select
                  value={editorSettings.fontSize}
                  onChange={(e) =>
                    setEditorSettings({
                      ...editorSettings,
                      fontSize: Number(e.target.value),
                    })
                  }
                  className="bg-[#1e1e1e] border border-[#444] text-white rounded px-2 py-1 focus:outline-none focus:border-orange-500"
                >
                  <option value={12}>12px</option>
                  <option value={14}>14px</option>
                  <option value={16}>16px</option>
                  <option value={18}>18px</option>
                </select>
              </div>

              <div className="border-t border-[#333] pt-3">
                <span className="text-[11px] text-orange-400 font-semibold uppercase tracking-wider block mb-3">
                  SVG Cleanup Preferences
                </span>

                <div className="space-y-3">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-gray-300">Remove Comments</span>
                    <input
                      type="checkbox"
                      checked={editorSettings.removeComments}
                      onChange={(e) =>
                        setEditorSettings({
                          ...editorSettings,
                          removeComments: e.target.checked,
                        })
                      }
                      className="rounded bg-[#1e1e1e] border-gray-600 text-orange-600 focus:ring-0 w-4 h-4 cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-gray-300">
                      Remove Metadata / Desc
                    </span>
                    <input
                      type="checkbox"
                      checked={editorSettings.removeMetadata}
                      onChange={(e) =>
                        setEditorSettings({
                          ...editorSettings,
                          removeMetadata: e.target.checked,
                        })
                      }
                      className="rounded bg-[#1e1e1e] border-gray-600 text-orange-600 focus:ring-0 w-4 h-4 cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-gray-300">Compact Minify Output</span>
                    <input
                      type="checkbox"
                      checked={editorSettings.minify}
                      onChange={(e) =>
                        setEditorSettings({
                          ...editorSettings,
                          minify: e.target.checked,
                        })
                      }
                      className="rounded bg-[#1e1e1e] border-gray-600 text-orange-600 focus:ring-0 w-4 h-4 cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowSettings(false)}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-1.5 rounded text-xs font-medium transition"
              >
                Save & Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Banner if not SVG */}
      {svgError && (
        <div className="bg-red-900/80 border-b border-red-700 text-red-200 px-4 py-1.5 text-xs flex items-center gap-2 z-10">
          <AlertCircle size={14} className="text-red-400 shrink-0" />
          <span>{svgError}</span>
        </div>
      )}

      {/* Monaco Editor Area */}
      <div className="flex-1 overflow-hidden relative bg-[#1e1e1e]">
        <Editor
          height="100%"
          language="xml"
          theme="vs-dark"
          value={code}
          onChange={(value) => handleChange(value || "")}
          onMount={(editor) => {
            editor.onDidChangeCursorPosition((e) => {
              setCursorPos({
                line: e.position.lineNumber,
                col: e.position.column,
              });
            });
          }}
          options={{
            wordWrap: editorSettings.wordWrap ? "on" : "off",
            minimap: { enabled: false },
            fontSize: editorSettings.fontSize,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: editorSettings.tabSize,
            scrollbar: {
              verticalScrollbarSize: 8,
              horizontalScrollbarSize: 8,
            },
          }}
        />
      </div>

      {/* Bottom Actions */}
      <div className="h-14 flex items-center px-4 border-t border-[#333] bg-[#252526]">
        <label className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1.5 rounded-md text-xs font-medium mr-auto flex items-center gap-1 cursor-pointer transition">
          <Upload size={14} /> Upload
          <input
            type="file"
            accept=".svg"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                  if (event.target?.result) {
                    handleChange(event.target.result);
                  }
                };
                reader.readAsText(file);
              }
            }}
          />
        </label>
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-gray-300 hover:text-white text-xs bg-[#333] hover:bg-[#444] px-3 py-1.5 rounded-md transition"
          >
            <Copy size={14} /> Copy
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1 text-gray-300 hover:text-white text-xs bg-[#333] hover:bg-[#444] px-3 py-1.5 rounded-md transition"
          >
            <Download size={14} /> Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default CenterPanel;
