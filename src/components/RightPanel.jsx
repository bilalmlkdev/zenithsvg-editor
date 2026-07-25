import { useState, useRef, useEffect, useMemo } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ZoomIn, ZoomOut, Maximize, Download, Focus, Copy, Settings, Check } from "lucide-react";

const RightPanel = ({ code }) => {
  const [activeTab, setActiveTab] = useState("Preview");
  const [bgMode, setBgMode] = useState("default");
  const [pngDataUrl, setPngDataUrl] = useState(null);

  // Code Generation Settings States
  const [isTypeScript, setIsTypeScript] = useState(false);
  const [singleQuotes, setSingleQuotes] = useState(false);
  const [stripSemicolons, setStripSemicolons] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const transformRef = useRef(null);

  // Robust helper to convert raw SVG attributes to React CamelCase and format structure
  const convertToReactJSX = (svgString, isRN = false) => {
    let cleaned = svgString.trim();

    // Convert hyphenated attributes to camelCase
    cleaned = cleaned.replace(/([a-z]+)-([a-z]+)=/g, (match, p1, p2) => {
      return p1 + p2.charAt(0).toUpperCase() + p2.slice(1) + '=';
    });
    cleaned = cleaned.replace(/([a-z]+)-([a-z]+)-([a-z]+)=/g, (match, p1, p2, p3) => {
      return p1 + p2.charAt(0).toUpperCase() + p2.slice(1) + p3.charAt(0).toUpperCase() + p3.slice(1) + '=';
    });

    const specificReplacements = {
      'class=': 'className=',
      'fill-rule=': 'fillRule=',
      'clip-rule=': 'clipRule=',
      'clip-path=': 'clipPath=',
      'stroke-width=': 'strokeWidth=',
      'stroke-linecap=': 'strokeLinecap=',
      'stroke-linejoin=': 'strokeLinejoin=',
      'stroke-dasharray=': 'strokeDasharray=',
      'stroke-dashoffset=': 'strokeDashoffset=',
      'stroke-miterlimit=': 'strokeMiterlimit=',
      'stroke-opacity=': 'strokeOpacity=',
      'fill-opacity=': 'fillOpacity=',
      'stop-color=': 'stopColor=',
      'stop-opacity=': 'stopOpacity=',
      'font-size=': 'fontSize=',
      'font-family=': 'fontFamily=',
      'text-anchor=': 'textAnchor=',
      'dominant-baseline=': 'dominantBaseline=',
      'gradient-units=': 'gradientUnits=',
      'gradient-transform=': 'gradientTransform=',
      'xmlns:xlink=': 'xmlnsXlink='
    };

    for (const [k, v] of Object.entries(specificReplacements)) {
      cleaned = cleaned.replace(new RegExp(k, 'g'), v);
    }

    if (isRN) {
      cleaned = cleaned
        .replace(/<svg([^>]*)>/gi, '<Svg$1\n    {...props}\n  >')
        .replace(/<\/svg>/gi, '</Svg>')
        .replace(/<path/gi, '<Path')
        .replace(/<rect/gi, '<Rect')
        .replace(/<circle/gi, '<Circle')
        .replace(/<ellipse/gi, '<Ellipse')
        .replace(/<line/gi, '<Line')
        .replace(/<polyline/gi, '<Polyline')
        .replace(/<polygon/gi, '<Polygon')
        .replace(/<text/gi, '<Text')
        .replace(/<\/text>/gi, '</Text>')
        .replace(/<tspan/gi, '<TSpan')
        .replace(/<\/tspan>/gi, '</TSpan>')
        .replace(/<g/gi, '<G')
        .replace(/<\/g>/gi, '</G>')
        .replace(/<defs/gi, '<Defs')
        .replace(/<\/defs>/gi, '</Defs>')
        .replace(/<linearGradient/gi, '<LinearGradient')
        .replace(/<\/linearGradient>/gi, '</LinearGradient>')
        .replace(/<radialGradient/gi, '<RadialGradient')
        .replace(/<\/radialGradient>/gi, '</RadialGradient>')
        .replace(/<stop/gi, '<Stop')
        .replace(/<\/stop>/gi, '</Stop>');
    } else {
      cleaned = cleaned.replace(/<svg([^>]*)>/i, '<svg$1\n    {...props}\n  >');
    }

    return cleaned;
  };

  // Generate React Code applying user preferences (TS, Quotes, Semicolons)
  const getReactCode = () => {
    let formatted = convertToReactJSX(code, false);
    const q = singleQuotes ? "'" : '"';
    const semi = stripSemicolons ? '' : ';';
    const propsType = isTypeScript ? ': React.SVGProps<SVGSVGElement>' : '';

    let codeStr = `import * as React from ${q}react${q}${semi}\n\nconst SVGComponent = (props${propsType}) => (\n  ${formatted.split('\n').join('\n  ')}\n)${semi}\n\nexport default SVGComponent${semi}`;

    if (singleQuotes) {
      codeStr = codeStr.replace(/="([^"]*)"/g, "='$1'");
      codeStr = codeStr.replace(/"react"/g, `'react'`);
    }
    return codeStr;
  };

  // Generate React Native Code applying user preferences
  const getReactNativeCode = () => {
    let formatted = convertToReactJSX(code, true);
    const q = singleQuotes ? "'" : '"';
    const semi = stripSemicolons ? '' : ';';
    const propsType = isTypeScript ? ': SvgProps' : '';

    const rnImports = isTypeScript
      ? `import * as React from ${q}react${q}${semi}\nimport Svg, { Path, Rect, Circle, Ellipse, Line, Polyline, Polygon, Text, TSpan, G, Defs, LinearGradient, RadialGradient, Stop, SvgProps } from ${q}react-native-svg${q}${semi}`
      : `import * as React from ${q}react${q}${semi}\nimport Svg, { Path, Rect, Circle, Ellipse, Line, Polyline, Polygon, Text, TSpan, G, Defs, LinearGradient, RadialGradient, Stop } from ${q}react-native-svg${q}${semi}`;

    let codeStr = `${rnImports}\n\nconst SVGComponent = (props${propsType}) => (\n  ${formatted.split('\n').join('\n  ')}\n)${semi}\n\nexport default SVGComponent${semi}`;

    if (singleQuotes) {
      codeStr = codeStr.replace(/="([^"]*)"/g, "='$1'");
      codeStr = codeStr.replace(/"react"/g, `'react'`);
      codeStr = codeStr.replace(/"react-native-svg"/g, `'react-native-svg'`);
    }
    return codeStr;
  };

  // Data URI formats
  const minifiedUri = useMemo(() => {
    const minified = code.replace(/\s+/g, ' ').trim();
    return `data:image/svg+xml,${encodeURIComponent(minified)}`;
  }, [code]);

  const base64Uri = useMemo(() => {
    try {
      const base64 = btoa(unescape(encodeURIComponent(code)));
      return `data:image/svg+xml;base64,${base64}`;
    } catch (e) {
      return '';
    }
  }, [code]);

  const encodedUri = useMemo(() => {
    return `data:image/svg+xml,${encodeURIComponent(code)}`;
  }, [code]);

  const minifiedSize = (minifiedUri.length / 1024).toFixed(2) + ' kB';
  const base64Size = (base64Uri.length / 1024).toFixed(2) + ' kB';
  const encodedSize = (encodedUri.length / 1024).toFixed(2) + ' kB';

  const activeContent = useMemo(() => {
    switch (activeTab) {
      case "React": return getReactCode();
      case "React Native": return getReactNativeCode();
      case "Data URI": return encodedUri;
      default: return code;
    }
  }, [activeTab, code, isTypeScript, singleQuotes, stripSemicolons, encodedUri]);

  // Handle PNG Conversion via HTML5 Canvas (Fully Transparent)
  useEffect(() => {
    if (activeTab === "PNG" && code) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      const blob = new Blob([code], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);

      img.onload = () => {
        canvas.width = img.width || 512;
        canvas.height = img.height || 512;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        setPngDataUrl(canvas.toDataURL("image/png"));
        URL.revokeObjectURL(url);
      };
      img.src = url;
    }
  }, [code, activeTab]);

  const handleDownload = () => {
    const a = document.createElement("a");
    if (activeTab === "PNG" && pngDataUrl) {
      a.href = pngDataUrl;
      a.download = "icon.png";
    } else {
      const blob = new Blob([activeContent], { type: "text/plain" });
      a.href = URL.createObjectURL(blob);
      a.download = activeTab === "Preview" ? "icon.svg" : `icon.${activeTab === "Data URI" ? "txt" : isTypeScript ? "tsx" : "jsx"}`;
    }
    a.click();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(activeContent);
  };

  const getBackgroundClass = () => {
    switch (bgMode) {
      case "white": return "bg-white";
      case "black": return "bg-black";
      case "transparent": return "bg-checkered";
      default: return "bg-[#f0f0f0]";
    }
  };

  const handleFit = () => {
    if (transformRef.current) {
      transformRef.current.resetTransform();
    }
  };

  const renderCodeEditor = (content) => {
    const lines = content.split('\n');

    const highlightCode = (text) => {
      let html = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      html = html.replace(/(&quot;.*?&quot;|'.*?'|".*?")/g, '<span class="text-[#a31515]">$1</span>');
      html = html.replace(/\b(import|export|default|const|from|return)\b/g, '<span class="text-[#af00db]">$1</span>');
      html = html.replace(/&lt;([a-zA-Z0-9]+)/g, '&lt;<span class="text-[#800000]">$1</span>');
      html = html.replace(/&lt;\/([a-zA-Z0-9]+)/g, '&lt;/<span class="text-[#800000]">$1</span>');
      html = html.replace(/([a-zA-Z0-9-]+)=/g, '<span class="text-[#ff0000]">$1</span>=');
      html = html.replace(/\{([0-9.]+)\}/g, '{<span class="text-[#098658]">$1</span>}');
      return html;
    };

    return (
      <div className="w-full h-full bg-white overflow-auto relative font-mono text-[13px] leading-[22px]">
        <div className="flex min-w-full py-4">
          <div className="flex flex-col text-gray-400 text-right pr-4 pl-4 select-none border-r border-gray-200 shrink-0">
            {lines.map((_, i) => (
              <span key={`line-${i}`}>{i + 1}</span>
            ))}
          </div>
          <div className="flex flex-col pl-4 pr-4 text-gray-900 select-text w-full">
            {lines.map((line, i) => (
              <div
                key={`code-${i}`}
                className="whitespace-pre-wrap break-all"
                dangerouslySetInnerHTML={{ __html: highlightCode(line) || '&nbsp;' }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Tabs & Settings Gear */}
      <div className="h-15 flex items-center justify-between border-b border-gray-200 bg-white px-2 shrink-0">
        <div className="flex items-center gap-2 relative left-2">
          {["Preview", "React", "React Native", "PNG", "Data URI"].map((tab) => (
            <button
              key={tab}
              className={`px-3.5 py-2 text-xs rounded-md transition-colors ${
                activeTab === tab
                  ? "bg-orange-100 text-orange-600 font-medium"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
              onClick={() => {
                setActiveTab(tab);
                setShowSettings(false);
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Gear Icon & Dropdown (Only for Code Tabs) */}
        {["React", "React Native"].includes(activeTab) && (
          <div className="relative mr-2">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors flex items-center"
              title="Code Settings"
            >
              <Settings size={16} />
            </button>

            {showSettings && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 text-xs">
                <button
                  onClick={() => setIsTypeScript(!isTypeScript)}
                  className="w-full px-4 py-2 text-left flex items-center justify-between hover:bg-gray-50 text-gray-700"
                >
                  <span>TypeScript</span>
                  {isTypeScript && <Check size={14} className="text-orange-500" />}
                </button>
                <button
                  onClick={() => setSingleQuotes(!singleQuotes)}
                  className="w-full px-4 py-2 text-left flex items-center justify-between hover:bg-gray-50 text-gray-700"
                >
                  <span>Single Quotes</span>
                  {singleQuotes && <Check size={14} className="text-orange-500" />}
                </button>
                <button
                  onClick={() => setStripSemicolons(!stripSemicolons)}
                  className="w-full px-4 py-2 text-left flex items-center justify-between hover:bg-gray-50 text-gray-700"
                >
                  <span>Strip Semicolons</span>
                  {stripSemicolons && <Check size={14} className="text-orange-500" />}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 relative overflow-hidden">
        {/* PREVIEW TAB */}
        <div className={`absolute inset-0 w-full h-full ${getBackgroundClass()} ${activeTab === "Preview" ? "block" : "hidden"}`}>
          <TransformWrapper ref={transformRef} centerOnInit={true} wheel={{ step: 0.1 }} doubleClick={{ mode: "reset" }}>
            {({ zoomIn, zoomOut, resetTransform }) => (
              <div className="w-full h-full relative">
                {/* Floating Toolbar with Zoom and Fit controls */}
                <div className="absolute top-4 right-4 z-10 flex bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                  <button onClick={() => zoomIn()} className="p-2 hover:bg-gray-100 border-r border-gray-200" title="Zoom In">
                    <ZoomIn size={16} className="text-gray-700" />
                  </button>
                  <button onClick={() => zoomOut()} className="p-2 hover:bg-gray-100 border-r border-gray-200" title="Zoom Out">
                    <ZoomOut size={16} className="text-gray-700" />
                  </button>
                  <button onClick={() => resetTransform()} className="p-2 hover:bg-gray-100 border-r border-gray-200" title="Reset">
                    <Maximize size={16} className="text-gray-700" />
                  </button>
                  <button onClick={handleFit} className="p-2 hover:bg-gray-100" title="Fit to Screen">
                    <Focus size={16} className="text-gray-700" />
                  </button>
                </div>

                <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
                  <div dangerouslySetInnerHTML={{ __html: code }} />
                </TransformComponent>
              </div>
            )}
          </TransformWrapper>
        </div>

        {/* PNG TAB */}
        {activeTab === "PNG" && (
          <div className={`absolute inset-0 w-full h-full flex items-center justify-center ${getBackgroundClass()}`}>
             {pngDataUrl ? (
               <img src={pngDataUrl} alt="Converted PNG" className="max-w-[90%] max-h-[90%] drop-shadow-sm object-contain" />
             ) : (
               <span className="text-sm text-gray-400 font-medium animate-pulse">Converting to PNG...</span>
             )}
          </div>
        )}

        {/* REACT & REACT NATIVE EDITORS */}
        {["React", "React Native"].includes(activeTab) && (
          <div className="absolute inset-0 w-full h-full bg-white">
            {activeTab === "React" && renderCodeEditor(getReactCode())}
            {activeTab === "React Native" && renderCodeEditor(getReactNativeCode())}
          </div>
        )}

        {/* DATA URI TAB */}
        {activeTab === "Data URI" && (
          <div className="absolute inset-0 w-full h-full bg-white overflow-auto p-4 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-800">Minified Data URI <span className="text-gray-400 font-normal">{minifiedSize}</span></span>
                <button
                  onClick={() => navigator.clipboard.writeText(minifiedUri)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded text-xs font-medium flex items-center gap-1 border border-gray-300 transition-colors"
                >
                  <Copy size={12} /> Copy
                </button>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 font-mono text-xs text-gray-700 break-all max-h-50 overflow-y-auto">
                {minifiedUri}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-800">base64 <span className="text-gray-400 font-normal">{base64Size}</span></span>
                <button
                  onClick={() => navigator.clipboard.writeText(base64Uri)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded text-xs font-medium flex items-center gap-1 border border-gray-300 transition-colors"
                >
                  <Copy size={12} /> Copy
                </button>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 font-mono text-xs text-gray-700 break-all max-h-50 overflow-y-auto">
                {base64Uri}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-800">encodeURIComponent <span className="text-gray-400 font-normal">{encodedSize}</span></span>
                <button
                  onClick={() => navigator.clipboard.writeText(encodedUri)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded text-xs font-medium flex items-center gap-1 border border-gray-300 transition-colors"
                >
                  <Copy size={12} /> Copy
                </button>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 font-mono text-xs text-gray-700 break-all max-h-50 overflow-y-auto">
                {encodedUri}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="h-13 flex items-center justify-end px-3 bg-white border-t border-gray-200 shrink-0 relative z-10">
        {(activeTab === "Preview" || activeTab === "PNG") && (
          <div className="flex items-center absolute left-3 gap-2 bg-gray-50 p-1 rounded-lg border border-gray-200">
            <button
              onClick={() => setBgMode("default")}
              className={`w-6 h-6 rounded-md border border-gray-300 bg-[#f0f0f0] ${bgMode === 'default' ? 'ring-2 ring-orange-500 ring-offset-1' : ''}`}
              title="Default Gray"
            />
            <button
              onClick={() => setBgMode("white")}
              className={`w-6 h-6 rounded-md border border-gray-300 bg-white ${bgMode === 'white' ? 'ring-2 ring-orange-500 ring-offset-1' : ''}`}
              title="White"
            />
            <button
              onClick={() => setBgMode("black")}
              className={`w-6 h-6 rounded-md border border-gray-300 bg-black ${bgMode === 'black' ? 'ring-2 ring-orange-500 ring-offset-1' : ''}`}
              title="Black"
            />
            <button
              onClick={() => setBgMode("transparent")}
              className={`w-6 h-6 rounded-md border border-gray-300 bg-checkered-sm ${bgMode === 'transparent' ? 'ring-2 ring-orange-500 ring-offset-1' : ''}`}
              title="Transparent"
            />
          </div>
        )}

        <div className="flex items-center gap-3">
          {["React", "React Native"].includes(activeTab) && (
            <button
              onClick={handleCopy}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1 border border-gray-300 transition-colors"
            >
              <Copy size={14} /> Copy
            </button>
          )}

          <button
            onClick={handleDownload}
            className="bg-orange-500 hover:bg-orange-600 text-white px-2.5 py-1.5 rounded-md text-xs font-medium flex items-center gap-1 shadow-sm transition-colors"
          >
            <Download size={14} /> Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
