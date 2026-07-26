export function getCurrentDimensions(code) {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(code, "image/svg+xml");
    const svgElement = doc.querySelector("svg");
    if (!svgElement) return { width: "200", height: "200" };
    return {
      width: svgElement.hasAttribute("width")
        ? svgElement.getAttribute("width")
        : "200",
      height: svgElement.hasAttribute("height")
        ? svgElement.getAttribute("height")
        : "200",
    };
  } catch {
    return { width: "200", height: "200" };
  }
}

export function updateDimension(code, dim, value) {
  try {
    const sanitized =
      value && !isNaN(parseInt(value)) && parseInt(value) > 0 ? value : "200";
    const parser = new DOMParser();
    const doc = parser.parseFromString(code, "image/svg+xml");
    const svgElement = doc.querySelector("svg");
    if (!svgElement) return null;
    if (!svgElement.hasAttribute("width"))
      svgElement.setAttribute("width", "200");
    if (!svgElement.hasAttribute("height"))
      svgElement.setAttribute("height", "200");
    svgElement.setAttribute(dim, sanitized);
    const serializer = new XMLSerializer();
    return serializer.serializeToString(doc);
  } catch (e) {
    console.error("Failed to update dimensions", e);
    return null;
  }
}
