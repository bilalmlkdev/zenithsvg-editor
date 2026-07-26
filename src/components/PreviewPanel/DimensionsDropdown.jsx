import { getCurrentDimensions, updateDimension } from "./dimensionUtils";

export default function DimensionsDropdown({ svgCode, setSvgCode, onClose }) {
  const { width: currentWidth, height: currentHeight } =
    getCurrentDimensions(svgCode);

  const handleChange = (dim, value) => {
    const newCode = updateDimension(svgCode, dim, value);
    if (newCode) setSvgCode(newCode);
  };

  return (
    <div className="absolute right-0 top-9 z-50 w-56 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-[5px] shadow-2xl p-3.5 space-y-3">
      <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
        Canvas Dimensions
      </div>
      <div className="space-y-2">
        <div>
          <label className="block text-[10px] font-semibold text-gray-500 dark:text-gray-400 mb-1">
            Width
          </label>
          <input
            type="text"
            value={currentWidth}
            onChange={(e) => handleChange("width", e.target.value)}
            className="w-full px-2.5 py-1 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-orange-500 font-mono"
          />
        </div>
        <div>
          <label className="block text-[10px] font-semibold text-gray-500 dark:text-gray-400 mb-1">
            Height
          </label>
          <input
            type="text"
            value={currentHeight}
            onChange={(e) => handleChange("height", e.target.value)}
            className="w-full px-2.5 py-1 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-orange-500 font-mono"
          />
        </div>
      </div>
    </div>
  );
}
