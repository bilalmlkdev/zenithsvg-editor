import { FiZoomIn, FiZoomOut, FiRotateCcw, FiMaximize2 } from "react-icons/fi";
import DimensionsDropdown from "./DimensionsDropdown";
import { bgOptions } from "./bgOptions.jsx";

export default function PreviewToolbar({
  zoomIn,
  zoomOut,
  resetTransform,
  bgColor,
  setBgColor,
  showDimDropdown,
  setShowDimDropdown,
  svgCode,
  setSvgCode,
}) {
  return (
    <div className="h-8 px-2 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-gray-100/80 dark:bg-gray-900/50 shrink-0">
      <div className="flex items-center gap-1.5">
        <button
          onClick={zoomIn}
          className="p-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors"
          title="Zoom In"
        >
          <FiZoomIn className="w-3.5 h-3.5 stroke-[1.5]" />
        </button>
        <button
          onClick={zoomOut}
          className="p-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors"
          title="Zoom Out"
        >
          <FiZoomOut className="w-3.5 h-3.5 stroke-[1.5]" />
        </button>
        <button
          onClick={resetTransform}
          className="p-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors"
          title="Reset Zoom"
        >
          <FiRotateCcw className="w-3.5 h-3.5 stroke-[1.5]" />
        </button>

        {/* Background switcher */}
        <div className="flex items-center gap-1.5">
          {bgOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setBgColor(opt.value)}
              className={`p-0.5 rounded-md transition-all ${
                bgColor === opt.value
                  ? "ring-1 ring-orange-500 bg-orange-100 dark:bg-orange-900/30 text-orange-600"
                  : "hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-500"
              }`}
              title={opt.label}
            >
              {opt.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Dimensions dropdown */}
      <div className="flex items-center">
        <div className="relative">
          <button
            onClick={() => setShowDimDropdown(!showDimDropdown)}
            className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium text-gray-500"
          >
            <FiMaximize2 className="w-3 h-3 text-gray-500 stroke-[1.5]" />
            <span>Set Dimensions</span>
          </button>
          {showDimDropdown && (
            <DimensionsDropdown
              svgCode={svgCode}
              setSvgCode={setSvgCode}
              onClose={() => setShowDimDropdown(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
