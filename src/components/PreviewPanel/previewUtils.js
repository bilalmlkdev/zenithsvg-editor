export function getSanitizedSvg(code) {
  if (!code || typeof code !== "string") return "";

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(code, "image/svg+xml");

    const parserError = doc.querySelector("parsererror");
    if (parserError) {
      const trimmed = code.trim();
      if (
        trimmed.startsWith("<path") ||
        trimmed.startsWith("<circle") ||
        trimmed.startsWith("<rect") ||
        trimmed.startsWith("<g") ||
        trimmed.startsWith("<line") ||
        trimmed.startsWith("<polyline") ||
        trimmed.startsWith("<polygon") ||
        trimmed.startsWith("<ellipse") ||
        trimmed.startsWith("<text")
      ) {
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="200" height="200">${trimmed}</svg>`;
      }
      return "";
    }

    const svgElement = doc.querySelector("svg");
    if (!svgElement) return "";

    if (
      !svgElement.hasAttribute("width") ||
      !svgElement.getAttribute("width")
    ) {
      svgElement.setAttribute("width", "200");
    }
    if (
      !svgElement.hasAttribute("height") ||
      !svgElement.getAttribute("height")
    ) {
      svgElement.setAttribute("height", "200");
    }

    return svgElement.outerHTML;
  } catch (e) {
    return "";
  }
}
