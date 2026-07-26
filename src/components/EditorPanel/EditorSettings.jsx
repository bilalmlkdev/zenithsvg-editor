export default function EditorSettings({
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
  onClose,
}) {
  return (
    <div className="absolute right-0 top-full mt-1 w-64 bg-white dark:bg-black shadow-xl rounded-lg border border-gray-200 dark:border-gray-700 z-30 p-4 space-y-3 text-xs max-h-[400px] overflow-y-auto">
      <div className="font-bold text-gray-800 dark:text-gray-200 border-b border-gray-100 dark:border-gray-800 pb-2 text-sm flex items-center justify-between">
        <span>Editor Preferences</span>
        <span className="text-[10px] text-orange-500 font-semibold uppercase">
          SVG Only
        </span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-gray-600 dark:text-gray-400">Font Size</span>
        <select
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          className="bg-gray-100 dark:bg-black border border-gray-300 dark:border-gray-700 rounded px-2 py-1 text-gray-800 dark:text-gray-200 outline-none"
        >
          <option value={11}>11px</option>
          <option value={12}>12px</option>
          <option value={13}>13px</option>
          <option value={14}>14px</option>
          <option value={16}>16px</option>
          <option value={18}>18px</option>
        </select>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-gray-600 dark:text-gray-400">Tab Size</span>
        <select
          value={tabSize}
          onChange={(e) => setTabSize(Number(e.target.value))}
          className="bg-gray-100 dark:bg-black border border-gray-300 dark:border-gray-700 rounded px-2 py-1 text-gray-800 dark:text-gray-200 outline-none"
        >
          <option value={2}>2 spaces</option>
          <option value={4}>4 spaces</option>
        </select>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-gray-600 dark:text-gray-400">Whitespace</span>
        <select
          value={renderWhitespace}
          onChange={(e) => setRenderWhitespace(e.target.value)}
          className="bg-gray-100 dark:bg-black border border-gray-300 dark:border-gray-700 rounded px-2 py-1 text-gray-800 dark:text-gray-200 outline-none"
        >
          <option value="none">None</option>
          <option value="boundary">Boundary</option>
          <option value="selection">Selection</option>
          <option value="all">All</option>
        </select>
      </div>

      <div className="border-t border-gray-100 dark:border-gray-800 pt-2 space-y-2">
        {/* Toggle switches */}
        {[
          { label: "Word Wrap", value: wordWrap, setter: setWordWrap },
          { label: "Minimap", value: minimap, setter: setMinimap },
          { label: "Line Numbers", value: lineNumbers, setter: setLineNumbers },
          {
            label: "Auto Brackets",
            value: autoClosingBrackets,
            setter: setAutoClosingBrackets,
          },
          {
            label: "Smooth Scroll",
            value: smoothScrolling,
            setter: setSmoothScrolling,
          },
        ].map(({ label, value, setter }) => (
          <div key={label} className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">{label}</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={value}
                onChange={() => setter(!value)}
                className="sr-only peer"
              />
              <div className="w-8 h-4 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500" />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
