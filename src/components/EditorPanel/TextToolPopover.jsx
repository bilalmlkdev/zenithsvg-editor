import { useState } from "react";
import { FONT_OPTIONS, FONT_WEIGHTS } from "../../lib/fonts";

export default function TextToolPopover({ onInsert, onClose }) {
  const [text, setText] = useState("Hello");
  const [font, setFont] = useState(FONT_OPTIONS[0].value);
  const [size, setSize] = useState(48);
  const [weight, setWeight] = useState("700");
  const [fill, setFill] = useState("#111827");
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [x, setX] = useState(20);
  const [y, setY] = useState(60);

  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const snippet = `<text x="${x}" y="${y}" font-family="${font}" font-size="${size}" font-weight="${weight}" letter-spacing="${letterSpacing}" fill="${fill}">${escaped}</text>`;

  return (
    <div className="absolute top-full left-0 mt-1 w-72 bg-white dark:bg-black shadow-xl rounded-lg border border-gray-200 dark:border-gray-700 z-30 p-3.5 space-y-3 text-xs max-h-[420px] overflow-y-auto">
      <div className="font-bold text-gray-800 dark:text-gray-200 border-b border-gray-100 dark:border-gray-800 pb-2 text-sm">
        Insert Text
      </div>

      <div>
        <label className="block text-[10px] font-semibold text-gray-500 dark:text-gray-400 mb-1">
          Content
        </label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full px-2 py-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-orange-500"
        />
      </div>

      <div>
        <label className="block text-[10px] font-semibold text-gray-500 dark:text-gray-400 mb-1">
          Font
        </label>
        <select
          value={font}
          onChange={(e) => setFont(e.target.value)}
          className="w-full px-2 py-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-100 outline-none"
        >
          {FONT_OPTIONS.map((f) => (
            <option key={f.label} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-[10px] font-semibold text-gray-500 dark:text-gray-400 mb-1">
            Weight
          </label>
          <select
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-2 py-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-100 outline-none"
          >
            {FONT_WEIGHTS.map((w) => (
              <option key={w.value} value={w.value}>
                {w.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-semibold text-gray-500 dark:text-gray-400 mb-1">
            Size (px)
          </label>
          <input
            type="number"
            min={4}
            max={400}
            value={size}
            onChange={(e) => setSize(Number(e.target.value) || 1)}
            className="w-full px-2 py-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-100 outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-[10px] font-semibold text-gray-500 dark:text-gray-400 mb-1">
            Fill color
          </label>
          <div className="flex items-center gap-1.5">
            <input
              type="color"
              value={fill}
              onChange={(e) => setFill(e.target.value)}
              className="w-7 h-7 rounded border border-gray-200 dark:border-gray-700 bg-transparent cursor-pointer shrink-0"
            />
            <input
              type="text"
              value={fill}
              onChange={(e) => setFill(e.target.value)}
              className="w-full px-2 py-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-100 outline-none font-mono"
            />
          </div>
        </div>
        <div>
          <label className="block text-[10px] font-semibold text-gray-500 dark:text-gray-400 mb-1">
            Letter spacing
          </label>
          <input
            type="number"
            step={0.1}
            value={letterSpacing}
            onChange={(e) => setLetterSpacing(Number(e.target.value) || 0)}
            className="w-full px-2 py-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-100 outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-[10px] font-semibold text-gray-500 dark:text-gray-400 mb-1">
            X
          </label>
          <input
            type="number"
            value={x}
            onChange={(e) => setX(Number(e.target.value) || 0)}
            className="w-full px-2 py-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-100 outline-none"
          />
        </div>
        <div>
          <label className="block text-[10px] font-semibold text-gray-500 dark:text-gray-400 mb-1">
            Y
          </label>
          <input
            type="number"
            value={y}
            onChange={(e) => setY(Number(e.target.value) || 0)}
            className="w-full px-2 py-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-100 outline-none"
          />
        </div>
      </div>

      {/* Live preview swatch */}
      <div className="rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-3 flex items-center justify-center overflow-hidden">
        <span
          style={{
            fontFamily: font,
            fontSize: Math.min(size, 32),
            fontWeight: weight,
            color: fill,
            letterSpacing,
          }}
        >
          {text || "Preview"}
        </span>
      </div>

      <div className="flex gap-2 pt-1">
        <button
          onClick={onClose}
          className="flex-1 py-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md font-medium transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => onInsert(snippet)}
          className="flex-1 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-medium transition-colors"
        >
          Insert
        </button>
      </div>
    </div>
  );
}
