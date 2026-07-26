import { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import EditorToolbar from "./EditorToolbar";
import EditorStatus from "./EditorStatus";
import { useEditorActions } from "../../hooks/useEditorActions";
import prettier from "prettier/standalone";
import parserHtml from "prettier/parser-html";

const DEFAULT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400"></svg>`;

export default function EditorPanel({
  svgCode,
  setSvgCode,
  isDark,
  layoutMode,
  setLayoutMode,
}) {
  const fileInputRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [layoutDropdownOpen, setLayoutDropdownOpen] = useState(false);
  const [saveDropdownOpen, setSaveDropdownOpen] = useState(false);
  const [projectName, setProjectName] = useState("");

  // Editor preferences
  const [fontSize, setFontSize] = useState(13);
  const [tabSize, setTabSize] = useState(2);
  const [wordWrap, setWordWrap] = useState(true);
  const [minimap, setMinimap] = useState(false);
  const [lineNumbers, setLineNumbers] = useState(true);
  const [autoClosingBrackets, setAutoClosingBrackets] = useState(true);
  const [renderWhitespace, setRenderWhitespace] = useState("selection");
  const [smoothScrolling, setSmoothScrolling] = useState(true);

  const trimmedCode = svgCode.trim().toLowerCase();
  const isSvgValid =
    trimmedCode.includes("<svg") && trimmedCode.includes("</svg>");

  const { handleNew, handleOpen, downloadSVG, downloadPNG, handleSave } =
    useEditorActions({ svgCode, setSvgCode, isSvgValid, setDropdownOpen });

  // Format code using Prettier
  const formatCode = async (code) => {
    try {
      const formatted = await prettier.format(code, {
        parser: "html",
        plugins: [parserHtml],
        tabWidth: 2,
        useTabs: false,
        singleQuote: false,
        trailingComma: "none",
        htmlWhitespaceSensitivity: "ignore",
      });
      return formatted;
    } catch (error) {
      console.error("Formatting failed:", error);
      alert("Could not format the code. Please check the syntax.");
      return code;
    }
  };

  // Manual format button handler
  const handleFormat = async () => {
    const formatted = await formatCode(svgCode);
    setSvgCode(formatted);
  };

  // Save with auto‑format
  const handleSaveWithFormat = async (name) => {
    const formatted = await formatCode(svgCode);
    setSvgCode(formatted);
    handleSave(name, formatted); // pass formatted code to save
  };

  const editorOptions = {
    fontSize,
    tabSize,
    wordWrap: wordWrap ? "on" : "off",
    minimap: { enabled: minimap },
    lineNumbers: lineNumbers ? "on" : "off",
    autoClosingBrackets: autoClosingBrackets ? "always" : "never",
    renderWhitespace,
    smoothScrolling,
    scrollBeyondLastLine: false,
    automaticLayout: true,
  };

  return (
    <div className="w-full h-full flex flex-col border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-black">
      <EditorToolbar
        fileInputRef={fileInputRef}
        onNew={handleNew}
        onOpen={handleOpen}
        onDownloadSVG={downloadSVG}
        onDownloadPNG={downloadPNG}
        onSave={handleSaveWithFormat} // replaced handleSave
        onFormat={handleFormat} // new prop
        dropdownOpen={dropdownOpen}
        setDropdownOpen={setDropdownOpen}
        layoutDropdownOpen={layoutDropdownOpen}
        setLayoutDropdownOpen={setLayoutDropdownOpen}
        layoutMode={layoutMode}
        setLayoutMode={setLayoutMode}
        settingsOpen={settingsOpen}
        setSettingsOpen={setSettingsOpen}
        saveDropdownOpen={saveDropdownOpen}
        setSaveDropdownOpen={setSaveDropdownOpen}
        projectName={projectName}
        setProjectName={setProjectName}
        fontSize={fontSize}
        setFontSize={setFontSize}
        tabSize={tabSize}
        setTabSize={setTabSize}
        renderWhitespace={renderWhitespace}
        setRenderWhitespace={setRenderWhitespace}
        wordWrap={wordWrap}
        setWordWrap={setWordWrap}
        minimap={minimap}
        setMinimap={setMinimap}
        lineNumbers={lineNumbers}
        setLineNumbers={setLineNumbers}
        autoClosingBrackets={autoClosingBrackets}
        setAutoClosingBrackets={setAutoClosingBrackets}
        smoothScrolling={smoothScrolling}
        setSmoothScrolling={setSmoothScrolling}
      />
      <EditorStatus isSvgValid={isSvgValid} />
      <div className="flex-1 overflow-hidden p-0 bg-gray-50 dark:bg-gray-950">
        <Editor
          height="100%"
          defaultLanguage="xml"
          value={svgCode}
          onChange={(value) => setSvgCode(value || "")}
          theme={isDark ? "vs-dark" : "light"}
          options={editorOptions}
        />
      </div>
    </div>
  );
}
