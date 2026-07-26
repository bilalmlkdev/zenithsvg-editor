import { useRef } from "react";
import { toPng } from "html-to-image";

export function useEditorActions({
  svgCode,
  setSvgCode,
  isSvgValid,
  setDropdownOpen,
}) {
  const DEFAULT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400"></svg>`;

  const handleNew = () => setSvgCode(DEFAULT_SVG);

  const handleOpen = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.endsWith(".svg") && file.type !== "image/svg+xml") {
      alert("Error: Only .svg files are supported!");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      if (content.toLowerCase().includes("<svg")) {
        setSvgCode(content);
      } else {
        alert("The uploaded file does not contain valid SVG code.");
      }
    };
    reader.readAsText(file);
  };

  const downloadSVG = () => {
    if (!isSvgValid) {
      alert("Cannot download: Code must contain valid SVG tags.");
      return;
    }
    const blob = new Blob([svgCode], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "design.svg";
    a.click();
    URL.revokeObjectURL(url);
    setDropdownOpen(false);
  };

  const downloadPNG = async () => {
    if (!isSvgValid) {
      alert("Cannot export: Code must contain valid SVG tags.");
      return;
    }
    try {
      const container = document.createElement("div");
      container.innerHTML = svgCode;
      container.style.width = "400px";
      container.style.height = "400px";
      document.body.appendChild(container);
      const dataUrl = await toPng(container);
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "design.png";
      a.click();
      document.body.removeChild(container);
    } catch (err) {
      console.error("Error downloading PNG:", err);
    } finally {
      setDropdownOpen(false);
    }
  };

  // Added optional `code` parameter – if not provided, uses closure `svgCode`
  const handleSave = (projectName = "Untitled", code = svgCode) => {
    if (!isSvgValid) {
      alert("Save failed: Editor only supports valid SVG code.");
      return;
    }
    try {
      const existing = JSON.parse(
        localStorage.getItem("zenithSVG_projects") || "[]",
      );
      const newProject = {
        id: Date.now().toString(),
        name: projectName,
        code: code,
        date: new Date().toLocaleString(),
      };
      existing.push(newProject);
      localStorage.setItem("zenithSVG_projects", JSON.stringify(existing));
      alert(
        `Project "${projectName}" saved successfully! You can see all your saved files in the user dropdown > Files.`,
      );
    } catch (e) {
      console.error("Save failed", e);
    }
  };

  return { handleNew, handleOpen, downloadSVG, downloadPNG, handleSave };
}
