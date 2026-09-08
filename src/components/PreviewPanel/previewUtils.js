import DOMPurify from "dompurify";

// DOMPurify config scoped to SVG: strips <script>, event handlers (onload,
// onerror, etc.), javascript: URIs, and unsafe embeds, while preserving all
// legitimate SVG markup, styles and animations.
const SVG_PURIFY_CONFIG = {
  USE_PROFILES: { svg: true, svgFilters: true },
  FORBID_TAGS: ["script", "foreignObject", "use"],
  FORBID_ATTR: [
    "onload",
    "onerror",
    "onclick",
    "onmouseover",
    "onmouseenter",
    "onmouseleave",
    "onfocus",
    "onblur",
  ],
  ALLOW_UNKNOWN_PROTOCOLS: false,
};

function wrapFragment(trimmed) {
  const fragmentTags = [
    "<path",
    "<circle",
    "<rect",
    "<g",
    "<line",
    "<polyline",
    "<polygon",
    "<ellipse",
    "<text",
  ];
  const isFragment = fragmentTags.some((tag) => trimmed.startsWith(tag));
  if (!isFragment) return null;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="200" height="200">${trimmed}</svg>`;
}

/**
 * Parses, validates and sanitizes untrusted SVG markup before it is ever
 * rendered via dangerouslySetInnerHTML. Returns "" if the content can't be
 * made safe to render. This is the app's security boundary against SVG-based
 * XSS (script tags, event-handler attributes, javascript: URIs).
 */
export function getSanitizedSvg(code) {
  if (!code || typeof code !== "string") return "";

  try {
    const parser = new DOMParser();
    let doc = parser.parseFromString(code, "image/svg+xml");
    let parserError = doc.querySelector("parsererror");

    if (parserError) {
      const trimmed = code.trim();
      const wrapped = wrapFragment(trimmed);
      if (!wrapped) return "";
      doc = parser.parseFromString(wrapped, "image/svg+xml");
      parserError = doc.querySelector("parsererror");
      if (parserError) return "";
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

    const clean = DOMPurify.sanitize(svgElement.outerHTML, SVG_PURIFY_CONFIG);
    return clean || "";
  } catch {
    return "";
  }
}
