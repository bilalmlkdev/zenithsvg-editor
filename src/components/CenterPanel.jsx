import  { useRef, useState, useEffect } from "react";
import {
  Copy,
  Download,
  Upload,
  RotateCcw,
  RotateCw,
} from "lucide-react";
import { initialSvg } from "../data/svgs";

const CenterPanel = ({ code, setCode }) => {
  const textareaRef = useRef(null);
  const lineNumbersRef = useRef(null);

  // Undo/Redo Logic
  const [history, setHistory] = useState([initialSvg]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const handleChange = (newCode) => {
    setCode(newCode);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newCode);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCode(history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCode(history[historyIndex + 1]);
    }
  };

  const clearEditor = () => {
    setCode("");
    setHistory([""]);
    setHistoryIndex(0);
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

  // Handle Scroll Sync for Line Numbers
  useEffect(() => {
    if (lineNumbersRef.current && textareaRef.current) {
      const syncScroll = () => {
        lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
      };
      textareaRef.current.addEventListener("scroll", syncScroll);
      return () =>
        textareaRef.current?.removeEventListener("scroll", syncScroll);
    }
  }, []);

  return (
    <div className="w-full h-full flex flex-col bg-[#1e1e1e] relative">
      {/* Toolbar */}
      <div className="h-12 flex items-center justify-between px-4 border-b border-[#333] bg-[#252526]">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">Line 1:0</span>
          <div className="h-4 w-[1px] bg-gray-600 mx-1"></div>
          <button onClick={undo} className="text-gray-400 hover:text-white">
            <RotateCcw size={14} />
          </button>
          <button onClick={redo} className="text-gray-400 hover:text-white">
            <RotateCw size={14} />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 bg-[#333] px-2 py-1 rounded">
            Optimize
          </span>
          <span className="text-xs text-gray-400 bg-[#333] px-2 py-1 rounded">
            Prettified
          </span>
          <button
            onClick={clearEditor}
            className="text-gray-400 hover:text-red-400 text-xs ml-2"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 overflow-hidden relative bg-[#1e1e1e]">
        <div className="flex h-full font-mono text-sm leading-[1.5]">
          {/* Line Numbers */}
          <div
            ref={lineNumbersRef}
            className="w-12 text-right text-gray-500 pt-2 pr-2 overflow-hidden select-none border-r border-[#333] bg-[#1e1e1e]"
          >
            {code.split("\n").map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          {/* Code Input */}
          <textarea
            ref={textareaRef}
            className="flex-1 h-full bg-transparent border-none outline-none resize-none p-2 text-gray-300 whitespace-pre overflow-auto"
            value={code}
            onChange={(e) => handleChange(e.target.value)}
            spellCheck={false}
          />
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="h-14 flex items-center px-4 border-t border-[#333] bg-[#252526]">
        <button className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1.5 rounded-md text-xs font-medium mr-auto flex items-center gap-1">
          <Upload size={14} /> Upload
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-gray-300 hover:text-white text-xs bg-[#333] px-3 py-1.5 rounded-md"
          >
            <Copy size={14} /> Copy
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1 text-gray-300 hover:text-white text-xs bg-[#333] px-3 py-1.5 rounded-md"
          >
            <Download size={14} /> Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default CenterPanel;
