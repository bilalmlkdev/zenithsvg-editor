import { getSanitizedSvg } from "../PreviewPanel/previewUtils";

export default function SvgThumbnail({ code, className = "" }) {
  const safe = getSanitizedSvg(code);

  if (!safe) {
    return (
      <div
        className={`flex items-center justify-center text-[10px] text-gray-400 ${className}`}
      >
        Invalid
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center [&_svg]:max-w-full [&_svg]:max-h-full ${className}`}
      dangerouslySetInnerHTML={{ __html: safe }}
    />
  );
}
