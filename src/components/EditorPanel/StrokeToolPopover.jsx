import { useState } from "react";

let strokeCounter = 0;

export default function StrokeToolPopover({ onInsert, onClose }) {
  const [color, setColor] = useState("#111827");
  const [width, setWidth] = useState(2);
  const [linecap, setLinecap] = useState("round");
  const [linejoin, setLinejoin] = useState("round");
  const [dashed, setDashed] = useState(false);
  const [dashArray, setDashArray] = useState("6 4");

  const build = () => {
    const className = `zenithStroke${++strokeCounter}`;
    const dashRule = dashed ? `stroke-dasharray: ${dashArray};` : "";
    const styleBlock = `<style>.${className} { stroke: ${color}; stroke-width: ${width}; stroke-linecap: ${linecap}; stroke-linejoin: ${linejoin}; fill: none; ${dashRule} }</style>`;
    return { className, styleBlock };
  };

  return (
    <div className="absolute top-full left-0 mt-1 w-72 bg-white dark:bg-black shadow-xl rounded-lg border border-gray-200 dark:border-gray-700 z-30 p-3.5 space-y-3 text-xs">
      <div className="font-bold text-gray-800 dark:text-gray-200 border-b border-gray-100 dark:border-gray-800 pb-2 text-sm">
        Stroke Style
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-[10px] font-semibold text-gray-500 dark:text-gray-400 mb-1">
            Color
          </label>
          <div className="flex items-center gap-1.5">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-7 h-7 rounded border border-gray-200 dark:border-gray-700 bg-transparent cursor-pointer shrink-0"
            />
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full px-2 py-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-100 outline-none font-mono"
            />
          </div>
        </div>
        <div>
          <label className="block text-[10px] font-semibold text-gray-500 dark:text-gray-400 mb-1">
            Width (px)
          </label>
          <input
            type="number"
            min={0.5}
            step={0.5}
            value={width}
            onChange={(e) => setWidth(Number(e.target.value) || 1)}
            className="w-full px-2 py-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-100 outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-[10px] font-semibold text-gray-500 dark:text-gray-400 mb-1">
            Line cap
          </label>
          <select
            value={linecap}
            onChange={(e) => setLinecap(e.target.value)}
            className="w-full px-2 py-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-100 outline-none"
          >
            <option value="butt">Butt</option>
            <option value="round">Round</option>
            <option value="square">Square</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-semibold text-gray-500 dark:text-gray-400 mb-1">
            Line join
          </label>
          <select
            value={linejoin}
            onChange={(e) => setLinejoin(e.target.value)}
            className="w-full px-2 py-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-100 outline-none"
          >
            <option value="miter">Miter</option>
            <option value="round">Round</option>
            <option value="bevel">Bevel</option>
          </select>
        </div>
      </div>

      <label className="flex items-center justify-between cursor-pointer">
        <span className="text-gray-600 dark:text-gray-400">Dashed</span>
        <input
          type="checkbox"
          checked={dashed}
          onChange={(e) => setDashed(e.target.checked)}
          className="accent-orange-500"
        />
      </label>

      {dashed && (
        <div>
          <label className="block text-[10px] font-semibold text-gray-500 dark:text-gray-400 mb-1">
            Dash array
          </label>
          <input
            type="text"
            value={dashArray}
            onChange={(e) => setDashArray(e.target.value)}
            className="w-full px-2 py-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-100 outline-none font-mono"
          />
        </div>
      )}

      <svg viewBox="0 0 200 40" className="w-full h-10">
        <line
          x1="10"
          y1="20"
          x2="190"
          y2="20"
          stroke={color}
          strokeWidth={width}
          strokeLinecap={linecap}
          strokeDasharray={dashed ? dashArray : undefined}
        />
      </svg>

      <p className="text-[10px] text-gray-400 leading-relaxed">
        Adds a reusable class in &lt;style&gt; — apply it to any shape with{" "}
        <code className="font-mono text-gray-500">class="…"</code>.
      </p>

      <div className="flex gap-2 pt-1">
        <button
          onClick={onClose}
          className="flex-1 py-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md font-medium transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => onInsert(build())}
          className="flex-1 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-medium transition-colors"
        >
          Insert
        </button>
      </div>
    </div>
  );
}
