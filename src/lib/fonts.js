// Curated web-font set for the SVG <text> typography tool.
// Each font is already loaded globally via the @import in index.css so it's
// available synchronously inside the SVG preview (SVG text does not trigger
// its own font loading the way HTML does).
export const FONT_OPTIONS = [
  { label: "Inter", value: "Inter, sans-serif", category: "Sans" },
  {
    label: "Space Grotesk",
    value: "'Space Grotesk', sans-serif",
    category: "Sans",
  },
  { label: "Poppins", value: "Poppins, sans-serif", category: "Sans" },
  {
    label: "Playfair Display",
    value: "'Playfair Display', serif",
    category: "Serif",
  },
  { label: "Georgia", value: "Georgia, serif", category: "Serif" },
  {
    label: "JetBrains Mono",
    value: "'JetBrains Mono', monospace",
    category: "Mono",
  },
  {
    label: "System UI",
    value:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    category: "Sans",
  },
];

export const FONT_WEIGHTS = [
  { label: "Regular", value: "400" },
  { label: "Medium", value: "500" },
  { label: "Semibold", value: "600" },
  { label: "Bold", value: "700" },
  { label: "Black", value: "900" },
];
