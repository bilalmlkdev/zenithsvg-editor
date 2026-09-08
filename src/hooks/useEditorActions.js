import { toPng } from "html-to-image";
import { useToast } from "../context/ToastContext";
import { getSanitizedSvg } from "../components/PreviewPanel/previewUtils";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB - generous for hand-authored SVGs

export function useEditorActions({
  svgCode,
  setSvgCode,
  isSvgValid,
  setDropdownOpen,
}) {
  const toast = useToast();
  const DEFAULT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400"></svg>`;

  const handleNew = () => {
    setSvgCode(DEFAULT_SVG);
    toast.info("Started a new file");
  };

  const handleOpen = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".svg") && file.type !== "image/svg+xml") {
      toast.error("Only .svg files are supported.");
      e.target.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("File is too large (max 2MB).");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      if (content.toLowerCase().includes("<svg")) {
        setSvgCode(content);
        toast.success(`Loaded "${file.name}"`);
      } else {
        toast.error("The uploaded file doesn't contain valid SVG code.");
      }
    };
    reader.onerror = () => toast.error("Couldn't read that file.");
    reader.readAsText(file);
    e.target.value = "";
  };

  const downloadSVG = () => {
    if (!isSvgValid) {
      toast.error("Cannot download: code must contain valid <svg> tags.");
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
    toast.success("SVG downloaded");
  };

  const downloadPNG = async (options = {}) => {
    if (!isSvgValid) {
      toast.error("Cannot export: code must contain valid <svg> tags.");
      return;
    }
    const { scale = 2, transparent = true, filename = "design.png" } = options;
    try {
      // Render the sanitized version only - never inject raw user markup
      // into the live DOM for export.
      const safeMarkup = getSanitizedSvg(svgCode);
      if (!safeMarkup) {
        toast.error("Couldn't export: SVG failed validation.");
        return;
      }
      const container = document.createElement("div");
      container.innerHTML = safeMarkup;
      container.style.position = "fixed";
      container.style.top = "-9999px";
      container.style.left = "-9999px";
      container.style.width = "400px";
      container.style.height = "400px";
      container.style.display = "flex";
      container.style.alignItems = "center";
      container.style.justifyContent = "center";
      if (!transparent) container.style.background = "#ffffff";
      document.body.appendChild(container);
      const dataUrl = await toPng(container, {
        pixelRatio: scale,
        backgroundColor: transparent ? undefined : "#ffffff",
      });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = filename;
      a.click();
      document.body.removeChild(container);
      toast.success("PNG downloaded");
    } catch (err) {
      console.error("Error downloading PNG:", err);
      toast.error("PNG export failed. Try simplifying the SVG.");
    } finally {
      setDropdownOpen(false);
    }
  };

  const handleSave = (projectName = "Untitled", code = svgCode) => {
    if (!isSvgValid) {
      toast.error("Save failed: editor only supports valid SVG code.");
      return false;
    }
    try {
      const existing = JSON.parse(
        localStorage.getItem("zenithSVG_projects") || "[]",
      );
      const newProject = {
        id: Date.now().toString(),
        name: projectName,
        code,
        date: new Date().toLocaleString(),
      };
      existing.push(newProject);
      localStorage.setItem("zenithSVG_projects", JSON.stringify(existing));
      toast.success(`Saved "${projectName}"`);
      return true;
    } catch (e) {
      console.error("Save failed", e);
      toast.error("Save failed - your browser storage may be full.");
      return false;
    }
  };

  return { handleNew, handleOpen, downloadSVG, downloadPNG, handleSave };
}
