import { useState, useRef, useCallback } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import PreviewToolbar from "./PreviewToolbar";
import { getSanitizedSvg } from "./previewUtils";
import { useTheme } from "../../context/ThemeContext";

export default function PreviewPanel({
  svgCode,
  setSvgCode,
  bgColor,
  setBgColor,
}) {
  const [showDimDropdown, setShowDimDropdown] = useState(false);
  const [adaptiveColors, setAdaptiveColors] = useState(true);
  const transformRef = useRef(null);
  const { isDark } = useTheme();

  const renderableContent = getSanitizedSvg(svgCode);

  const zoomIn = useCallback(() => {
    if (transformRef.current) transformRef.current.zoomIn();
  }, []);

  const zoomOut = useCallback(() => {
    if (transformRef.current) transformRef.current.zoomOut();
  }, []);

  const resetTransform = useCallback(() => {
    if (transformRef.current) transformRef.current.resetTransform();
  }, []);

  // Determine effective background darkness
  const isEffectiveDark = useCallback(() => {
    if (bgColor === "transparent") return isDark;
    if (bgColor === "#1e293b") return true; // dark slate
    if (bgColor === "#ffffff" || bgColor === "#f3f4f6") return false; // white / light gray
    return false;
  }, [bgColor, isDark]);

  const shouldInvert = adaptiveColors && isEffectiveDark();

  // Background style for the preview container
  const hasContent = !!renderableContent;
  const backgroundColor = hasContent
    ? bgColor === "transparent"
      ? "transparent"
      : bgColor
    : isDark
      ? "#000000"
      : "#ffffff";
  const backgroundImage =
    hasContent && bgColor === "transparent"
      ? "radial-gradient(#d1d5db 1px, transparent 1px)"
      : "none";
  const backgroundSize =
    hasContent && bgColor === "transparent" ? "20px 20px" : "auto";

  return (
    <div className="flex-1 h-full flex flex-col bg-white dark:bg-black relative">
      <TransformWrapper
        ref={transformRef}
        initialScale={1}
        minScale={0.1}
        maxScale={10}
        centerOnInit
      >
        {() => (
          <>
            <PreviewToolbar
              zoomIn={zoomIn}
              zoomOut={zoomOut}
              resetTransform={resetTransform}
              bgColor={bgColor}
              setBgColor={setBgColor}
              showDimDropdown={showDimDropdown}
              setShowDimDropdown={setShowDimDropdown}
              svgCode={svgCode}
              setSvgCode={setSvgCode}
              adaptiveColors={adaptiveColors}
              setAdaptiveColors={setAdaptiveColors}
            />
            <div
              className="flex-1 overflow-hidden relative w-full h-full flex items-center justify-center"
              style={{
                backgroundColor,
                backgroundImage,
                backgroundSize,
              }}
            >
              <TransformComponent
                wrapperStyle={{ width: "100%", height: "100%" }}
                contentStyle={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {hasContent ? (
                  <div
                    className="max-w-full max-h-full flex justify-center items-center pointer-events-auto"
                    style={{
                      filter: shouldInvert
                        ? "invert(1) hue-rotate(180deg)"
                        : "none",
                    }}
                    dangerouslySetInnerHTML={{ __html: renderableContent }}
                  />
                ) : (
                  <div className="text-sm font-medium text-gray-400 dark:text-gray-500 select-none">
                    [Awaiting valid SVG graphics...]
                  </div>
                )}
              </TransformComponent>
            </div>
          </>
        )}
      </TransformWrapper>
    </div>
  );
}
