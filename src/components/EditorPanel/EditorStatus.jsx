import { FiCheckCircle, FiAlertTriangle } from "react-icons/fi";

export default function EditorStatus({ isSvgValid }) {
  return (
    <div
      className={`px-3 py-1 text-[11px] flex items-center justify-between border-b ${
        isSvgValid
          ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/50"
          : "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-900/50"
      }`}
    >
      <div className="flex items-center gap-1.5 font-medium">
        {isSvgValid ? (
          <FiCheckCircle className="w-3.5 h-3.5 stroke-[1.5]" />
        ) : (
          <FiAlertTriangle className="w-3.5 h-3.5 stroke-[1.5]" />
        )}
        <span>
          {isSvgValid
            ? "Valid SVG code detected (Only SVG supported)"
            : "Warning: Code does not contain valid <svg> tags!"}
        </span>
      </div>
      <span className="opacity-75">SVG Mode</span>
    </div>
  );
}
