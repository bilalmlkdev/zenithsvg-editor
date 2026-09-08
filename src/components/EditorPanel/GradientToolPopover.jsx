import { useState } from "react";

let gradCounter = 0;

export default function GradientToolPopover({ onInsert, onClose }) {
  const [type, setType] = useState("linear");
  const [angle, setAngle] = useState(90);
  const [colorA, setColorA] = useState("#f97316");
  const [colorB, setColorB] = useState("#ec4899");

  const buildSnippet = () => {
    const id = `zenithGradient${++gradCounter}`;
    let defs;
    if (type === "linear") {
      const rad = (angle * Math.PI) / 180;
      const x1 = 50 - Math.cos(rad) * 50;
      const y1 = 50 - Math.sin(rad) * 50;
      const x2 = 50 + Math.cos(rad) * 50;
      const y2 = 50 + Math.sin(rad) * 50;
      defs = `<linearGradient id="${id}" x1="${x1.toFixed(0)}%" y1="${y1.toFixed(0)}%" x2="${x2.toFixed(0)}%" y2="${y2.toFixed(0)}%"><stop offset="0%" stop-color="${colorA}"/><stop offset="100%" stop-color="${colorB}"/></linearGradient>`;
    } else {
      defs = `<radialGradient id="${id}"><stop offset="0%" stop-color="${colorA}"/><stop offset="100%" stop-color="${colorB}"/></radialGradient>`;
    }
    return { id, defsSnippet: `<defs>${defs}</defs>` };
  };

  const preview = (() => {
    if (type === "linear") {
      return `linear-gradient(${angle}deg, ${colorA}, ${colorB})`;
    }
    return `radial-gradient(circle, ${colorA}, ${colorB})`;
  })();

  return (
    <div className="absolute top-full left-0 mt-1 w-72 bg-white dark:bg-black shadow-xl rounded-lg border border-gray-200 dark:border-gray-700 z-30 p-3.5 space-y-3 text-xs">
      <div className="font-bold text-gray-800 dark:text-gray-200 border-b border-gray-100 dark:border-gray-800 pb-2 text-sm">
        Add Gradient Fill
      </div>

      <div className="flex gap-2">
        {["linear", "radial"].map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`flex-1 py-1.5 rounded-md font-medium capitalize transition-colors ${
              type === t
                ? "bg-orange-500 text-white"
                : "bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-[10px] font-semibold text-gray-500 dark:text-gray-400 mb-1">
            Color A
          </label>
          <div className="flex items-center gap-1.5">
            <input
              type="color"
              value={colorA}
              onChange={(e) => setColorA(e.target.value)}
              className="w-7 h-7 rounded border border-gray-200 dark:border-gray-700 bg-transparent cursor-pointer shrink-0"
            />
            <input
              type="text"
              value={colorA}
              onChange={(e) => setColorA(e.target.value)}
              className="w-full px-2 py-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-100 outline-none font-mono"
            />
          </div>
        </div>
        <div>
          <label className="block text-[10px] font-semibold text-gray-500 dark:text-gray-400 mb-1">
            Color B
          </label>
          <div className="flex items-center gap-1.5">
            <input
              type="color"
              value={colorB}
              onChange={(e) => setColorB(e.target.value)}
              className="w-7 h-7 rounded border border-gray-200 dark:border-gray-700 bg-transparent cursor-pointer shrink-0"
            />
            <input
              type="text"
              value={colorB}
              onChange={(e) => setColorB(e.target.value)}
              className="w-full px-2 py-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-100 outline-none font-mono"
            />
          </div>
        </div>
      </div>

      {type === "linear" && (
        <div>
          <label className="block text-[10px] font-semibold text-gray-500 dark:text-gray-400 mb-1">
            Angle: {angle}°
          </label>
          <input
            type="range"
            min={0}
            max={360}
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            className="w-full accent-orange-500"
          />
        </div>
      )}

      <div
        className="h-12 rounded-md border border-gray-200 dark:border-gray-700"
        style={{ background: preview }}
      />

      <p className="text-[10px] text-gray-400 leading-relaxed">
        Inserts a gradient into &lt;defs&gt; and gives you the fill id to
        apply — e.g.{" "}
        <code className="font-mono text-gray-500">fill="url(#id)"</code>.
      </p>

      <div className="flex gap-2 pt-1">
        <button
          onClick={onClose}
          className="flex-1 py-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md font-medium transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => onInsert(buildSnippet())}
          className="flex-1 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-medium transition-colors"
        >
          Insert
        </button>
      </div>
    </div>
  );
}
